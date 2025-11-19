export const mockProjects = [
    {
      id: '1',
      name: 'Atlas - Noésis',
      status: 'active',
      progress: 65,
      color: '#6366f1',
      updated_date: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Estudos de React',
      status: 'active',
      progress: 40,
      color: '#8b5cf6',
      updated_date: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Projeto Pessoal',
      status: 'active',
      progress: 80,
      color: '#ec4899',
      updated_date: new Date().toISOString(),
    },
  ];
  
  export const mockTasks = [
    {
      id: '1',
      name: 'Revisar código do dashboard',
      status: 'pending',
      scheduled_date: new Date().toISOString(),
      due_date: new Date().toISOString(),
      priority: 'high',
    },
    {
      id: '2',
      name: 'Estudar React Query',
      status: 'pending',
      scheduled_date: new Date().toISOString(),
      due_date: new Date(Date.now() + 86400000).toISOString(), // amanhã
      priority: 'medium',
    },
    {
      id: '3',
      name: 'Atualizar documentação',
      status: 'pending',
      scheduled_date: new Date(Date.now() - 86400000).toISOString(), // ontem (atrasada)
      due_date: new Date(Date.now() - 86400000).toISOString(),
      priority: 'low',
    },
  ];
  
  export const mockPomodoroSessions = [
    {
      id: '1',
      completed: true,
      created_date: new Date().toISOString(),
      duration_minutes: 25,
    },
    {
      id: '2',
      completed: true,
      created_date: new Date().toISOString(),
      duration_minutes: 25,
    },
    {
      id: '3',
      completed: true,
      created_date: new Date().toISOString(),
      duration_minutes: 25,
    },
  ];
  
  export const mockKPI = {
    id: '1',
    date: new Date().toISOString(),
    productivity_score: 75,
  };