import { FaBriefcase, FaMobileAlt, FaBalanceScale, FaGraduationCap } from 'react-icons/fa';

export const experience = [
    {
        period: 'Nov/2025 – Jun/2026',
        title: 'Software Engineer Jr',
        org: 'Nexus Labz · Remoto',
        icon: FaBriefcase,
        highlights: [
            'Arquitetei e entreguei um app mobile em React Native (Expo) que chegou à produção, com pagamentos, cache offline e login com Google (OAuth).',
            'Defini a arquitetura das camadas mobile e backend, com autenticação JWT e comunicação segura com a API.',
            'Montei a infraestrutura de produção em VPS: Nginx como proxy reverso, SSL/TLS com Let’s Encrypt e hardening do servidor.',
            'Automatizei o deploy do backend com pipelines de CI/CD no GitHub Actions.',
            'Mentorei um desenvolvedor júnior e conduzi code reviews.',
        ],
        tech: ['TypeScript', 'React Native', 'Expo', 'PostgreSQL', 'MySQL', 'SQL Server', 'Nginx', 'GitHub Actions'],
        caseStudy: '/cases/nexus/',
    },
    {
        period: 'Freelance',
        title: 'Desenvolvedor Full Stack Pleno',
        org: 'App Vitale · Estúdio de Pilates',
        icon: FaMobileAlt,
        highlights: [
            'Responsável pelo projeto do início ao fim: app de gestão do estúdio para Android e iOS.',
            'Monorepo com Yarn Workspaces e camadas reutilizáveis (core, UI e API).',
            'Autenticação, controle de acesso por perfil e Row Level Security no PostgreSQL (Supabase).',
            'Testes E2E de web, API e mobile com Playwright e Appium, e pipeline de qualidade (lint, format e CI).',
        ],
        tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Playwright', 'Appium', 'GitHub Actions'],
    },
    {
        period: 'Freelance',
        title: 'Desenvolvedor Full Stack',
        org: 'Dra. Nathiara Borges · Advocacia',
        icon: FaBalanceScale,
        highlights: [
            'Plataforma jurídica sobre direitos das pessoas com deficiência, com foco em TEA: landing page, site do escritório, portfólio, página de mentorias e hub de links.',
            'Foco em acessibilidade, HTML semântico e navegação clara para o público atendido.',
        ],
        tech: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
        link: 'https://nathiaraborgesadv.vercel.app/',
    },
    {
        period: 'Conclusão em Dez/2027',
        title: 'Ciência da Computação',
        org: 'Unoesc · Videira, SC',
        icon: FaGraduationCap,
        highlights: [
            'Bacharelado com base em algoritmos, estruturas de dados, bancos de dados relacionais e arquitetura de sistemas.',
        ],
        tech: [],
    },
];
