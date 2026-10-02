import { FaBriefcase, FaMobileAlt, FaBalanceScale, FaGraduationCap } from 'react-icons/fa';

const items = [
    {
        id: 'nexusPleno',
        icon: FaBriefcase,
        tech: ['Nginx', 'Let’s Encrypt', 'Linux', 'GitHub Actions', 'Code review'],
    },
    {
        id: 'nexus',
        icon: FaBriefcase,
        tech: ['TypeScript', 'React Native', 'Expo', 'JWT', 'Google OAuth', 'PostgreSQL', 'MySQL', 'SQL Server'],
        caseStudy: 'nexus',
    },
    {
        id: 'vitale',
        icon: FaMobileAlt,
        tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Playwright', 'Appium', 'GitHub Actions'],
    },
    {
        id: 'nathiara',
        icon: FaBalanceScale,
        tech: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
        link: 'https://nathiaraborgesadv.vercel.app/',
    },
    {
        id: 'unoesc',
        icon: FaGraduationCap,
        tech: [],
    },
];

const text = {
    pt: {
        nexusPleno: {
            period: 'Jan/2026 – Jun/2026',
            title: 'Software Engineer Pleno',
            org: 'Nexus Labz · Híbrido',
            highlights: [
                'Configurei o Nginx como proxy reverso, SSL/TLS com Let’s Encrypt e reforço de segurança no nível do servidor.',
                'Implementei pipelines de CI/CD com GitHub Actions para o deploy automatizado do backend.',
                'Orientei um desenvolvedor júnior e conduzi revisões técnicas.',
            ],
        },
        nexus: {
            period: 'Jan/2025 – Atual',
            title: 'Software Engineer Jr',
            org: 'Nexus Labz · Remoto',
            highlights: [
                'Arquitetei e entreguei um app mobile em React Native (Expo) de nível de produção.',
                'Defini a arquitetura do sistema em camadas, no mobile e no backend.',
                'Integrei processamento de pagamentos, cache offline e login com Google (OAuth).',
                'Projetei o fluxo de autenticação baseado em JWT, com comunicação segura com a API.',
                'Liderei as decisões de infraestrutura e implementei o ambiente de produção em VPS.',
            ],
        },
        vitale: {
            period: 'Freelance',
            title: 'Desenvolvedor Full Stack Pleno',
            org: 'App Vitale · Estúdio de Pilates',
            highlights: [
                'Responsável pelo projeto do início ao fim: app de gestão do estúdio para Android e iOS.',
                'Monorepo com Yarn Workspaces e camadas reutilizáveis (core, UI e API).',
                'Autenticação, controle de acesso por perfil e Row Level Security no PostgreSQL (Supabase).',
                'Testes E2E de web, API e mobile com Playwright e Appium, e pipeline de qualidade (lint, format e CI).',
            ],
        },
        nathiara: {
            period: 'Freelance',
            title: 'Desenvolvedor Full Stack',
            org: 'Dra. Nathiara Borges · Advocacia',
            highlights: [
                'Plataforma jurídica sobre direitos das pessoas com deficiência, com foco em TEA: landing page, site do escritório, portfólio, página de mentorias e hub de links.',
                'Foco em acessibilidade, HTML semântico e navegação clara para o público atendido.',
            ],
        },
        unoesc: {
            period: 'Conclusão em Dez/2027',
            title: 'Ciência da Computação',
            org: 'Unoesc · Videira, SC',
            highlights: [
                'Bacharelado com base em algoritmos, estruturas de dados, bancos de dados relacionais e arquitetura de sistemas.',
            ],
        },
    },
    en: {
        nexusPleno: {
            period: 'Jan 2026 – Jun 2026',
            title: 'Mid-level Software Engineer',
            org: 'Nexus Labz · Hybrid',
            highlights: [
                'Configured Nginx as a reverse proxy, SSL/TLS with Let’s Encrypt and server-level security hardening.',
                'Implemented CI/CD pipelines with GitHub Actions for automated backend deployments.',
                'Mentored a junior developer and led technical reviews.',
            ],
        },
        nexus: {
            period: 'Jan 2025 – Present',
            title: 'Junior Software Engineer',
            org: 'Nexus Labz · Remote',
            highlights: [
                'Architected and shipped a production-grade React Native (Expo) mobile app.',
                'Defined a layered system architecture across the mobile and backend layers.',
                'Integrated payment processing, offline caching and Google sign-in (OAuth).',
                'Designed a JWT-based authentication flow with secure API communication.',
                'Led infrastructure decisions and set up a VPS-based production environment.',
            ],
        },
        vitale: {
            period: 'Freelance',
            title: 'Mid-level Full Stack Developer',
            org: 'Vitale App · Pilates Studio',
            highlights: [
                'Owned the project end to end: a studio management app for Android and iOS.',
                'Monorepo with Yarn Workspaces and reusable layers (core, UI and API).',
                'Authentication, role-based access control and Row Level Security on PostgreSQL (Supabase).',
                'E2E tests for web, API and mobile with Playwright and Appium, plus a quality pipeline (lint, format and CI).',
            ],
        },
        nathiara: {
            period: 'Freelance',
            title: 'Full Stack Developer',
            org: 'Nathiara Borges · Law Office',
            highlights: [
                'Legal platform about the rights of people with disabilities, focused on autism (ASD): landing page, law office website, portfolio, mentoring page and link hub.',
                'Focus on accessibility, semantic HTML and clear navigation for its audience.',
            ],
        },
        unoesc: {
            period: 'Expected Dec 2027',
            title: 'B.Sc. in Computer Science',
            org: 'Unoesc · Videira, Brazil',
            highlights: [
                'Degree grounded in algorithms, data structures, relational databases and systems architecture.',
            ],
        },
    },
};

export const getExperience = (locale) => items.map((item) => ({ ...item, ...text[locale][item.id] }));
