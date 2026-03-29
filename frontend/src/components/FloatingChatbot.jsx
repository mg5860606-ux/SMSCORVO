import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Generate session ID on mount
    if (!sessionId) {
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
    }
  }, [sessionId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chatbot/chat`, {
        message: userMessage,
        session_id: sessionId
      });

      // Add bot response to chat
      setMessages(prev => [...prev, {
        type: 'bot',
        text: response.data.response
      }]);
      
      // Update session ID if new
      if (response.data.session_id && !sessionId) {
        setSessionId(response.data.session_id);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl flex flex-col z-50 border-2 border-indigo-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Assistente SMSCorvo</h3>
                <p className="text-xs text-indigo-100">Online - Pronto para ajudar!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-indigo-500 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-sm">
                  Olá! 👋 Sou o assistente virtual do SMSCorvo.
                </p>
                <p className="text-xs mt-2">
                  Como posso ajudar você hoje?
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-lg rounded-bl-none shadow-sm border border-gray-200">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Digite sua mensagem..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Pressione Enter para enviar
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingChatbot;
