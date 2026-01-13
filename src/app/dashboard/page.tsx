"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getDashboardData } from "./actions"; // Fetch real data
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Bell,
  Mail,
  ChevronRight,
  PlayCircle,
  MoreVertical,
  ChevronLeft,
  Plus,
  UserPlus,
  Send, 
  Bot, 
  X, 
  MessageCircle 
} from 'lucide-react';

// --- STATIC DATA (These remain hardcoded for now) ---
const continueLearning = [
    { id: 1, title: "Beginner's Guide to Becoming a Front-End Developer", category: "Front End", image: "https://picsum.photos/seed/course1/400/250", mentor: "Leonardo Samsul" },
    { id: 2, title: "Optimizing User Experience with Best UI/UX Design", category: "UI/UX Design", image: "https://picsum.photos/seed/course2/400/250", mentor: "Bayu Salto" },
];

const mentors = [
    { id: 1, name: "Padhang Satrio", role: "Senior UI/UX Designer", avatar: "https://i.pravatar.cc/150?u=padhang" },
    { id: 2, name: "Zakir Horizontal", role: "Front-End Lead", avatar: "https://i.pravatar.cc/150?u=zakir" },
    { id: 3, name: "Leonardo Samsul", role: "Backend Specialist", avatar: "https://i.pravatar.cc/150?u=leonardo" },
];

// Helper to map DB icon strings to real components
const iconMap: any = {
  LayoutDashboard: LayoutDashboard,
  BookOpen: BookOpen,
  ClipboardList: ClipboardList
};

