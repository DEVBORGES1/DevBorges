import { FaBriefcase, FaMobileAlt, FaBalanceScale, FaGraduationCap } from 'react-icons/fa';

const items = [
    {
        id: 'nexus',
        icon: FaBriefcase,
        tech: ['TypeScript', 'React Native', 'Expo', 'PostgreSQL', 'MySQL', 'SQL Server', 'Nginx', 'GitHub Actions'],
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
        nexus: {
            period: 'Nov/2025 – Jun/2026',
            title: 'Software Engineer Jr',
            org: 'Nexus Labz · Remoto',
            highlights: [
                'Arquitetei e entreguei um app mobile em React Native (Expo) que chegou à produção, com pagamentos, cache offline e login com Google (OAuth).',
                'Defini a arquitetura das camadas mobile e backend, com autenticação JWT e comunicação segura com a API.',
                'Montei a infraestrutura de produção em VPS: Nginx como proxy reverso, SSL/TLS com Let’s Encrypt e hardening do servidor.',
                'Automatizei o deploy do backend com pipelines de CI/CD no GitHub Actions.',
                'Mentorei um desenvolvedor júnior e conduzi code reviews.',
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
        nexus: {
            period: 'Nov 2025 – Jun 2026',
            title: 'Junior Software Engineer',
            org: 'Nexus Labz · Remote',
            highlights: [
                'Architected and shipped a React Native (Expo) mobile app to production, with payments, offline caching and Google sign-in (OAuth).',
                'Defined the architecture of the mobile and backend layers, with JWT authentication and secure API communication.',
                'Set up the production infrastructure on a VPS: Nginx reverse proxy, SSL/TLS with Let’s Encrypt and server hardening.',
                'Automated backend deployments with CI/CD pipelines on GitHub Actions.',
                'Mentored a junior developer and led code reviews.',
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
