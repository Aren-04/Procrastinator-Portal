
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProcrastiBot } from '@/components/ProcrastiBot';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  ListTodo, 
  Calendar as CalendarIcon, 
  BarChart3, 
  Trophy, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ListTodo, label: 'Task Delay Manager', href: '/dashboard/tasks' },
  { icon: CalendarIcon, label: 'Chaos Calendar', href: '/dashboard/calendar' },
  { icon: BarChart3, label: 'Overkill Analytics', href: '/dashboard/analytics' },
  { icon: Trophy, label: 'Achievement Scam', href: '/dashboard/badges' },
  { icon: Bell, label: 'Notification Center', href: '/dashboard/notifications' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full dark bg-background">
        <Sidebar variant="inset" className="border-r border-white/5 bg-background/50 backdrop-blur-xl">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="font-headline font-black text-white text-xl">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-white tracking-tight">ProcrastiPortal</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Enterprise Avoidance</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarSeparator className="opacity-10" />
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="h-11 hover:bg-white/5 data-[active=true]:bg-violet-600/10 data-[active=true]:text-violet-400"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
             <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent border border-white/5 p-4 space-y-3">
               <p className="text-xs font-medium text-violet-400">Current Vibe</p>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                 <span className="text-sm font-bold text-white">Mildly Alive</span>
               </div>
               <Button variant="secondary" size="sm" className="w-full text-[10px] h-7 bg-white/10 hover:bg-white/20 border-none">
                 Upgrade to Chaos Plan
               </Button>
             </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B]">
          <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-background/30 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="relative hidden md:block w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search for excuses..." className="pl-9 h-9 bg-white/5 border-white/10 rounded-lg focus-visible:ring-violet-500" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border-2 border-[#0A0A0B]" />
              </Button>
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none">SlothMaster</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">Free Procrastinator</p>
                </div>
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage src="https://picsum.photos/seed/user1/100" />
                  <AvatarFallback className="bg-violet-600 text-white font-bold">SM</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-10 overflow-auto">
            {children}
          </main>
        </SidebarInset>

        <ProcrastiBot />
      </div>
    </SidebarProvider>
  );
}
