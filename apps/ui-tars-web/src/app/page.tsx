'use client';

import { useState } from 'react';
import { MessageSquare, Settings, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Hello! I am UI-TARS, a vision-language model agent. How can I help you today?',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold">UI-TARS Agent</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Card className="w-full max-w-md bg-card p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">Welcome to UI-TARS</h2>
              <p className="text-sm text-muted-foreground">
                Start a conversation to interact with the vision-language model
                agent.
              </p>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card
                  className={`max-w-md px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <time className="mt-1 block text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </time>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card px-6 py-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
