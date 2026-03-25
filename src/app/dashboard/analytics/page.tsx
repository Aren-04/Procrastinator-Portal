
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Info, AlertCircle, TrendingDown, Target, Zap, Ghost } from 'lucide-react';
import { cn } from '@/lib/utils';

const careerDecayData = [
  { level: 'CEO', chance: 20 },
  { level: 'Senior Dev', chance: 45 },
  { level: 'Middle Manager', chance: 70 },
  { level: 'Professional Napper', chance: 95 },
  { level: 'Local Legend', chance: 10 },
];

const hardwareUsage = [
  { name: 'Failure Simulation', value: 82, color: '#8b5cf6' },
  { name: 'Actual Work', value: 3, color: '#262626' },
  { name: 'Loading Memes', value: 15, color: '#f59e0b' },
];

const regretData = [
  { name: 'Social Media', value: 400 },
  { name: 'Staring at Wall', value: 300 },
  { name: 'Snack Break #5', value: 200 },
  { name: 'Deep Work (Error)', value: 10 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Elite Overkill Analytics</h1>
          <p className="text-muted-foreground mt-2 text-lg">Deep insights into your impressive lack of progress.</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1">Critical Avoidance Detected</Badge>
          <Badge className="bg-violet-500/10 text-violet-500 border-violet-500/20 px-3 py-1">Vibe: Immaculate</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-white/5 bg-background/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              Recursive Regret Index
            </CardTitle>
            <CardDescription>Mapping layers of distractions against your coefficient of regret.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regretData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#525252" fontSize={12} width={150} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#262626', radius: 4 }}
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-2 p-3 bg-red-500/5 text-red-400 rounded-lg text-xs border border-red-500/10">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>Warning: "Actual Work" levels are dangerously low. Keep it up!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-background/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Hardware Mockery
            </CardTitle>
            <CardDescription>CPU resources dedicated solely to failing.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-8">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hardwareUsage}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {hardwareUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-black uppercase tracking-widest text-center">
              Fans spinning mostly for dramatic effect.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="border-white/5 bg-background/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              Career Decay Bell-Curve
            </CardTitle>
            <CardDescription>Predicting your future job title based on current inactivity.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={careerDecayData}>
                <XAxis dataKey="level" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="chance" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-background/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Ghost className="w-5 h-5 text-fuchsia-500" />
              Live Procrastination Globe
            </CardTitle>
            <CardDescription>Estimated location of other people avoiding work right now.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] bg-white/5 rounded-2xl border border-white/5 p-8">
             <div className="w-32 h-32 rounded-full border-4 border-dashed border-violet-500/30 animate-spin [animation-duration:10s] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 animate-pulse flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(139,92,246,0.5)]">
                  🌍
                </div>
             </div>
             <p className="mt-8 text-white font-bold text-center">Current Global Sloths: 12,492,031</p>
             <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-2">You are not alone in your failure.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
