import React from "react";
import { motion } from "framer-motion";
import { FolderKanban, CheckCircle2, AlertCircle, Timer, Clock, TrendingUp } from "lucide-react";

export default function QuickStats({ 
  activeProjects, 
  todayTasks, 
  overdueTasks, 
  completedPomodoros,
  focusTime,
  productivityScore 
}) {
  const stats = [
    {
      label: "Projetos Ativos",
      value: activeProjects,
      icon: FolderKanban,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      label: "Tarefas Hoje",
      value: todayTasks,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      label: "Atrasadas",
      value: overdueTasks,
      icon: AlertCircle,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      label: "Pomodoros",
      value: completedPomodoros,
      icon: Timer,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      label: "Tempo Foco",
      value: `${focusTime}m`,
      icon: Clock,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20"
    },
    {
      label: "Score",
      value: productivityScore,
      icon: TrendingUp,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group ${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-4 hover:scale-105 transition-all duration-300`}
          >
            <div className="flex flex-col">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400">
                {stat.label}
              </p>
            </div>
            
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
          </motion.div>
        );
      })}
    </div>
  );
}