import React, { useState } from 'react';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { API_BASE_URL } from '../api/apiConfig';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "Hello! How can I help you today?", isBot: true }]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            setMessages(prev => [...prev, { text: data.answer, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Error connecting to server.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 transition-all"
                >
                    <MessageCircle size={28} />
                </button>
            ) : (
                <div className="bg-white w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <span className="font-bold">AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                    msg.isBot ? 'bg-white border border-gray-200' : 'bg-blue-600 text-white'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && <div className="text-xs text-gray-500 italic">Bot is thinking...</div>}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 border-t border-gray-200 flex gap-2">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 text-sm outline-none"
                        />
                        <button type="submit" className="text-blue-600 hover:text-blue-800">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;