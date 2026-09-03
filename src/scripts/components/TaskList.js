/**
 * TaskFlow — TaskList Component
 * Renderização dinâmica dos cards de tarefa + SortableJS
 */

import { escapeHtml, formatDate, isOverdue } from '../utils/helpers.js';

export class TaskList {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.emptyState = document.getElementById('empty-state');
    this.onToggle = options.onToggle || (() => {});
    this.onEdit = options.onEdit || (() => {});
    this.onDelete = options.onDelete || (() => {});
    this.onReorder = options.onReorder || (() => {});
    this.sortable = null;
  }

  initSortable() {
    if (this.sortable) {
      this.sortable.destroy();
    }

    if (typeof Sortable === 'undefined') {
      console.warn('SortableJS não carregado');
      return;
    }

    this.sortable = new Sortable(this.container, {
      animation: 200,
      handle: '.task-card__drag',
      ghostClass: 'sortable-ghost',
      dragClass: 'sortable-drag',
      delay: 100,
      delayOnTouchOnly: true,
      onEnd: (evt) => {
        const ids = Array.from(this.container.children)
          .map(child => child.dataset.id)
          .filter(Boolean);
        this.onReorder(ids);
      }
    });
  }

  render(tasks) {
    if (tasks.length === 0) {
      this.container.innerHTML = '';
      this.emptyState.style.display = 'flex';
      if (this.sortable) {
        this.sortable.destroy();
        this.sortable = null;
      }
      return;
    }

    this.emptyState.style.display = 'none';
    this.container.innerHTML = tasks.map((task, index) =>
      this.createCardHTML(task, index)
    ).join('');

    this.bindEvents();
    this.initSortable();
  }

  createCardHTML(task, index) {
    const completed = task.completed;
    const priorityClass = `task-card__priority--${task.priority}`;
    const overdue = !completed && task.dueDate && isOverdue(task.dueDate);
    const dueDateClass = overdue ? 'is-overdue' : '';
    const cardClass = completed ? 'task-card is-completed' : 'task-card';

    const tagsHtml = task.tags
      .map(tag => `<span class="task-card__tag">${escapeHtml(tag)}</span>`)
      .join('');

    const dueDateHtml = task.dueDate
      ? `<span class="task-card__due-date ${dueDateClass}">${formatDate(task.dueDate)}</span>`
      : '';

    return `
      <li class="${cardClass}" data-id="${task.id}" data-priority="${task.priority}" style="animation-delay: ${Math.min(index * 0.05, 0.5)}s">
        <div class="task-card__drag" aria-label="Arrastar tarefa">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
            <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
          </svg>
        </div>
        <label class="task-card__checkbox">
          <input type="checkbox" class="task-card__checkbox-input" ${completed ? 'checked' : ''}
            aria-label="${completed ? 'Marcar como pendente' : 'Marcar como concluída'}" />
          <span class="task-card__checkbox-custom" aria-hidden="true"></span>
        </label>
        <div class="task-card__content">
          <div class="task-card__header">
            <h3 class="task-card__title">${escapeHtml(task.title)}</h3>
          </div>
          ${task.description ? `<p class="task-card__description">${escapeHtml(task.description)}</p>` : ''}
          <div class="task-card__meta">
            <span class="task-card__priority ${priorityClass}">
              <span class="task-card__priority-dot"></span>
              ${this.getPriorityLabel(task.priority)}
            </span>
            ${tagsHtml ? `<div class="task-card__tags">${tagsHtml}</div>` : ''}
            ${dueDateHtml}
          </div>
        </div>
        <div class="task-card__actions">
          <button class="btn btn--action" data-action="edit" aria-label="Editar tarefa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="btn btn--action btn--action-delete" data-action="delete" aria-label="Excluir tarefa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </li>
    `;
  }

  bindEvents() {
    // Checkbox — marcar/desmarcar
    this.container.querySelectorAll('.task-card__checkbox-input').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const card = e.target.closest('.task-card');

        // Animação de celebração ao MARCAR como concluído
        if (e.target.checked) {
          card.classList.add('is-celebrating');
          // Remove a classe após a animação terminar (3.1s)
          setTimeout(() => {
            card.classList.remove('is-celebrating');
          }, 3100);
        }

        this.onToggle(card.dataset.id);
      });
    });

    // Editar
    this.container.querySelectorAll('[data-action="edit"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.task-card');
        this.onEdit(card.dataset.id);
      });
    });

    // Deletar
    this.container.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.task-card');
        this.onDelete(card.dataset.id);
      });
    });
  }

  getPriorityLabel(priority) {
    const labels = { high: 'Alta', medium: 'Média', low: 'Baixa' };
    return labels[priority] || priority;
  }
}
