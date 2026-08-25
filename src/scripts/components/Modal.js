/**
 * TaskFlow — Modal Component
 * Controle do formulário de criação/edição
 */

export class Modal {
  constructor(overlayId, options = {}) {
    this.overlay = document.getElementById(overlayId);
    this.form = this.overlay.querySelector('#task-form');
    this.closeBtn = this.overlay.querySelector('#modal-close');
    this.cancelBtn = this.overlay.querySelector('#btn-cancel');
    this.titleEl = this.overlay.querySelector('#modal-title');

    this.onSubmit = options.onSubmit || (() => {});
    this.mode = 'create';
    this.editingId = null;

    this.bindEvents();
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.cancelBtn.addEventListener('click', () => this.close());

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = this.getFormData();
      this.onSubmit(data, this.mode, this.editingId);
      this.close();
    });
  }

  open(mode = 'create', task = null) {
    this.mode = mode;
    this.editingId = task ? task.id : null;

    this.titleEl.textContent = mode === 'create' ? 'Nova Tarefa' : 'Editar Tarefa';
    this.form.reset();

    if (task) {
      this.form.querySelector('#task-title').value = task.title;
      this.form.querySelector('#task-description').value = task.description || '';
      this.form.querySelector('#task-priority').value = task.priority;
      this.form.querySelector('#task-due-date').value = task.dueDate || '';
      this.form.querySelector('#task-tags').value = (task.tags || []).join(', ');
    }

    this.overlay.classList.add('is-visible');
    this.overlay.setAttribute('aria-hidden', 'false');

    // Foco no título após animação
    setTimeout(() => {
      this.form.querySelector('#task-title').focus();
    }, 100);
  }

  close() {
    this.overlay.classList.add('is-closing');

    setTimeout(() => {
      this.overlay.classList.remove('is-visible', 'is-closing');
      this.overlay.setAttribute('aria-hidden', 'true');
      this.form.reset();
      this.editingId = null;
      this.mode = 'create';
    }, 250);
  }

  getFormData() {
    const tagsRaw = this.form.querySelector('#task-tags').value;
    return {
      title: this.form.querySelector('#task-title').value.trim(),
      description: this.form.querySelector('#task-description').value.trim(),
      priority: this.form.querySelector('#task-priority').value,
      dueDate: this.form.querySelector('#task-due-date').value || null,
      tags: tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
    };
  }

  isOpen() {
    return this.overlay.classList.contains('is-visible');
  }
}
