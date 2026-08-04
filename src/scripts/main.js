/**
 * TaskFlow — Entry Point JavaScript
 * Dia 1: Apenas estrutura inicial
 */

console.log('✨ TaskFlow inicializado!');

// TODO: Dia 4 - Importar módulos core
// import { App } from './core/app.js';

// TODO: Dia 4 - Inicializar aplicação
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new App();
//   app.init();
// });

// Placeholder para testar o modal
document.addEventListener('DOMContentLoaded', () => {
  const btnNewTask = document.getElementById('btn-new-task');
  const modalOverlay = document.getElementById('modal-overlay');
  const btnClose = document.getElementById('modal-close');
  const btnCancel = document.getElementById('btn-cancel');

  const openModal = () => {
    modalOverlay.classList.add('is-visible');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.getElementById('task-title').focus();
  };

  const closeModal = () => {
    modalOverlay.classList.remove('is-visible');
    modalOverlay.setAttribute('aria-hidden', 'true');
    btnNewTask.focus();
  };

  btnNewTask?.addEventListener('click', openModal);
  btnClose?.addEventListener('click', closeModal);
  btnCancel?.addEventListener('click', closeModal);

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-visible')) {
      closeModal();
    }
  });

  // Fechar clicando no overlay
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
});
