
"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { procrastiBotContextualCommentary } from '@/ai/flows/procrasti-bot-contextual-commentary-flow';
import { generateBadSuggestion } from '@/ai/flows/bad-suggestion-generator-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  role: 'bot' | 'user';
  text: string;
};

export function ProcrastiBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hey! I'm ProcrastiBot. I noticed you're exploring. Want to hear why you should stop?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleContextualComment = async () => {
    try {
      const page = pathname.split('/').pop() || 'home';
      const result = await procrastiBotContextualCommentary({
        currentPage: page,
        action: 'page_load',
        context: { timestamp: new Date().toISOString() }
      });
      if (result && result.comment) {
        setMessages(prev => [...prev, { role: 'bot', text: result.comment }]);
      }
    } catch (e) {
      // Silently fail if AI is unavailable or procrastinating
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleContextualComment();
    }, 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await generateBadSuggestion({ userMessage: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: result.suggestion }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "My logic is currently procrastinating. Maybe try again... eventually?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full shadow-2xl bg-secondary text-secondary-foreground hover:scale-110 transition-transform group"
        >
          <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">1</div>
          <span className="sr-only">Open ProcrastiBot</span>
        </Button>
      ) : (
        <Card className="w-[350px] h-[500px] border-none shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-secondary text-secondary-foreground flex flex-row items-center justify-between p-4 space-y-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-headline">ProcrastiBot</CardTitle>
                <p className="text-[10px] opacity-80">Certified Failure Coach</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col bg-slate-50">
            <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                      m.role === 'user' 
                        ? "bg-secondary text-secondary-foreground rounded-tr-none" 
                        : "bg-white border rounded-tl-none"
                    )}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border p-3 rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/30 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-muted-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-3 bg-white border-t space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full" onClick={() => setInput("I really don't want to work today")}>Lazy Mode</Button>
                <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full" onClick={() => setInput("I need an excuse for my manager")}>Excuse Me</Button>
              </div>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex gap-2"
              >
                <Input 
                  placeholder="Ask for distraction..." 
                  className="rounded-full border-muted bg-slate-50"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" className="rounded-full bg-secondary shrink-0" disabled={isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
