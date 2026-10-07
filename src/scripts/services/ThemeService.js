/**
 * TaskFlow — ThemeService
 * Controla o tema claro/escuro e lembra a escolha do usuário
 */

const STORAGE_KEY = 'taskflow-theme';

export class ThemeService {
  // Descobre qual tema usar ao abrir o app
  static getInitialTheme() {
    // 1º: escolha salva anteriormente
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (err) {
      // localStorage pode estar bloqueado; seguimos sem ele
    }

    // 2º: preferência do sistema operacional
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  static getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  // Aplica o tema no <html> e atualiza o botão
  static apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const button = document.getElementById('theme-toggle');
    const icon = button?.querySelector('.theme-icon');
    if (!button || !icon) return;

    // No tema claro mostramos a lua (clique = ir para o escuro) e vice-versa
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    button.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'
    );
  }

  static save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // sem localStorage, o tema só vale até recarregar
    }
  }

  // Alterna entre claro e escuro
  static toggle() {
    const next = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';

    // Classe temporária que ativa a transição suave (Passo 5)
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);

    this.apply(next);
    this.save(next);
  }
}