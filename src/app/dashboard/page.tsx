import React from "react";
import { LayoutDashboard, Users, Settings, LogOut, Bell } from "lucide-react";
// import { signOut } from "@/auth"; // We will enable this later

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
           <h1 className="text-2xl font-bold text-blue-600">Masomohub</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium transition-colors">
            <LayoutDashboard size={20} />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
            <Users size={20} />
            Students
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
            <Settings size={20} />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
              JM
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Total Students</p>
                <h3 className="text-3xl font-bold">1,240</h3>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Active Courses</p>
                <h3 className="text-3xl font-bold">12</h3>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Revenue</p>
                <h3 className="text-3xl font-bold">$4,300</h3>
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-64 flex items-center justify-center text-gray-400">
             Chart or Content goes here
          </div>
        </div>
      </main>
    </div>
  );
}