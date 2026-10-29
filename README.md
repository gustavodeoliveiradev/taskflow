# ✨ TaskFlow

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SortableJS](https://img.shields.io/badge/SortableJS-333?style=for-the-badge&logo=javascript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)

**Uma To-Do List moderna, interativa e de código aberto.**
Design glassmorphism, drag-and-drop, temas claro/escuro e dados salvos no seu próprio navegador.

🔗 **[Ver demo ao vivo](https://gustavodeoliveiradev.github.io/taskflow/)**

<!-- Troque pelo caminho do seu GIF ou print quando tiver um, por exemplo:
![Demo do TaskFlow](docs/demo.gif)
-->

---

## 🎯 Funcionalidades

- ✅ **CRUD completo** — crie, edite, conclua e exclua tarefas
- 🏷️ **Prioridades e tags** — Alta, Média e Baixa, com cores distintas
- 📅 **Datas de vencimento** — alerta visual para tarefas atrasadas
- 🔍 **Busca em tempo real** — por título, descrição ou tag
- 🧭 **Filtros** — Todas, Ativas, Concluídas e por prioridade
- 🌓 **Tema claro/escuro** — respeita o tema do sistema e lembra a sua escolha
- 🖱️ **Drag & drop** — reordene as tarefas com SortableJS; a ordem é salva
- 🎉 **Celebração ao concluir** — contorno verde animado quando você termina uma tarefa
- 📊 **Barra de progresso e estatísticas** — concluídas, pendentes e atrasadas
- ⌨️ **Atalho de teclado** — `N` abre a janela de nova tarefa
- 💾 **Persistência local** — tudo fica no `localStorage`, sem conta e sem servidor
- 📤 **Exportar/Importar JSON** — faça backup e restaure as suas tarefas

---

## 🚀 Como usar

### Direto no navegador

Acesse a **[demo](https://gustavodeoliveiradev.github.io/taskflow/)**. Não precisa instalar nada.

### Rodando na sua máquina

1. Clone o repositório:

   ```bash
   git clone https://github.com/gustavodeoliveiradev/taskflow.git
   cd taskflow
   ```

2. Inicie um servidor local. O projeto usa módulos JavaScript (`import`/`export`), então **abrir o `index.html` com duplo-clique não funciona**:

   ```bash
   npx serve .
   ```

   Se preferir, use a extensão **Live Server** do VS Code (botão direito no `index.html` → *Open with Live Server*).

3. Abra o endereço que aparecer no terminal e comece a organizar suas tarefas. 🎉

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
| --- | --- |
| **HTML5 semântico** | Estrutura acessível |
| **CSS3 (Grid + Flexbox)** | Layout responsivo |
| **CSS Variables** | Design tokens e temas claro/escuro |
| **JavaScript ES6+ (módulos)** | Lógica modular com classes |
| **SortableJS** | Drag & drop |
| **localStorage API** | Persistência no navegador |

Sem frameworks, sem build, sem dependências para instalar.

---

## 🗂️ Estrutura do projeto

```text
taskflow/
├── index.html
├── docs/
│   └── day-by-day.md          # Diário de desenvolvimento
└── src/
    ├── scripts/
    │   ├── main.js            # Ponto de entrada
    │   ├── core/              # TaskManager (regras e estado)
    │   ├── components/        # TaskList, Modal
    │   ├── services/          # StorageService, ThemeService
    │   ├── data/              # Tarefas de exemplo
    │   └── utils/             # Funções auxiliares
    └── styles/
        ├── main.css           # Importa todos os estilos
        ├── base/              # Reset, tipografia, variáveis
        ├── layout/            # Header, sidebar, área principal
        ├── components/        # Botões, cards, modal, filtros...
        └── themes/            # Transição entre temas
```

---

## 📅 Roadmap

| Dia | Foco | Status |
| --- | --- | --- |
| 1 | Setup, design tokens, reset, tipografia | ✅ Concluído |
| 2 | Layout responsivo (header, sidebar, main) | ✅ Concluído |
| 3 | Componentes visuais (botões, cards, modal) | ✅ Concluído |
| 4 | Lógica core e CRUD | ✅ Concluído |
| 5 | Interatividade (filtros, busca, drag & drop, backup) | ✅ Concluído |
| 6 | Temas, animações e micro-interações | 🚧 Em andamento |
| 7 | Acessibilidade, polimento e deploy | ⏳ Pendente |

O acompanhamento detalhado está em [`docs/day-by-day.md`](docs/day-by-day.md).

---

## 🤝 Como contribuir

O TaskFlow é um projeto aberto e toda ajuda é bem-vinda, inclusive de quem está começando.

1. Faça um **fork** do repositório.
2. Crie uma branch para a sua mudança: `git checkout -b minha-melhoria`.
3. Faça as alterações e um commit descritivo: `git commit -m "feat: minha melhoria"`.
4. Envie a branch: `git push origin minha-melhoria`.
5. Abra um **Pull Request** explicando o que mudou.

Procurando por onde começar? Veja as [issues abertas](https://github.com/gustavodeoliveiradev/taskflow/issues).
Achou um bug ou tem uma ideia? [Abra uma issue](https://github.com/gustavodeoliveiradev/taskflow/issues/new).

---

## 👤 Autor

### Gustavo de Oliveira

- 🐙 GitHub: [@gustavodeoliveiradev](https://github.com/gustavodeoliveiradev)
- 💼 LinkedIn: [lgustavodeoliveira](https://www.linkedin.com/in/lgustavodeoliveira/)
- 📧 E-mail: [gustavodeoliveira.dev@gmail.com](mailto:gustavodeoliveira.dev@gmail.com)

---

## 📝 Licença

Distribuído sob a licença MIT. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.

---

Feito com 💜 e muito ☕ por [Gustavo de Oliveira](https://github.com/gustavodeoliveiradev)
