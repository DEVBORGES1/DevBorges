#  Documentação Técnica

Este documento serve como um guia mais aprofundado sobre como o **Portfólio** foi construído e como as coisas funcionam nos bastidores.

##  Estrutura do Projeto

A organização de pastas segue um padrão intuitivo para facilitar a manutenção:

```
src/
  components/
    layout/     Header, Footer, Section (título + <section>), ScrollProgress
    sections/   Hero, About, Experience, Projects, Skills, Contact
    ui/         ProjectCard, TechTags, Tilt, ScrollReveal, StaggeredReveal
  data/         profile, experience, projects, skills (todo o conteúdo do site)
  hooks/        useTilt
  styles/       variables.css (tokens), global.css (reset/base), shared.css
  assets/       imagens (WebP)
```

*   Cada componente importa o próprio CSS (`Hero.jsx` → `Hero.css`), então o estilo fica ao lado de quem usa.
*   `styles/shared.css` guarda o que é usado por várias seções: título de seção e tags de tecnologia.
*   Componentes não guardam texto: o conteúdo vem de `src/data/`.

## Estilização e Design

O design foi pensado para ser **clean** e **moderno**.

*   **Variáveis CSS (`var(--...)`):** Uso variáveis para cores e fontes. Isso significa que se eu quiser mudar a cor principal do site de vermelho para azul, mudo em um lugar só e o site inteiro atualiza. Sem gambiarra.
*   **Responsividade:** Tudo foi feito usando Flexbox e Grid. O site se adapta a celulares, tablets e desktops sem quebrar o layout. O menu de navegação, por exemplo, vira um hambúrguer em telas pequenas.

##  Animações

Para as animações, não usei CSS puro para tudo porque queria um controle maior sobre o tempo e a sequência de entrada.

*   **Framer Motion:** É a biblioteca que cuida das entradas suaves.
    *   *Exemplo:* O componente `StaggeredReveal` faz os itens aparecerem um de cada vez em cascata, ao invés de aparecerem todos de uma vez de forma bruta.
*   **Tilt Effect:** Nos cards de projetos, o hook `src/hooks/useTilt.js` inclina o card seguindo o cursor. Ele só ativa com mouse (sem efeito em touch) e é desligado quando o sistema pede menos movimento.

##  Build e performance

`npm run build` roda três etapas:

1.  `vite build`: gera o site em `dist/`.
2.  `vite build --ssr src/entry-server.jsx`: gera uma versão da aplicação que roda no Node.
3.  `scripts/prerender.mjs`: renderiza a página para HTML, injeta em `dist/index.html`, embute o CSS e adiciona preload das fontes.

Assim o conteúdo já vem no HTML (bom para SEO e para a primeira pintura) e o React só "hidrata" a página no navegador (`hydrateRoot` em `src/main.jsx`). No `npm run dev` não há pré-renderização: o React renderiza do zero.

Para a hidratação funcionar, o HTML gerado no build e o do navegador precisam ser idênticos. Por isso as partículas do hero usam um gerador com semente fixa e a preferência de movimento reduzido vem de `usePrefersReducedMotion` (que assume `false` no build).

Outras escolhas de performance:

*   **Fontes locais** (`@fontsource-variable/inter` e `fira-code`): sem requisição bloqueante ao Google Fonts.
*   **`LazyMotion`**: o núcleo de animação do framer-motion (`src/motionFeatures.js`) carrega depois da primeira renderização. Use sempre `m.div` (não `motion.div`); o modo `strict` acusa erro se esquecer.
*   **Entradas do hero em CSS**: aparecem sem esperar o JavaScript.
*   **Imagens WebP** no tamanho de exibição, com `srcset` no avatar e `loading="lazy"` nos projetos.
*   Animações infinitas do hero pausadas quando ele sai da tela.

##  Deploy

O deploy é feito na **Vercel**, integrada ao repositório do GitHub.
A cada push na branch principal, a Vercel roda `npm run build` e publica a pasta `dist` (configuração em `vercel.json`).

As variáveis do formulário de contato (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` e `VITE_EMAILJS_PUBLIC_KEY`) precisam estar cadastradas em *Project Settings → Environment Variables* na Vercel, e em um arquivo `.env` local para desenvolvimento.

##  Manutenção

Todo o conteúdo fica em `src/data/`, separado dos componentes:

*   `profile.js`: nome, cargo, resumo, currículo e links sociais (usados no Hero, Sobre, Contato e Rodapé).
*   `experience.js`: itens da seção Experiência.
*   `projects.js`: cards de projetos (imagem, descrição, tecnologias, repositório e demo opcional).
*   `skills.js`: habilidades e categorias do filtro.

Para adicionar um projeto, coloque a imagem (WebP, ~800px de largura) em `src/assets/projects/`, importe em `projects.js` e adicione um objeto na lista.
