import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Target, Clock, Zap, ChevronRight, Sparkles } from "lucide-react";
import { format, isToday, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { mockProjects, mockTasks, mockPomodoroSessions, mockKPI } from "./data/mockData";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const projects = mockProjects;
  const tasks = mockTasks;
  const pomodoroSessions = mockPomodoroSessions;
  const todayKPI = mockKPI;


  const activeProjects = projects.filter(p => p.status === 'active');

  const todayTasks = tasks.filter(task => {
    if (!task.scheduled_date) return false;
    return isToday(new Date(task.scheduled_date));
  });

  const overdueTasks = tasks.filter(task => {
    if (!task.due_date || task.status === 'completed') return false;
    return isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date));
  });

  const completedToday = pomodoroSessions.filter(s => 
    s.completed && isToday(new Date(s.created_date))
  ).length;

  const focusTimeToday = pomodoroSessions
    .filter(s => s.completed && isToday(new Date(s.created_date)))
    .reduce((sum, s) => sum + (s.duration_minutes || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                Bem-vindo de volta
              </h1>
              <p className="text-slate-400 text-lg">
                {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-lg shadow-indigo-500/25 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Iniciar Foco
              </button>
              <button className="px-4 py-2 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nova Tarefa
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Projetos Ativos</p>
            <p className="text-2xl font-bold text-white">{activeProjects.length}</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Tarefas Hoje</p>
            <p className="text-2xl font-bold text-white">{todayTasks.length}</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-red-500/10 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Atrasadas</p>
            <p className="text-2xl font-bold text-red-400">{overdueTasks.length}</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/10 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Pomodoros</p>
            <p className="text-2xl font-bold text-green-400">{completedToday}</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/10 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Tempo Foco</p>
            <p className="text-2xl font-bold text-purple-400">{focusTimeToday}min</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Score</p>
            <p className="text-2xl font-bold text-indigo-400">{todayKPI?.productivity_score || 0}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tarefas de Hoje */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Tarefas de Hoje</h2>
                <p className="text-sm text-slate-400">{todayTasks.length} tarefas agendadas</p>
              </div>
            </div>

            {todayTasks.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Nenhuma tarefa para hoje! 🎉</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayTasks.map(task => (
                  <div key={task.id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all">
                    <h4 className="font-semibold text-white mb-1">{task.name}</h4>
                    <p className="text-sm text-slate-400">Prioridade: {task.priority}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Performance */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white">Foco de Hoje</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Pomodoros</span>
                    <span className="text-indigo-400 font-semibold">{completedToday}/8</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${(completedToday / 8) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-indigo-500/20">
                  <p className="text-sm text-slate-400 mb-1">Tempo em foco</p>
                  <p className="text-2xl font-bold text-white">{focusTimeToday}min</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="font-bold text-white">Performance</h3>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {todayKPI?.productivity_score || 0}
                </div>
                <p className="text-sm text-slate-400">Score de Produtividade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projetos Ativos */}
        <div className="mt-6 bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Projetos Ativos</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {activeProjects.map(project => (
              <div key={project.id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <h4 className="font-semibold text-white">{project.name}</h4>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-400">Progresso</span>
                  <span className="text-indigo-400 font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}