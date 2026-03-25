
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  MoreVertical, Clock, Calendar as CalendarIcon, 
  Trash2, FastForward, CheckCircle, Info, Sparkles
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';

type Task = {
  id: string;
  title: string;
  status: 'maybe' | 'definitely' | 'never';
  postponedCount: number;
  dueDate: string;
  tags: string[];
};

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Finish the project demo', status: 'maybe', postponedCount: 12, dueDate: 'Tomorrow at 3AM', tags: ['#HighStress'] },
  { id: '2', title: 'Reply to manager', status: 'definitely', postponedCount: 3, dueDate: 'Next week', tags: ['#TooSunnyOutside'] },
  { id: '3', title: 'Clean the kitchen', status: 'never', postponedCount: 99, dueDate: '2028', tags: ['#MentalHealthMinute'] },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showGuiltModal, setShowGuiltModal] = useState(false);
  const { toast } = useToast();

  const handlePostpone = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextCount = t.postponedCount + 1;
        toast({
          title: "Optimistic move!",
          description: `We've rescheduled "${t.title}" to sometime in the vague future.`
        });
        return { ...t, postponedCount: nextCount, dueDate: 'Actually later' };
      }
      return t;
    }));
  };

  const handleComplete = () => {
    setShowGuiltModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Board of Shame</h1>
          <p className="text-muted-foreground mt-2">Manage your responsibilities with professional indifference.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 h-12 px-6 rounded-xl font-bold flex gap-2">
          <Sparkles className="w-5 h-5" />
          I'm feeling too productive
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-[600px]">
        <TaskColumn 
          title="Maybe Later" 
          description="The landing zone for new responsibilities." 
          tasks={tasks.filter(t => t.status === 'maybe')} 
          onPostpone={handlePostpone}
          onComplete={handleComplete}
        />
        <TaskColumn 
          title="Definitely Later" 
          description="Where tasks go to age like fine wine." 
          tasks={tasks.filter(t => t.status === 'definitely')} 
          onPostpone={handlePostpone}
          onComplete={handleComplete}
        />
        <TaskColumn 
          title="Not In This Lifetime" 
          description="The graveyard of good intentions." 
          tasks={tasks.filter(t => t.status === 'never')} 
          onPostpone={handlePostpone}
          onComplete={handleComplete}
        />
      </div>

      <Dialog open={showGuiltModal} onOpenChange={setShowGuiltModal}>
        <DialogContent className="sm:max-w-md bg-neutral-900 border-white/10 text-white text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <DialogTitle className="text-2xl font-headline">Warning: Productivity Detected</DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg">
              This action might actually improve your life. Are you sure you want to risk being productive? It could lead to more work in the long run.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowGuiltModal(false)} className="border-white/10 hover:bg-white/5 rounded-xl">
              I'm sorry, I'll stop
            </Button>
            <Button variant="destructive" className="bg-destructive hover:bg-destructive/90 rounded-xl" onClick={() => setShowGuiltModal(false)}>
              I accept the risk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TaskColumn({ title, description, tasks, onPostpone, onComplete }: { 
  title: string, description: string, tasks: Task[], onPostpone: (id: string) => void, onComplete: () => void 
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-1">
        <h3 className="font-headline font-bold text-white text-xl flex items-center justify-between">
          {title}
          <Badge variant="outline" className="border-white/10 bg-white/5 text-muted-foreground">{tasks.length}</Badge>
        </h3>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">{description}</p>
      </div>
      <div className="flex-1 rounded-2xl bg-white/5 border border-white/5 p-4 space-y-4 min-h-[400px]">
        {tasks.map(task => (
          <Card key={task.id} className="bg-[#171717] border-white/5 hover:border-violet-500/30 transition-all group cursor-grab active:cursor-grabbing">
            <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">{task.title}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-black text-violet-400 uppercase tracking-tighter">{tag}</span>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-violet-500" />
                  {task.postponedCount} Postpones
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3 text-amber-500" />
                  Due: {task.dueDate}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button 
                onClick={() => onPostpone(task.id)}
                className="flex-1 bg-violet-600/10 text-violet-400 hover:bg-violet-600 hover:text-white border border-violet-500/20 rounded-lg text-[10px] font-black uppercase h-8"
              >
                <FastForward className="w-3 h-3 mr-1" /> Postpone
              </Button>
              <Button 
                onClick={onComplete}
                variant="ghost" 
                className="flex-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg text-[10px] font-black uppercase h-8"
              >
                <CheckCircle className="w-3 h-3 mr-1" /> Complete
              </Button>
            </CardFooter>
          </Card>
        ))}
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-12">
            <Info className="w-12 h-12 mb-2" />
            <p className="text-xs font-bold uppercase tracking-widest">No tasks yet.</p>
            <p className="text-[10px]">What a glorious state to be in.</p>
          </div>
        )}
      </div>
    </div>
  );
}
