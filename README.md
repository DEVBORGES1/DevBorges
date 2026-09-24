#  Meu Portfólio

[![CI](https://github.com/DEVBORGES1/DevBorges/actions/workflows/ci.yml/badge.svg)](https://github.com/DEVBORGES1/DevBorges/actions/workflows/ci.yml)

Bem-vindo ao meu espaço na web! Aqui é onde eu mostro um pouco do que eu sei fazer, meus projetos e a minha jornada como desenvolvedor Full Stack. A ideia desse site é ser mais do que apenas um currículo; é uma vitrine viva do meu trabalho.

## Sobre Mim

Sou o João Vitor Pereira (DEVBORGES), Software Engineer com foco em backend e estudante de Ciência da Computação na Unoesc. Trabalhei como Software Engineer Jr na Nexus Labz, onde levei um app React Native do zero à produção (JWT, OAuth, pagamentos, Nginx e CI/CD), e desenvolvo projetos para clientes e próprios com TypeScript, Node.js, PHP/Laravel, Python e C#/.NET.

🔗 **Portfólio no ar:** [devborges.vercel.app](https://devborges.vercel.app/)

##  O que tem debaixo do capô?

Esse site não foi feito com templates prontos. Foi construído linha a linha pensando em performance e experiência do usuário.

- **Vite + React:** Porque ninguém tem tempo a perder com loadings demorados. É rápido de verdade.
- **Framer Motion:** Para dar aquela vida na interface. As animações de entrada e transição foram feitas para serem suaves e não intrusivas.
- **Tilt 3D próprio:** o efeito de inclinação nos cards de projeto é um hook (`useTilt`) de ~40 linhas, sem dependência externa. Só ativa com mouse e respeita a preferência de menos movimento.
- **CSS Moderno:** Nada de frameworks pesados sem necessidade. O design é responsivo e adaptável.

##  Projetos em Destaque

*   **RCP — Sistema de Concursos:** plataforma SaaS com simulados, rotina de estudos e dashboard de desempenho (PHP, Laravel, MySQL).
*   **Plataforma Jurídica — Dra. Nathiara Borges:** projeto para cliente com foco em acessibilidade ([ver site](https://nathiaraborgesadv.vercel.app/)).
*   **Expense Control:** app desktop em Python para finanças pessoais com gamificação.
*   **Video Analyzer:** extração de áudio, transcrição com IA e geração de roteiro em Python.

O conteúdo do site (experiência, projetos, habilidades e links) fica em `src/data/`.

##  Rodando no seu PC

Se quiser baixar o código e ver como funciona na sua máquina:

1.  **Clone o repo:**
    ```bash
    git clone https://github.com/DEVBORGES1/DevBorges.git
    cd DevBorges
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    O site vai abrir em `http://localhost:5173` (normalmente).

##  Testes e CI

O site tem testes end-to-end com **Playwright**, rodando no build de produção (com pré-renderização) em desktop e mobile:

- HTML pré-renderizado com o conteúdo e as meta tags de SEO;
- carregamento sem erros de console nem recursos quebrados;
- acessibilidade WCAG A/AA com **axe-core**;
- navegação (link ativo, menu mobile com Esc e foco);
- filtro de habilidades;
- formulário de contato (sucesso, erro e honeypot), com o EmailJS interceptado para nenhum e-mail real ser enviado.

```bash
npx playwright install chromium   # primeira vez
npm run test:e2e
```

A cada push e pull request, o **GitHub Actions** (`.github/workflows/ci.yml`) roda lint, build e os testes.

## Contato

Se quiser trocar uma ideia, falar sobre um projeto ou só dar um oi:

- **LinkedIn:** [João Vitor](https://www.linkedin.com/in/joão-vitor-53875a1a1)
- **GitHub:** [DEVBORGES1](https://github.com/DEVBORGES1)

---
*Feito por João Vitor mais conhecido como DEVBORGES.*
