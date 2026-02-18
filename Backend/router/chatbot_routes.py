import os
import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from supabase.client import create_client

router = APIRouter(prefix="/api/chat", tags=["Chatbot"])

# Initialize Supabase Client
supabase_url = os.getenv("SUPABASE_URL")
# Ensure you use the Service Role Key for backend RAG operations
supabase_key = os.getenv("SUPABASE_KEY") 
supabase = create_client(supabase_url, supabase_key)

# Initialize Models
# UPDATED: Set output_dimensionality to 3072 to match your new SQL schema
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    output_dimensionality=3072
)
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

# Load Vector Store
vector_store = SupabaseVectorStore(
    client=supabase,
    embedding=embeddings,
    table_name="documents",
    query_name="match_documents"
)

class ChatRequest(BaseModel):
    message: str

@router.post("/query")
async def chat_with_bot(request: ChatRequest):
    try:
        # 1. Manually generate the 3072-dim embedding
        query_vector = embeddings.embed_query(request.message)

        # 2. Call Supabase RPC directly to avoid LangChain's internal type bugs
        rpc_response = supabase.rpc("match_documents", {
            "query_embedding": query_vector,
            "match_threshold": 0.3, # Lowered slightly to be more helpful
            "match_count": 3
        }).execute()

        # 3. Handle the results
        if not rpc_response.data:
            return {"answer": "I couldn't find any relevant information in my knowledge base.", "sources": []}

        context = "\n".join([doc["content"] for doc in rpc_response.data])
        sources = list(set([doc.get("metadata", {}).get("source", "Unknown") for doc in rpc_response.data]))

        # 4. Generate AI response
        system_prompt = f"Answer strictly based on context. If unknown, say so.\nContext: {context}"
        response = llm.invoke([
            ("system", system_prompt),
            ("user", request.message)
        ])

        return {
            "answer": response.content,
            "sources": sources
        }
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))