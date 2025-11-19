import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Timer, 
  BarChart3, 
  Database,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "Dashboard" },
    { name: "Projetos", icon: FolderKanban, path: "Projects" },
    { name: "Pomodoro", icon: Timer, path: "Pomodoro" },
    { name: "Cockpit", icon: BarChart3, path: "Analytics" },
    { name: "Data Lake", icon: Database, path: "DataLake" }
  ];

  const isActive = (path) => location.pathname === createPageUrl(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <style>{`
        :root {
          --primary: 220 80% 60%;
          --primary-glow: 220 100% 70%;
          --success: 142 76% 56%;
          --warning: 45 93% 47%;
          --danger: 0 84% 60%;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }
        
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header com gradiente */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-lg opacity-50 animate-glow" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Atlas
                </h1>
                <p className="text-[10px] text-slate-400 -mt-1">Motor de Otimização Cognitiva</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} to={createPageUrl(item.path)}>
                    <Button
                      variant="ghost"
                      className={`gap-2 transition-all duration-300 ${
                        active
                          ? "bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/20"
                          : "text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-indigo-500/10 bg-slate-950/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={createPageUrl(item.path)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        active
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}