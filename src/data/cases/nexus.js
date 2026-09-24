// Case study da Nexus Labz. Só fatos da experiência (sem código ou dados confidenciais).
const pt = {
    eyebrow: 'Case study · Nexus Labz',
    title: 'Do zero à produção: app mobile, backend e infraestrutura',
    lead: 'Como Software Engineer na Nexus Labz, fui responsável pela arquitetura de um app mobile em React Native e do backend que o sustenta — autenticação, pagamentos, servidor e pipeline de deploy.',
    facts: [
        { label: 'Cargo', value: 'Software Engineer Jr' },
        { label: 'Período', value: 'Nov/2025 – Jun/2026 · 8 meses' },
        { label: 'Formato', value: 'Remoto · Startup' },
        { label: 'Escopo', value: 'Mobile, backend, infraestrutura e CI/CD' },
    ],
    challenge: [
        'Levar um aplicativo mobile do zero até a produção, com requisitos que normalmente ficam espalhados por várias pessoas: login social, pagamentos, uso sem conexão e um backend seguro para sustentar tudo isso.',
        'Além do código, era preciso definir onde e como o sistema rodaria em produção e como cada mudança chegaria lá de forma confiável.',
    ],
    architecture: {
        flow: [
            {
                title: 'App mobile',
                tech: 'React Native · Expo · TypeScript',
                details: ['Android e iOS com um único código', 'Cache offline', 'Login com Google (OAuth)'],
            },
            {
                connector: 'HTTPS · TLS com Let’s Encrypt',
            },
            {
                title: 'Servidor (VPS)',
                tech: 'Nginx como proxy reverso',
                details: ['Terminação SSL/TLS', 'Hardening do servidor'],
            },
            {
                connector: 'Requisições autenticadas (JWT)',
            },
            {
                title: 'API backend',
                tech: 'JavaScript / TypeScript',
                details: ['Autenticação JWT', 'Regras de negócio', 'Integração de pagamentos'],
            },
            {
                connector: 'SQL',
            },
            {
                title: 'Banco de dados relacional',
                tech: 'SQL',
                details: ['Dados da aplicação'],
            },
        ],
        delivery: {
            title: 'Entrega contínua',
            tech: 'GitHub Actions',
            details: ['Pipeline de CI/CD', 'Deploy automatizado do backend no VPS'],
        },
    },
    decisions: [
        {
            title: 'React Native com Expo',
            text: 'Um único código em TypeScript para Android e iOS, com o ecossistema do Expo para build e recursos nativos.',
        },
        {
            title: 'Autenticação com JWT e Google OAuth',
            text: 'O app se comunica com a API por requisições autenticadas com JWT; o login com Google reduz o atrito de cadastro para o usuário.',
        },
        {
            title: 'Cache offline',
            text: 'Os dados continuam disponíveis no app mesmo sem conexão, o que é essencial para uma experiência mobile confiável.',
        },
        {
            title: 'VPS com Nginx',
            text: 'Controle total do ambiente de produção — proxy reverso, certificados TLS e hardening — em troca de assumir a operação do servidor.',
        },
        {
            title: 'CI/CD com GitHub Actions',
            text: 'Deploy do backend automatizado por pipeline, sem passos manuais no servidor a cada entrega.',
        },
    ],
    role: [
        'Defini a arquitetura das camadas mobile e backend.',
        'Liderei as decisões de infraestrutura e montei o ambiente de produção.',
        'Implementei autenticação, pagamentos, cache offline e o pipeline de deploy.',
        'Mentorei um desenvolvedor júnior e conduzi code reviews.',
    ],
    stack: ['TypeScript', 'JavaScript', 'React Native', 'Expo', 'JWT', 'Google OAuth', 'Nginx', 'Let’s Encrypt', 'GitHub Actions', 'PostgreSQL', 'MySQL', 'SQL Server'],
    note: 'O código é proprietário: este case descreve a arquitetura e as decisões sem expor código ou dados da empresa.',
};

const en = {
    eyebrow: 'Case study · Nexus Labz',
    title: 'From zero to production: mobile app, backend and infrastructure',
    lead: 'As a Software Engineer at Nexus Labz, I was responsible for the architecture of a React Native mobile app and the backend behind it — authentication, payments, servers and the deployment pipeline.',
    facts: [
        { label: 'Role', value: 'Junior Software Engineer' },
        { label: 'Period', value: 'Nov 2025 – Jun 2026 · 8 months' },
        { label: 'Setup', value: 'Remote · Startup' },
        { label: 'Scope', value: 'Mobile, backend, infrastructure and CI/CD' },
    ],
    challenge: [
        'Take a mobile app from zero to production, with requirements that are usually spread across several people: social login, payments, offline use and a secure backend to support it all.',
        'Beyond the code, we had to decide where and how the system would run in production, and how every change would get there reliably.',
    ],
    architecture: {
        flow: [
            {
                title: 'Mobile app',
                tech: 'React Native · Expo · TypeScript',
                details: ['Android and iOS from a single codebase', 'Offline caching', 'Google sign-in (OAuth)'],
            },
            {
                connector: 'HTTPS · TLS with Let’s Encrypt',
            },
            {
                title: 'Server (VPS)',
                tech: 'Nginx as a reverse proxy',
                details: ['SSL/TLS termination', 'Server hardening'],
            },
            {
                connector: 'Authenticated requests (JWT)',
            },
            {
                title: 'Backend API',
                tech: 'JavaScript / TypeScript',
                details: ['JWT authentication', 'Business rules', 'Payment integration'],
            },
            {
                connector: 'SQL',
            },
            {
                title: 'Relational database',
                tech: 'SQL',
                details: ['Application data'],
            },
        ],
        delivery: {
            title: 'Continuous delivery',
            tech: 'GitHub Actions',
            details: ['CI/CD pipeline', 'Automated backend deployment to the VPS'],
        },
    },
    decisions: [
        {
            title: 'React Native with Expo',
            text: 'A single TypeScript codebase for Android and iOS, using the Expo ecosystem for builds and native features.',
        },
        {
            title: 'JWT authentication and Google OAuth',
            text: 'The app talks to the API through JWT-authenticated requests; Google sign-in lowers signup friction for users.',
        },
        {
            title: 'Offline caching',
            text: 'Data stays available in the app even without a connection, which is essential for a reliable mobile experience.',
        },
        {
            title: 'VPS with Nginx',
            text: 'Full control of the production environment — reverse proxy, TLS certificates and hardening — in exchange for owning server operations.',
        },
        {
            title: 'CI/CD with GitHub Actions',
            text: 'Backend deployments automated through a pipeline, with no manual steps on the server for each release.',
        },
    ],
    role: [
        'Defined the architecture of the mobile and backend layers.',
        'Led infrastructure decisions and set up the production environment.',
        'Implemented authentication, payments, offline caching and the deployment pipeline.',
        'Mentored a junior developer and led code reviews.',
    ],
    note: 'The code is proprietary: this case study describes the architecture and decisions without exposing company code or data.',
};

const stack = pt.stack;

export const getNexusCase = (locale) => (locale === 'en' ? { ...en, stack } : pt);
