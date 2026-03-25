
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Info } from 'lucide-react';

export default function Captcha() {
  const router = useRouter();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const redShades = [
    '#FF0000', '#DC143C', '#B22222', '#8B0000', '#FF4500', 
    '#FF6347', '#FA8072', '#E9967A', '#F08080', '#CD5C5C',
    '#D2691E', '#800000', '#A52A2A', '#5E0000', '#4A0E0E', '#FF7F7F'
  ];

  const handleTileClick = () => {
    setAttempts(prev => prev + 1);
    const messages = [
      "That was red… but not RED.",
      "Close. But not conceptually correct.",
      "Are you even trying to delay your work properly?",
      "Instructions are hard, we get it.",
      "Hint: Read above the grid. Like, really look at it."
    ];
    toast({
      variant: "destructive",
      title: "Incorrect",
      description: messages[Math.min(attempts, messages.length - 1)]
    });
  };

  const handleSuccess = () => {
    toast({
      title: "Verification successful. Barely.",
      description: "Congratulations. You can follow instructions."
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F5FF]">
      <Card className="w-full max-w-lg border-none shadow-2xl">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-6 h-6" />
            <CardTitle className="font-headline text-xl">Human Verification</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {!showGrid ? (
            <div 
              className="flex items-center gap-4 p-6 border rounded-xl bg-card hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={() => setShowGrid(true)}
            >
              <Checkbox id="verify" checked={isVerified} className="w-6 h-6 rounded-md" />
              <label htmlFor="verify" className="text-xl font-medium cursor-pointer">I am not a robot (maybe)</label>
              <div className="ml-auto flex flex-col items-center opacity-40">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-[10px] uppercase font-bold tracking-tighter">reCAPTCHA</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex flex-col items-center gap-2 bg-muted/20 p-4 rounded-lg border border-dashed border-primary">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Select</p>
                <button 
                  onClick={handleSuccess}
                  className="text-6xl font-black text-[#FF0000] hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all active:scale-95 px-4 rounded-xl"
                >
                  RED
                </button>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">as shown above</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {redShades.map((color, i) => (
                  <button
                    key={i}
                    onClick={handleTileClick}
                    style={{ backgroundColor: color }}
                    className="aspect-square rounded-md hover:scale-105 hover:z-10 transition-transform active:scale-95 shadow-sm"
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
                <Info className="w-4 h-4 shrink-0" />
                <p>Click the square that best represents the color requested.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
