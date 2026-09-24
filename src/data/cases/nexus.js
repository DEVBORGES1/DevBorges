// Case study da Nexus Labz. Só fatos da experiência (sem código ou dados confidenciais).
export const nexusCase = {
    slug: 'nexus',
    path: '/cases/nexus/',
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
