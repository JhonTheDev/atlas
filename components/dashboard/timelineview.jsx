import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isTomorrow, isPast, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Circle,
  ChevronRight,
  Calendar,
  Flag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const priorityConfig = {
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", label: "Crítica" },
  high: { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", label: "Alta" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", label: "Média" },
  low: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", label: "Baixa" }
};

const statusIcons = {
  todo: Circle,
  in_progress: Clock,
  completed: CheckCircle2,
  blocked: AlertCircle
};

export default function TimelineView({ tasks = [], projects = [] }) {
  const [filter, setFilter] = useState('all'); // all, today, upcoming, overdue

  const getProjectColor = (projectId) => {
    const id = projectId ?? null;
    const project = Array.isArray(projects) ? projects.find(p => p.id === id || p.id === projectId) : undefined;
    return project?.color || '#6366f1';
  };

  const getTaskCategory = (task) => {
    if (task.status === 'completed') return 'completed';
    if (!task.due_date) return 'upcoming';
    
    const dueDate = new Date(task.due_date);
    if (isPast(dueDate) && !isToday(dueDate)) return 'overdue';
    if (isToday(dueDate)) return 'today';
    if (isTomorrow(dueDate)) return 'tomorrow';
    return 'upcoming';
  };

  const safeDate = (input) => {
    if (!input) return null;
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const filterTasks = () => {
    let filtered = Array.isArray(tasks) ? tasks.slice() : [];

    if (filter === 'today') {
      filtered = filtered.filter(t => {
        const d = safeDate(t.scheduled_date || t.due_date);
        return d ? isToday(d) : false;
      });
    } else if (filter === 'upcoming') {
      filtered = filtered.filter(t => {
        const d = safeDate(t.scheduled_date || t.due_date);
        return d ? (!isPast(d) && !isToday(d)) : false;
      });
    } else if (filter === 'overdue') {
      filtered = filtered.filter(t => {
        const d = safeDate(t.due_date);
        return d && t.status !== 'completed' ? (isPast(d) && !isToday(d)) : false;
      });
    }

    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return filtered.sort((a, b) => {
      const pa = priorityOrder[a.priority] ?? 3;
      const pb = priorityOrder[b.priority] ?? 3;
      return pa - pb;
    });
  };

  const filteredTasks = filterTasks();

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'today', label: 'Hoje' },
          { id: 'upcoming', label: 'Próximas' },
          { id: 'overdue', label: 'Atrasadas' }
        ].map(f => (
          <Button
            key={f.id}
            variant={filter === f.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(f.id)}
            className={cn(
              "whitespace-nowrap transition-all",
              filter === f.id && "scale-105"
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Tasks list */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground"
            >
              Nenhuma tarefa encontrada.
            </motion.div>
          ) : (
            filteredTasks.map(task => {
              const Icon = statusIcons[task.status] || Circle;
              const p = priorityConfig[task.priority] || priorityConfig.low;
              const projectColor = getProjectColor(task.project_id ?? task.projectId);
              const date = safeDate(task.scheduled_date || task.due_date);
              const dateLabel = date ? format(date, 'PPpp', { locale: ptBR }) : 'Sem data';

              return (
                <motion.div
                  key={task.id || `${task.title}-${Math.random()}`}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="flex items-center justify-between p-3 rounded border bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div style={{ width: 10, height: 10, background: projectColor, borderRadius: 6 }} />
                    <div>
                      <div className="font-medium">{task.title}</div>
                      {task.description && <div className="text-sm text-muted-foreground">{task.description}</div>}
                      <div className="text-xs text-muted-foreground mt-1">{dateLabel}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(p.bg, p.color, p.border)}>{p.label}</Badge>
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
 