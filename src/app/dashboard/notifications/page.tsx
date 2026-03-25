
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Zap, Info, ShieldAlert, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type NotificationItem = {
  id: string;
  icon: string;
  title: string;
  time: string;
  type: 'nice' | 'sarcastic' | 'creepy';
};

const INITIAL_FEED: NotificationItem[] = [
  { id: '1', icon: ' Compliment', title: "Nice, you opened the app again instead of your assignment.", time: "10s ago", type: 'nice' },
  { id: '2', icon: ' Achievement', title: "This session’s focus level: 3%. Vibes: 100%.", time: "2m ago", type: 'sarcastic' },
  { id: '3', icon: ' Meta', title: "This is a notification to remind you that notifications exist.", time: "5m ago", type: 'creepy' },
];

export default function NotificationsPage() {
  const [enabled, setEnabled] = useState(true);
  const [density, setDensity] = useState([30]);
  const [tone, setTone] = useState("sarcastic");
  const [feed, setFeed] = useState<NotificationItem[]>(INITIAL_FEED);
  const { toast } = useToast();

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      triggerNotification();
    }, 15000); // 15s for demo
    return () => clearInterval(interval);
  }, [enabled, density]);

  const triggerNotification = () => {
    const newNotif: NotificationItem = {
      id: Math.random().toString(),
      icon: ' Interrupt',
      title: "You haven’t ignored a notification in 2 minutes. Want to fix that?",
      time: "Just now",
      type: tone as any
    };
    setFeed(prev => [newNotif, ...prev].slice(0, 15));
    toast({
      title: "Notification Received",
      description: newNotif.title
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Notification Overload Center</h1>
          <p className="text-muted-foreground mt-2 text-lg">Because silence is too productive.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
           <div className="flex items-center gap-2 px-4">
             <Switch checked={enabled} onCheckedChange={setEnabled} id="master" />
             <Label htmlFor="master" className="text-white font-bold text-xs uppercase tracking-widest cursor-pointer">Master Spam</Label>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Settings Panel */}
        <Card className="lg:col-span-2 border-white/5 bg-background/50 backdrop-blur-xl h-fit">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Overload Settings
            </CardTitle>
            <CardDescription>Fine-tune how annoyingly pointless your day should be.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white font-bold text-xs uppercase tracking-widest">Spam Density</Label>
                <Badge variant="outline" className="border-violet-500/50 text-violet-400">{density[0]}%</Badge>
              </div>
              <Slider 
                value={density} 
                onValueChange={setDensity} 
                max={100} 
                step={1} 
                className="[&_.relative]:bg-violet-600"
              />
              <p className="text-[10px] text-muted-foreground italic">Higher density results in faster career decay.</p>
            </div>

            <div className="space-y-4">
              <Label className="text-white font-bold text-xs uppercase tracking-widest">Notification Tone</Label>
              <RadioGroup defaultValue={tone} onValueChange={setTone} className="grid grid-cols-1 gap-2">
                <ToneOption 
                  id="nice" 
                  value="nice" 
                  label="Wholesome" 
                  desc="Kind but still completely unhelpful." 
                />
                <ToneOption 
                  id="sarcastic" 
                  value="sarcastic" 
                  label="Sarcastic" 
                  desc="High-quality roasts of your life choices." 
                />
                <ToneOption 
                  id="creepy" 
                  value="creepy" 
                  label="Disturbingly Supportive" 
                  desc="Over-positive comments for doing nothing." 
                />
              </RadioGroup>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center justify-between group">
                <div className="space-y-1">
                   <Label className="text-white font-bold">Chaos Mode</Label>
                   <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Our lawyers advised against this.</p>
                </div>
                <Switch className="data-[state=checked]:bg-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Feed Panel */}
        <Card className="lg:col-span-3 border-white/5 bg-background/50 backdrop-blur-xl flex flex-col h-[650px]">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-violet-500" />
                Live Distractions
              </CardTitle>
              <CardDescription>You didn't ask for these. That's the point.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => setFeed([])}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full p-6">
              <div className="space-y-4">
                {feed.map((item) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      "p-4 rounded-xl border border-white/5 bg-white/2 flex gap-4 items-start animate-in slide-in-from-right-2 duration-300",
                      item.type === 'creepy' ? "border-amber-500/20 bg-amber-500/5" : 
                      item.type === 'sarcastic' ? "border-violet-500/20 bg-violet-500/5" : ""
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">
                      {item.icon === ' Compliment' ? '✨' : item.icon === ' Achievement' ? '🏆' : '🔔'}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">{item.type}</span>
                        <span className="text-[10px] text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="text-sm text-white font-medium leading-relaxed">{item.title}</p>
                    </div>
                  </div>
                ))}
                {feed.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
                    <ShieldAlert className="w-12 h-12 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">No interruptions.</p>
                    <p className="text-[10px]">Suspiciously quiet, isn't it?</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ToneOption({ id, value, label, desc }: { id: string, value: string, label: string, desc: string }) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent has-[:checked]:border-violet-500/50 has-[:checked]:bg-violet-500/5">
      <RadioGroupItem value={value} id={id} className="mt-1" />
      <Label htmlFor={id} className="grid gap-1 cursor-pointer">
        <span className="text-sm font-bold text-white">{label}</span>
        <span className="text-[10px] text-muted-foreground">{desc}</span>
      </Label>
    </div>
  );
}
