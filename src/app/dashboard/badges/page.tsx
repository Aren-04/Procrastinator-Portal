"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Sparkles, Filter, Lock, Unlock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

type BadgeType = {
  id: string;
  icon: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Legendary';
  description: string;
  progress: number;
  total: number;
  unlocked: boolean;
};

const BADGES: BadgeType[] = [
  { id: '1', icon: '🥔', name: 'Stubborn Potato', rarity: 'Common', description: 'Refused to accept that the login button doesn\'t like you.', progress: 5, total: 5, unlocked: true },
  { id: '2', icon: '🏃', name: 'Button Chaser', rarity: 'Rare', description: 'Completed intense cardio chasing a login button.', progress: 12, total: 10, unlocked: true },
  { id: '3', icon: '🔁', name: 'Serial Rescheduler', rarity: 'Common', description: 'Turned one task into a long-term relationship.', progress: 4, total: 5, unlocked: false },
  { id: '4', icon: '🧳', name: 'Dashboard Tourist', rarity: 'Common', description: 'Saw everything. Did nothing.', progress: 1, total: 1, unlocked: true },
  { id: '5', icon: '🔔', name: 'Alert Enthusiast', rarity: 'Rare', description: 'Subscribes to every distraction newsletter.', progress: 15, total: 25, unlocked: false },
  { id: '6', icon: '👑', name: 'Peak Procrastinator', rarity: 'Legendary', description: 'Achieved enlightenment through maximum avoidance.', progress: 200, total: 1000, unlocked: false },
  { id: '7', icon: '🎭', name: 'Mood Collector', rarity: 'Common', description: 'Experienced the full emotional spectrum of laziness.', progress: 2, total: 3, unlocked: false },
  { id: '8', icon: '⚠️', name: 'Productivity Accident', rarity: 'Legendary', description: 'Oops. Something went wrong. You were productive.', progress: 0, total: 5, unlocked: false },
];

export default function BadgesPage() {
  const [filter, setFilter] = useState('all');

  const filteredBadges = BADGES.filter(b => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  const unlockedCount = BADGES.filter(b => b.unlocked).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Achievement Scam</h1>
          <p className="text-muted-foreground mt-2 text-lg">Where failure is a feature, not a bug.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="text-right">
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-none">Unlocked</p>
            <p className="text-2xl font-black text-white">{unlockedCount} / {BADGES.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-500">
             <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
         <Tabs defaultValue="all" className="w-auto" onValueChange={setFilter}>
          <TabsList className="bg-white/5 border border-white/5">
            <TabsTrigger value="all" className="data-[state=active]:bg-violet-600">All</TabsTrigger>
            <TabsTrigger value="unlocked" className="data-[state=active]:bg-violet-600">Unlocked</TabsTrigger>
            <TabsTrigger value="locked" className="data-[state=active]:bg-violet-600">Locked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBadges.map(badge => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeType }) {
  return (
    <Card className={cn(
      "border-white/5 bg-background/50 backdrop-blur-xl transition-all group overflow-hidden relative",
      badge.unlocked ? "hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10" : "opacity-60 grayscale"
    )}>
      <CardHeader className="p-6 pb-2">
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6",
            badge.unlocked ? "bg-white/10" : "bg-white/5"
          )}>
            {badge.unlocked ? badge.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
          </div>
          <UIBadge className={cn(
            "text-[8px] font-black uppercase border",
            badge.rarity === 'Legendary' ? 'text-amber-500 border-amber-500/50 bg-amber-500/10' :
            badge.rarity === 'Rare' ? 'text-violet-400 border-violet-400/50 bg-violet-400/10' :
            'text-muted-foreground border-white/10 bg-white/5'
          )}>
            {badge.rarity}
          </UIBadge>
        </div>
        <CardTitle className="text-white font-headline text-lg">{badge.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground leading-relaxed h-10 overflow-hidden">
          {badge.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-2 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            <span>Progress</span>
            <span>{badge.progress} / {badge.total}</span>
          </div>
          <Progress value={(badge.progress / badge.total) * 100} className="h-1.5 bg-white/5" />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-[10px] h-8 bg-white/5 hover:bg-violet-600/10 hover:text-violet-400 font-black uppercase rounded-lg"
        >
          <BookOpen className="w-3 h-3 mr-2" /> Tell me the story
        </Button>
      </CardContent>
      {!badge.unlocked && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
           <UIBadge variant="outline" className="text-white border-white/50 bg-black/50 py-1 px-3 flex gap-2">
             <Lock className="w-3 h-3" /> Locked
           </UIBadge>
        </div>
      )}
    </Card>
  );
}
