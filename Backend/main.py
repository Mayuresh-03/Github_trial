from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from starlette.middleware.sessions import SessionMiddleware

from database.postgresConn import engine, Base
from models import all_model
from router import user_routes, auth_routes, chatbot_routes
all_model.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sample"
)

app.add_middleware(SessionMiddleware, secret_key=os.getenv("SESSION_SECRET") or "change-me")

origins = [
    "http://localhost:5173"  
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message" : "Welcom to Krishi Connect!"}


app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(chatbot_routes.router)