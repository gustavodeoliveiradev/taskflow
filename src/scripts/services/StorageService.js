/**
 * TaskFlow — StorageService
 * Abstração do localStorage + Export/Import JSON
 */

export class StorageService {
  static KEY = 'taskflow_tasks';

  static getTasks() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      console.warn('Erro ao ler localStorage, retornando array vazio');
      return [];
    }
  }

  static saveTasks(tasks) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }

  static exportToJSON(tasks) {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async importFromJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const tasks = JSON.parse(e.target.result);
          if (!Array.isArray(tasks)) throw new Error('Formato inválido');
          resolve(tasks);
        } catch {
          reject(new Error('Arquivo JSON inválido ou corrompido'));
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
      reader.readAsText(file);
    });
  }

  static clear() {
    localStorage.removeItem(this.KEY);
  }
}
