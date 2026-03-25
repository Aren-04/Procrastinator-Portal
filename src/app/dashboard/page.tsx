
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, 
  AreaChart, Area, PieChart, Pie 
} from 'recharts';
import { 
  ArrowUpRight, Clock, Coffee, Sparkles, TrendingUp, AlertTriangle, 
  Gamepad2, Calendar as CalendarIcon, ChevronRight
} from 'lucide-react';

const inactivityData = [
  { name: 'Mon', value: 85 },
  { name: 'Tue', value: 92 },
  { name: 'Wed', value: 88 },
  { name: 'Thu', value: 95 },
  { name: 'Fri', value: 99 },
  { name: 'Sat', value: 100 },
  { name: 'Sun', value: 100 },
];

const loginSufferingData = [
  { name: 'Session 1', attempts: 2, time: 45 },
  { name: 'Session 2', attempts: 5, time: 120 },
  { name: 'Session 3', attempts: 1, time: 10 },
  { name: 'Session 4', attempts: 4, time: 90 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Hey SlothMaster,</h1>
          <p className="text-muted-foreground mt-2 text-lg">You're doing great at doing absolutely nothing.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-10 px-4 border-white/10 bg-white/5 text-amber-500 flex gap-2 items-center">
            <AlertTriangle className="w-4 h-4" />
            Warning: High Productivity Risk
          </Badge>
          <Button className="h-10 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 font-bold">
            Postpone All Tasks
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Return on Inactivity" 
          value="99.4%" 
          change="+12.4%" 
          description="Efficiency of doing zero work"
          icon={<Coffee className="w-5 h-5 text-amber-500" />}
        />
        <StatsCard 
          title="Tasks Postponed" 
          value="142" 
          change="+42" 
          description="Lifetime achievement"
          icon={<Clock className="w-5 h-5 text-violet-500" />}
        />
        <StatsCard 
          title="Suffering Index" 
          value="High" 
          change="Extreme" 
          description="Current emotional load"
          icon={<Sparkles className="w-5 h-5 text-fuchsia-500" />}
        />
        <StatsCard 
          title="Time Saved" 
          value="48h" 
          change="Infinite" 
          description="Total hours not worked"
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-white/5 bg-background/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Inactivity Over Time
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Stable</Badge>
            </CardTitle>
            <CardDescription>Correlation between session length and actual output.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inactivityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-background/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Failures</CardTitle>
            <CardDescription>Badges you've earned recently.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <BadgeItem 
              icon="🥔" 
              name="Stubborn Potato" 
              desc="Failed login 5 times" 
              rarity="Common" 
            />
            <BadgeItem 
              icon="🔁" 
              name="Serial Rescheduler" 
              desc="Postponed same task 10x" 
              rarity="Rare" 
            />
            <BadgeItem 
              icon="🏃" 
              name="Button Chaser" 
              desc="Hovers over buttons" 
              rarity="Legendary" 
            />
            <Button variant="ghost" className="w-full text-violet-400 hover:text-violet-300 hover:bg-violet-400/5 group" asChild>
              <Link href="/dashboard/badges">
                View All Scams
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, change, description, icon }: { title: string, value: string, change: string, description: string, icon: React.ReactNode }) {
  return (
    <Card className="border-white/5 bg-background/50 backdrop-blur-xl hover:border-violet-500/50 transition-colors group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{title}</CardTitle>
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-violet-500/10 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="text-xs font-medium text-emerald-500 flex items-center gap-0.5">
            {change} <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">{description}</p>
      </CardContent>
    </Card>
  );
}

function BadgeItem({ icon, name, desc, rarity }: { icon: string, name: string, desc: string, rarity: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-white truncate">{name}</p>
          <span className={cn(
            "text-[8px] font-black uppercase px-1.5 py-0.5 rounded border",
            rarity === 'Legendary' ? 'text-amber-500 border-amber-500/50 bg-amber-500/10' :
            rarity === 'Rare' ? 'text-violet-400 border-violet-400/50 bg-violet-400/10' :
            'text-muted-foreground border-white/10 bg-white/5'
          )}>
            {rarity}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{desc}</p>
      </div>
    </div>
  );
}
