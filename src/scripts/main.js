/**
 * TaskFlow — Entry Point
 * Inicializa a aplicação e liga todos os módulos
 */

import { TaskManager } from './core/TaskManager.js';
import { TaskList } from './components/TaskList.js';
import { Modal } from './components/Modal.js';
import { StorageService } from './services/StorageService.js';
import { mockTasks } from '../data/mock-tasks.js';

class App {
  constructor() {
    this.taskManager = new TaskManager();
    this.taskList = new TaskList('task-list', {
      onToggle: (id) => this.taskManager.toggleComplete(id),
      onEdit: (id) => this.handleEdit(id),
      onDelete: (id) => this.handleDelete(id)
    });
    this.modal = new Modal('modal-overlay', {
      onSubmit: (data, mode, id) => this.handleSubmit(data, mode, id)
    });

    this.init();
  }

  init() {
    // Carrega mock data se for primeiro acesso
    this.taskManager.loadMockData(mockTasks);

    // Liga eventos da UI
    this.bindUIEvents();

    // Inscreve para atualizações de estado
    this.taskManager.subscribe((state) => this.updateUI(state));

    // Renderização inicial
    this.taskManager.notify();
  }

  bindUIEvents() {
    // Botão Nova Tarefa
    document.getElementById('btn-new-task').addEventListener('click', () => {
      this.modal.open('create');
    });

    // Filtros de status (Todos, Ativas, Concluídas)
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const clicked = e.currentTarget;
        const filter = clicked.dataset.filter;

        // Atualiza classe ativa
        document.querySelectorAll('.filter-btn[data-filter]').forEach(b =>
          b.classList.toggle('is-active', b === clicked)
        );

        this.taskManager.setFilter(filter);
      });
    });

    // Filtros de prioridade
    document.querySelectorAll('.filter-btn[data-priority]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const clicked = e.currentTarget;
        const priority = clicked.dataset.priority;
        const isActive = clicked.classList.contains('is-active');

        // Toggle: se já está ativo, desativa
        document.querySelectorAll('.filter-btn[data-priority]').forEach(b =>
          b.classList.remove('is-active')
        );

        if (!isActive) {
          clicked.classList.add('is-active');
          this.taskManager.setPriorityFilter(priority);
        } else {
          this.taskManager.setPriorityFilter(null);
        }
      });
    });

    // Busca em tempo real
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', (e) => {
      this.taskManager.setSearchQuery(e.target.value);
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      this.taskManager.setSearchQuery('');
    });

    // Atalhos de teclado globais
    document.addEventListener('keydown', (e) => {
      // 'N' para nova tarefa (exceto em inputs)
      if (
        e.key === 'n' &&
        !e.ctrlKey && !e.metaKey && !e.altKey &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        this.modal.open('create');
      }
    });
  }

  updateUI(state) {
    // 1. Renderiza lista de tarefas
    this.taskList.render(state.tasks);

    const stats = state.stats;

    // 2. Atualiza contadores nos filtros de status
    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      const filter = btn.dataset.filter;
      const countEl = btn.querySelector('.filter-count');
      if (!countEl) return;

      let count = 0;
      if (filter === 'all') count = stats.total;
      else if (filter === 'active') count = stats.active;
      else if (filter === 'completed') count = stats.completed;

      countEl.textContent = count;
    });

    // 3. Atualiza cards de estatísticas
    const statValues = document.querySelectorAll('.stat-card__value');
    if (statValues[0]) statValues[0].textContent = stats.completed;
    if (statValues[1]) statValues[1].textContent = stats.active;
    if (statValues[2]) statValues[2].textContent = stats.overdue;

    // 4. Atualiza barra de progresso
    const progressFill = document.querySelector('.progress-bar__fill');
    const progressText = document.querySelector('.progress-text strong');
    const progressLabel = document.querySelector('.progress-text span');

    if (progressFill) progressFill.style.width = `${stats.progress}%`;
    if (progressText) progressText.textContent = `${stats.progress}%`;
    if (progressLabel) progressLabel.textContent = `${stats.completed} de ${stats.total} tarefas`;

    // 5. Atualiza contador do toolbar
    const counterNumber = document.querySelector('.task-counter__number');
    if (counterNumber) counterNumber.textContent = stats.total;
  }

  handleSubmit(data, mode, id) {
    if (mode === 'create') {
      this.taskManager.add(data);
    } else {
      this.taskManager.update(id, data);
    }
  }

  handleEdit(id) {
    const task = this.taskManager.tasks.find(t => t.id === id);
    if (task) {
      this.modal.open('edit', task);
    }
  }

  handleDelete(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskManager.delete(id);
    }
  }
}

// Inicializa a aplicação
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
