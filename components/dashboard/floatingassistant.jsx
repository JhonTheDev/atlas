import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, TrendingUp, AlertTriangle, Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isPast, isToday, addDays } from "date-fns";

export default function FloatingAssistant({ tasks, projects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const getInsights = () => {
    const insights = [];
    
    // Check for overdue tasks
    const overdueTasks = tasks.filter(t => 
      t.due_date && isPast(new Date(t.due_date)) && !isToday(new Date(t.due_date)) && t.status !== 'completed'
    );
    
    if (overdueTasks.length > 0) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        title: 'Tarefas Atrasadas',
        message: `Você tem ${overdueTasks.length} tarefa(s) atrasada(s). Considere reagendar ou priorizar.`,
        action: 'Ver tarefas'
      });
    }

    // Check for today's tasks
    const todayTasks = tasks.filter(t => 
      t.scheduled_date && isToday(new Date(t.scheduled_date)) && t.status !== 'completed'
    );
    
    if (todayTasks.length > 5) {
      insights.push({
        type: 'tip',
        icon: Lightbulb,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        title: 'Carga Alta Hoje',
        message: `Você tem ${todayTasks.length} tarefas para hoje. Que tal focar nas 3 mais importantes?`,
        action: 'Priorizar'
      });
    }

    // Check productivity potential
    const highPriorityTasks = tasks.filter(t => 
      (t.priority === 'high' || t.priority === 'critical') && t.status === 'todo'
    );
    
    if (highPriorityTasks.length > 0 && insights.length === 0) {
      insights.push({
        type: 'success',
        icon: TrendingUp,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        title: 'Momento Ideal',
        message: `Sua energia está ótima! Ideal para atacar tarefas de alta prioridade.`,
        action: 'Começar'
      });
    }

    // Default motivational message
    if (insights.length === 0) {
      insights.push({
        type: 'info',
        icon: Sparkles,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        title: 'Tudo Organizado',
        message: 'Seu fluxo está equilibrado. Continue mantendo o ritmo!',
        action: null
      });
    }

    return insights;
  };

  const insights = getInsights();

  if (dismissed) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-2xl shadow-indigo-500/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          <Sparkles className="w-6 h-6 text-white relative z-10" />
        </Button>
      </motion.div>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 z-40"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-indigo-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Assistente Atlas</h3>
                      <p className="text-xs text-slate-400">Insights em tempo real</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Insights */}
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${insight.bg} border border-slate-700/50 rounded-xl p-4`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${insight.color} mt-0.5`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm mb-1">
                            {insight.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {insight.message}
                          </p>
                          {insight.action && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`mt-2 h-7 text-xs ${insight.color} hover:bg-white/5`}
                            >
                              {insight.action}
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-indigo-500/20 p-3 bg-slate-900/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDismissed(true)}
                  className="w-full text-xs text-slate-400 hover:text-white"
                >
                  Dispensar por hoje
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}