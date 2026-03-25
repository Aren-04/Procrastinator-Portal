
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [buttonCount, setButtonCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [progress, setProgress] = useState(0);
  const [showPatiencePopup, setShowPatiencePopup] = useState(false);
  const [mood, setMood] = useState("");
  const [shake, setShake] = useState(false);

  const handleLoginClick = () => {
    if (mood === "I'll do it tomorrow") {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (buttonCount < 4) {
      setButtonCount(prev => prev + 1);
    } else {
      startLoadingSequence();
    }
  };

  const startLoadingSequence = () => {
    setIsLoading(true);
    let step = 0;
    const texts = ["Loading...", "Still loading...", "Almost there...", "Just kidding 😏"];
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          step++;
          if (step >= texts.length) {
            clearInterval(interval);
            finishLoading();
            return 100;
          }
          setLoadingText(texts[step]);
          return 0;
        }
        return prev + 5;
      });
    }, 150);
  };

  const finishLoading = () => {
    setIsLoading(false);
    setButtonCount(1);
    setProgress(0);
    setShowPatiencePopup(true);
  };

  const handlePopupClose = () => {
    setShowPatiencePopup(false);
    router.push('/captcha');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F5FF]">
      {!isLoading ? (
        <Card className="w-full max-w-md border-none shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center bg-primary/10 py-8">
            <CardTitle className="text-3xl font-headline font-bold">Login</CardTitle>
            <CardDescription>Enter your details. Or don't. We don't judge.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Procrastinator #123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">Today's Mood</Label>
              <Select onValueChange={setMood}>
                <SelectTrigger id="mood">
                  <SelectValue placeholder="How are you feeling?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Too Tired">Too Tired</SelectItem>
                  <SelectItem value="Mildly Alive">Mildly Alive</SelectItem>
                  <SelectItem value="I'll do it tomorrow">I'll do it tomorrow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mood === "I'll do it tomorrow" && (
              <div className="p-3 bg-amber-50 text-amber-700 rounded-lg text-sm border border-amber-200 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>Great mindset. We’ve saved today’s productivity for your future self.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: buttonCount }).map((_, i) => (
                <Button 
                  key={i} 
                  onClick={handleLoginClick}
                  className={`bg-secondary text-secondary-foreground h-12 rounded-xl transition-all hover:scale-105 active:scale-95 ${shake ? 'animate-shake bg-destructive' : ''}`}
                >
                  Login
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-md text-center space-y-8 animate-in fade-in zoom-in-95">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold text-secondary">{loadingText}</h2>
            <Progress value={progress} className="h-3 w-full" />
            <p className="text-muted-foreground italic">Undoing your productivity...</p>
          </div>
        </div>
      )}

      <Dialog open={showPatiencePopup} onOpenChange={setShowPatiencePopup}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline">That was a test of patience.</DialogTitle>
            <DialogDescription className="text-lg">
              You really wanted to log in, didn't you? Let's see if you can pass one more tiny check.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handlePopupClose} className="bg-secondary rounded-full px-12 h-12 text-lg">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
