/**
 * TaskFlow — TaskManager
 * Gerenciamento central de tarefas (CRUD + filtros + estatísticas)
 */

import { StorageService } from '../services/StorageService.js';
import { generateId, isOverdue } from '../utils/helpers.js';

export class TaskManager {
  constructor() {
    this.tasks = StorageService.getTasks();
    this.filter = 'all';           // all | active | completed
    this.priorityFilter = null;    // high | medium | low
    this.searchQuery = '';
    this.listeners = [];
  }

  /** Inscreve callback para atualizações de estado */
  subscribe(callback) {
    this.listeners.push(callback);
  }

  /** Notifica todos os inscritos */
  notify() {
    const state = this.getState();
    this.listeners.forEach(cb => cb(state));
  }

  /** Retorna estado completo da aplicação */
  getState() {
    return {
      tasks: this.getFilteredTasks(),
      stats: this.getStats(),
      filter: this.filter,
      priorityFilter: this.priorityFilter,
      searchQuery: this.searchQuery
    };
  }

  // ---------- CRUD ----------

  add(taskData) {
    const task = {
      id: generateId(),
      title: taskData.title.trim(),
      description: (taskData.description || '').trim(),
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      tags: Array.isArray(taskData.tags) ? taskData.tags : [],
      completed: false,
      createdAt: new Date().toISOString(),
      order: this.tasks.length
    };
    this.tasks.push(task);
    this.save();
    this.notify();
    return task;
  }

  update(id, updates) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      title: updates.title?.trim() || this.tasks[index].title,
      description: (updates.description || '').trim()
    };
    this.save();
    this.notify();
    return this.tasks[index];
  }

  delete(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    // Reordenar para manter consistência
    this.tasks.forEach((t, i) => { t.order = i; });
    this.save();
    this.notify();
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
      this.notify();
    }
  }

  reorder(newOrderIds) {
    const ordered = [];
    newOrderIds.forEach((id, index) => {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.order = index;
        ordered.push(task);
      }
    });
    this.tasks = ordered;
    this.save();
    this.notify();
  }

  // ---------- Filtros ----------

  setFilter(filter) {
    this.filter = filter;
    this.notify();
  }

  setPriorityFilter(priority) {
    this.priorityFilter = this.priorityFilter === priority ? null : priority;
    this.notify();
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.notify();
  }

  getFilteredTasks() {
    let result = [...this.tasks];

    // Status
    if (this.filter === 'active') {
      result = result.filter(t => !t.completed);
    } else if (this.filter === 'completed') {
      result = result.filter(t => t.completed);
    }

    // Prioridade
    if (this.priorityFilter) {
      result = result.filter(t => t.priority === this.priorityFilter);
    }

    // Busca
    if (this.searchQuery) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(this.searchQuery) ||
        t.description.toLowerCase().includes(this.searchQuery) ||
        t.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
      );
    }

    return result.sort((a, b) => a.order - b.order);
  }

  // ---------- Estatísticas ----------

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const overdue = this.tasks.filter(t =>
      !t.completed && t.dueDate && isOverdue(t.dueDate)
    ).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, overdue, progress };
  }

  // ---------- Persistência ----------

  save() {
    StorageService.saveTasks(this.tasks);
  }

  loadMockData(mockTasks) {
    if (this.tasks.length === 0) {
      mockTasks.forEach(t => this.tasks.push({ ...t }));
      this.save();
      this.notify();
    }
  }
}
