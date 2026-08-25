/**
 * TaskFlow — Mock Data
 * Tarefas de exemplo para primeiro acesso
 */

export const mockTasks = [
  {
    id: 'mock-1',
    title: 'Finalizar relatório trimestral',
    description: 'Revisar os dados financeiros e montar a apresentação para a diretoria com os gráficos atualizados.',
    priority: 'high',
    dueDate: '2026-08-10',
    tags: ['trabalho', 'urgente'],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0
  },
  {
    id: 'mock-2',
    title: 'Reunião com o time de design',
    description: 'Alinhar o novo design system e discutir as diretrizes visuais para o próximo trimestre.',
    priority: 'medium',
    dueDate: '2026-08-15',
    tags: ['reunião', 'design'],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 1
  },
  {
    id: 'mock-3',
    title: 'Organizar a estante de livros',
    description: 'Separar os livros por categoria e doar os que não leio mais há mais de 2 anos.',
    priority: 'low',
    dueDate: '2026-08-20',
    tags: ['pessoal', 'casa'],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 2
  },
  {
    id: 'mock-4',
    title: 'Deploy da nova landing page',
    description: 'Subir a versão final para produção e configurar o DNS do domínio principal.',
    priority: 'high',
    dueDate: '2026-08-05',
    tags: ['dev', 'deploy'],
    completed: true,
    createdAt: new Date().toISOString(),
    order: 3
  },
  {
    id: 'mock-5',
    title: 'Comprar café e açúcar',
    description: 'Passar no mercado depois do trabalho e pegar também algumas frutas.',
    priority: 'low',
    dueDate: '2026-08-08',
    tags: ['compras'],
    completed: true,
    createdAt: new Date().toISOString(),
    order: 4
  }
];
