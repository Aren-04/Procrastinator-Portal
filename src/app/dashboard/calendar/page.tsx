
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, RotateCcw, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

type DateBlock = {
  id: number;
  x: number;
  y: number;
  isPlaced: boolean;
};

export default function CalendarPage() {
  const [isExploded, setIsExploded] = useState(false);
  const [blocks, setBlocks] = useState<DateBlock[]>([]);
  const [activeDate, setActiveDate] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const { toast } = useToast();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    const timer = setTimeout(() => {
      explodeCalendar();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const explodeCalendar = () => {
    const initialBlocks = days.map(day => ({
      id: day,
      x: Math.random() * 80 + 10,
      y: Math.random() * 200 + 400,
      isPlaced: false
    }));
    setBlocks(initialBlocks);
    setIsExploded(true);
    toast({
      title: "Calendar Collapse!",
      description: "Everything just fell apart. Typical."
    });
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("dateId", id.toString());
  };

  const onDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const dateId = parseInt(e.dataTransfer.getData("dateId"));
    if (dateId === position) {
      setBlocks(prev => prev.map(b => b.id === dateId ? { ...b, isPlaced: true } : b));
      setActiveDate(dateId);
      toast({
        title: "Snapped!",
        description: `Date ${dateId} successfully re-acquired.`
      });
    } else {
      toast({
        variant: "destructive",
        title: "Wrong spot!",
        description: "That's not where time goes."
      });
    }
  };

  const saveEvent = () => {
    if (!eventTitle) return;
    toast({
      title: "Event Scheduled!",
      description: `"${eventTitle}" added to ${activeDate}th. Eventually.`
    });
    setEventTitle("");
    setActiveDate(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Chaos Calendar</h1>
          <p className="text-muted-foreground mt-2 text-lg">Schedule events by reassembling time itself.</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl flex gap-2">
          <RotateCcw className="w-4 h-4" /> Reset Time
        </Button>
      </div>

      <Card className="border-white/5 bg-background/50 backdrop-blur-xl min-h-[700px] relative overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-violet-500" />
            January 2026
          </CardTitle>
          <CardDescription>Drag the fallen dates into their correct slots to schedule an event.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4 max-w-4xl mx-auto mb-12">
            {days.map((day) => {
              const block = blocks.find(b => b.id === day);
              return (
                <div 
                  key={day}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, day)}
                  className={cn(
                    "aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center transition-all",
                    block?.isPlaced ? "bg-violet-600/20 border-violet-500/50" : "bg-white/5 hover:bg-white/10",
                    activeDate === day && "ring-2 ring-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  )}
                >
                  {block?.isPlaced && (
                    <span className="text-2xl font-black text-white">{day}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Event Input */}
          {activeDate && (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/5 border border-violet-500/30 animate-in slide-in-from-top-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">Create Event for Jan {activeDate}</h4>
                  <Badge className="bg-violet-500">Selected</Badge>
                </div>
                <Input 
                  placeholder="Event Title (e.g., Nap Time)" 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="bg-white/5 border-white/10 h-11"
                />
                <Button onClick={saveEvent} className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl h-11">
                  <Save className="w-4 h-4 mr-2" /> Save Event
                </Button>
              </div>
            </div>
          )}

          {/* Draggable Blocks Area */}
          <div className="relative h-[300px] mt-20 border-t border-white/5 bg-white/2 pt-4">
            <p className="text-center text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-4">
              {isExploded ? "Find and drag the fallen pieces of your life" : "Preparing to explode..."}
            </p>
            {isExploded && blocks.filter(b => !b.isPlaced).map((block) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, block.id)}
                className="absolute w-12 h-12 rounded-lg bg-[#171717] border border-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl hover:border-violet-500 hover:scale-110 transition-transform animate-fall"
                style={{ 
                  left: `${block.x}%`, 
                  top: `${block.y - 400}px`,
                  '--fall-rotate': `${(block.id % 20) - 10}deg`
                } as any}
              >
                <span className="text-lg font-bold text-white">{block.id}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