export default function DashboardPage() {
  // --- STATE MANAGEMENT ---
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [coursesInProgress, setCoursesInProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // --- 1. FETCH DATABASE DATA ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardData();
        
        // Safety Check: Only set state if data exists
        if (data) {
            setCurrentUser(data.user);
            setCoursesInProgress(data.coursesInProgress);
        } else {
            console.warn("User not found or DB empty. Showing default/loading state.");
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // --- 2. AI CHAT FUNCTION ---
  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to UI immediately
    const userText = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    setChatMessage("");
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ message: userText }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      
      // Add AI response to UI
      setChatHistory(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsAiLoading(false);
    }
  }

  // Loading Screen
  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F4F5FA] flex-col gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        <div className="text-violet-600 font-bold">Loading Masomohub...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F5FA] font-sans text-slate-800">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white p-6 flex flex-col border-r border-slate-100 hidden md:flex fixed h-full z-10">
        <div className="flex items-center gap-3 mb-12 pl-2">
          <div className="bg-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-200">
            <LayoutDashboard className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Masomohub</h1>
        </div>

        <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pl-4">Overview</h3>
            <nav className="space-y-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={MessageSquare} label="Messages" hasBadge />
            <SidebarItem icon={BookOpen} label="My Courses" />
            <SidebarItem icon={ClipboardList} label="Assignments" />
            <SidebarItem icon={Users} label="Community" />
            </nav>
        </div>

        <div className="mt-auto">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pl-4">Settings</h3>
          <div className="space-y-2">
            <SidebarItem icon={Settings} label="Settings" />
            <button className="flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl w-full transition-all font-semibold group">
                <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col md:ml-72">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md p-6 pl-8 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100">
          <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl px-4 py-2.5 w-full max-w-md focus-within:border-violet-300 transition-colors">
            <Search className="text-slate-400" size={20} />
            <input type="text" placeholder="Search your course..." className="bg-transparent border-none outline-none flex-1 ml-3 text-slate-700 font-medium placeholder:text-slate-400" />
          </div>
          <div className="flex items-center gap-6">
            <IconButton icon={Mail} />
            <IconButton icon={Bell} hasBadge />
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <Image src={currentUser?.avatar || "https://i.pravatar.cc/150"} alt="User" width={44} height={44} className="rounded-full border-2 border-white shadow-sm" />
                <span className="font-bold text-slate-800">{currentUser?.name || "User"}</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="p-8 flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN (Main) */}
          <div className="flex-1 space-y-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-xl shadow-violet-200 flex items-center">
                <div className="relative z-10 max-w-lg">
                    <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-6 backdrop-blur-sm">ONLINE PLATFORM</span>
                    <h2 className="text-4xl font-extrabold leading-tight mb-8">Sharpen Your Skills with Masomohub's Professional Courses</h2>
                    <button className="bg-white text-violet-700 px-8 py-4 rounded-full font-bold hover:bg-violet-50 transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-1">
                        Join Now <ChevronRight size={20} className="stroke-[3]" />
                    </button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
                    <SparkleIcon className="absolute top-12 right-12 text-white opacity-30 animate-pulse" size={140} />
                    <SparkleIcon className="absolute bottom-12 left-0 text-white opacity-20" size={100} />
                </div>
            </div>

            {/* Progress Cards (Dynamic from DB) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coursesInProgress.map(course => {
                    const IconComponent = iconMap[course.icon] || BookOpen; 
                    return (
                      <div key={course.id} className="bg-white p-5 rounded-[2rem] flex items-center gap-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className={`p-4 rounded-2xl ${course.color || "bg-blue-100 text-blue-600"}`}>
                              <IconComponent size={28} className="stroke-[2.5]" />
                          </div>
                          <div>
                              <h4 className="text-xl font-extrabold text-slate-800 mb-1">{course.completed}/{course.total} Units</h4>
                              <p className="text-slate-500 font-bold text-sm truncate w-32">{course.title}</p>
                          </div>
                          <div className="ml-auto self-start -mt-1 -mr-1">
                              <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                                  <MoreVertical size={20} />
                              </button>
                          </div>
                      </div>
                    );
                })}
            </div>

            {/* Continue Learning (Static) */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-extrabold text-slate-800">Continue Learning</h3>
                    <div className="flex gap-2">
                        <CircularButton icon={ChevronLeft} />
                        <CircularButton icon={ChevronRight} active />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {continueLearning.map(item => (
                        <div key={item.id} className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="relative h-52 rounded-[2rem] overflow-hidden mb-5">
                                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircle className="text-white drop-shadow-lg" size={64} />
                                </div>
                                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-violet-700 uppercase tracking-wider shadow-sm">{item.category}</span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-4 leading-snug pr-4 line-clamp-2">{item.title}</h4>
                            <div className="flex items-center gap-3">
                                <Image src="https://i.pravatar.cc/150?u=mentor1" alt={item.mentor} width={36} height={36} className="rounded-full border border-white shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{item.mentor}</p>
                                    <p className="text-slate-400 text-xs font-bold">Facilitator</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="w-full lg:w-[26rem] space-y-8">
             {/* Greeting Card */}
             <div className="bg-violet-100 p-8 rounded-[2.5rem] flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Good Morning, {currentUser?.name?.split(' ')[0] || "Student"}!</h3>
                    <p className="text-violet-700 font-bold">Keep up the great work! 🔥</p>
                </div>
                <div className="text-7xl absolute -right-2 -bottom-4 rotate-12">👋</div>
             </div>

            {/* Top Mentors (Static) */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-extrabold text-slate-800">Top Facilitators</h3>
                    <CircularButton icon={Plus} small />
                </div>
                <div className="space-y-6">
                    {mentors.map(mentor => (
                        <div key={mentor.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Image src={mentor.avatar} alt={mentor.name} width={54} height={54} className="rounded-full border-2 border-white shadow-sm" />
                                <div>
                                    <h4 className="font-bold text-slate-800 text-base">{mentor.name}</h4>
                                    <p className="text-slate-500 text-sm font-bold">{mentor.role}</p>
                                </div>
                            </div>
                            <button className="text-violet-600 font-bold text-sm bg-violet-50 px-5 py-2.5 rounded-full hover:bg-violet-600 hover:text-white transition-all flex items-center gap-1.5">
                                <UserPlus size={18} />
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-10 py-4 bg-slate-50 text-violet-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                    See All Facilitators
                </button>
            </div>
          </div>
        </main>
      </div>

      {/* --- AI CHAT WIDGET --- */}
      
      {/* Floating Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-8 right-8 bg-violet-600 text-white p-4 rounded-full shadow-xl shadow-violet-300 hover:scale-110 transition-transform z-50 ${isChatOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col z-50 overflow-hidden font-sans">
          
          {/* Header */}
          <div className="bg-violet-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">Masomohub Tutor</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatHistory.length === 0 && (
              <div className="text-center text-slate-400 text-sm mt-10">
                <Bot size={40} className="mx-auto mb-2 opacity-50" />
                <p>Hello! I am your AI assistant.</p>
                <p>Ask me anything about your courses!</p>
              </div>
            )}
            
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isAiLoading && (
              <div className="flex justify-start">
                 <div className="bg-slate-200 p-3 rounded-2xl rounded-tl-none animate-pulse text-xs text-slate-500">
                    Typing...
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-100 text-slate-900 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button type="submit" disabled={isAiLoading} className="bg-violet-600 text-white p-2.5 rounded-xl hover:bg-violet-700 disabled:opacity-50">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

// --- HELPER COMPONENTS ---

function SidebarItem({ icon: Icon, label, active = false, hasBadge = false }: { icon: any, label: string, active?: boolean, hasBadge?: boolean }) {
  return (
    <a href="#" className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all font-bold group ${active ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
      <div className="flex items-center gap-4">
        <Icon size={22} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
        <span>{label}</span>
      </div>
      {hasBadge && !active && <span className="h-2.5 w-2.5 bg-red-500 rounded-full"></span>}
    </a>
  );
}

function IconButton({ icon: Icon, hasBadge = false }: { icon: any, hasBadge?: boolean }) {
    return (
        <button className="p-3.5 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 border-2 border-transparent hover:border-slate-300 rounded-2xl relative transition-all">
            <Icon size={22} className="stroke-[2.5]" />
            {hasBadge && <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
        </button>
    );
}

function CircularButton({ icon: Icon, active = false, small = false }: { icon: any, active?: boolean, small?: boolean }) {
    const sizeClasses = small ? 'w-10 h-10' : 'w-12 h-12';
    return (
        <button className={`${sizeClasses} rounded-full flex items-center justify-center transition-all ${active ? 'bg-violet-600 text-white shadow-md shadow-violet-200' : 'bg-white text-slate-400 border-2 border-slate-100 hover:border-violet-600 hover:text-violet-600'}`}>
            <Icon size={small ? 18 : 22} className="stroke-[2.5]" />
        </button>
    )
}

const SparkleIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);
