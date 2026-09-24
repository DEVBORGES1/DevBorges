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

##  Páginas

O site é multi-página (Vite `build.rollupOptions.input` em `vite.config.js`), sem roteador:

| URL | HTML | Componente |
|---|---|---|
| `/` e `/en/` | `index.html`, `en/index.html` | `src/App.jsx` |
| `/cases/nexus/` e `/en/cases/nexus/` | `cases/nexus/index.html`, `en/cases/nexus/index.html` | `src/pages/NexusCase.jsx` (conteúdo em `src/data/cases/nexus.js`) |

Cada página tem o próprio HTML (título, descrição, canonical, `hreflang` e Open Graph) e usa o `AppShell` (idioma, header, rodapé e animações). Fora da home, os links do header apontam para a home do idioma (`/#secao` ou `/en/#secao`).

##  Idiomas (PT/EN)

*   `src/i18n/strings.js`: textos de interface (menu, botões, títulos, formulário) em `pt` e `en`.
*   `src/i18n/routes.js`: URL de cada página em cada idioma, usada pelo botão PT/EN do header.
*   `src/data/`: o conteúdo guarda imagens, links e tecnologias uma vez só e os textos por idioma (`getExperience(locale)`, `getProjects(locale)`, `about[locale]`, `getNexusCase(locale)`).
*   Componentes leem o idioma com `useLocale()` (`{ locale, t }`).
*   Os testes E2E verificam que as páginas em inglês não têm textos de interface em português.
*   Currículos: `public/curriculo-joao-vitor-pereira.pdf` (PT) e `public/resume-joao-vitor-pereira.pdf` (EN). O inglês é gerado a partir de `resume/en.html` com `npm run resume`.

Para criar uma página nova: crie o HTML, uma entrada em `src/pages/<nome>/main.jsx` chamando `mount(<Pagina />)`, adicione a entrada no `vite.config.js`, a página em `src/entry-server.jsx` e em `scripts/prerender.mjs`, e a URL em `public/sitemap.xml`.

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

##  Segurança

`vercel.json` define os headers de todas as páginas:

*   **Content-Security-Policy**: scripts, fontes e imagens só do próprio domínio; estilos inline permitidos (HTML pré-renderizado e animações usam `style`); conexões externas só para `https://api.emailjs.com`. Ao adicionar um serviço externo (analytics, fontes, APIs), inclua o domínio na diretiva correspondente.
*   `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` e `Strict-Transport-Security`.
*   Cache de 1 ano (`immutable`) para `/assets/`, que têm hash no nome.

Os testes E2E aplicam esses headers às páginas e falham se a CSP bloquear qualquer recurso ou o envio do formulário.

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
