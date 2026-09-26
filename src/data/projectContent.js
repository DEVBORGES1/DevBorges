// Conteúdo dos projetos, sem imagens: também é lido por scripts em Node
// (scripts/generate-pages.mjs, vite.config.js e scripts/prerender.mjs), que não importam .webp.
// A ordem da lista é a ordem de exibição; `featured` marca os que aparecem na home.
export const projectItems = [
    {
        id: 'vitale',
        category: 'mobile',
        year: 2026,
        color: '#a7f3d0',
        featured: true,
        tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
        // Projeto para cliente: sem repositório público
    },
    {
        id: 'rcp',
        category: 'fullstack',
        year: 2025,
        color: '#fcd34d',
        featured: true,
        tech: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
        repo: 'https://github.com/DEVBORGES1/RCP-Sistema-De-Concursos',
    },
    {
        id: 'nathiara',
        category: 'frontend',
        year: 2026,
        color: '#f9a8d4',
        featured: true,
        tech: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
        repo: 'https://github.com/DEVBORGES1/LINKTHREE',
        demo: 'https://nathiaraborgesadv.vercel.app/',
    },
    {
        id: 'expense',
        category: 'desktop',
        year: 2025,
        color: '#bef264',
        tech: ['Python', 'Desktop', 'Data Viz'],
        repo: 'https://github.com/DEVBORGES1/Expense-Control',
    },
    {
        id: 'video',
        category: 'ai',
        year: 2024,
        color: '#7dd3fc',
        tech: ['Python', 'OpenCV', 'IA'],
        repo: 'https://github.com/DEVBORGES1/Video-analyzer',
    },
];

export const projectIds = projectItems.map((item) => item.id);

export const projectText = {
    pt: {
        vitale: {
            title: 'App Vitale — Gestão de Pilates',
            role: 'Desenvolvedor Full Stack (freelance)',
            description: 'App mobile para Android e iOS de um estúdio de pilates, com áreas para alunos e instrutores: agenda e reserva de aulas, treinos e login com Google. Monorepo em TypeScript com controle de acesso por perfil, Row Level Security no Supabase e testes E2E com Playwright e Appium.',
            imageAlt: 'Mockups do App Vitale: tela de login, início do aluno e início da instrutora',
        },
        rcp: {
            title: 'RCP — Sistema de Concursos',
            role: 'Desenvolvedor Full Stack',
            description: 'Plataforma SaaS para candidatos a concursos públicos: rotina de estudos personalizada, simulados interativos e dashboard de desempenho com gamificação. Backend com autenticação, gestão de simulados e registro de progresso.',
            imageAlt: 'Página inicial do RCP — Sistema de Concursos',
        },
        nathiara: {
            title: 'Plataforma Jurídica — Dra. Nathiara Borges',
            role: 'Desenvolvedor Front-end (freelance)',
            description: 'Projeto para cliente: conjunto de sites sobre direitos das pessoas com deficiência (TEA) — landing page, site do escritório, portfólio, mentorias e hub de links — com foco em acessibilidade.',
            imageAlt: 'Site da Dra. Nathiara Borges, advogada especialista em direito dos autistas',
        },
        expense: {
            title: 'Expense Control',
            role: 'Desenvolvedor',
            description: 'Aplicação desktop para finanças pessoais pensada para quem tem compulsão por compras: dashboard com gráficos, orçamentos por categoria, wishlist de compras planejadas, metas e gamificação para incentivar a economia.',
            imageAlt: 'Ilustração de dashboard financeiro do Expense Control',
        },
        video: {
            title: 'Video Analyzer',
            role: 'Desenvolvedor',
            description: 'Ferramenta em Python que extrai o áudio de vídeos, transcreve o conteúdo com IA e transforma a transcrição em um roteiro estruturado.',
            imageAlt: 'Interface de análise de vídeo do Video Analyzer',
        },
    },
    en: {
        vitale: {
            title: 'Vitale App — Pilates Studio Management',
            role: 'Full Stack Developer (freelance)',
            description: 'Android and iOS mobile app for a Pilates studio, with areas for students and instructors: class schedule and booking, workouts and Google sign-in. TypeScript monorepo with role-based access control, Row Level Security on Supabase and E2E tests with Playwright and Appium.',
            imageAlt: 'Vitale App mockups: login screen, student home and instructor home',
        },
        rcp: {
            title: 'RCP — Exam Prep Platform',
            role: 'Full Stack Developer',
            description: 'SaaS platform for candidates preparing for Brazilian public service exams: personalized study routines, interactive mock exams and a gamified performance dashboard. Backend with authentication, mock exam management and progress tracking.',
            imageAlt: 'RCP exam prep platform home page',
        },
        nathiara: {
            title: 'Legal Platform — Nathiara Borges',
            role: 'Front-end Developer (freelance)',
            description: 'Client project: a set of websites about the rights of people with disabilities (autism) — landing page, law office website, portfolio, mentoring and link hub — with a focus on accessibility.',
            imageAlt: 'Website of Nathiara Borges, a lawyer specialized in autism rights',
        },
        expense: {
            title: 'Expense Control',
            role: 'Developer',
            description: 'Desktop personal finance app designed for compulsive shoppers: charts dashboard, category budgets, a wishlist for planned purchases, goals and gamification to encourage saving.',
            imageAlt: 'Illustration of the Expense Control finance dashboard',
        },
        video: {
            title: 'Video Analyzer',
            role: 'Developer',
            description: 'Python tool that extracts audio from videos, transcribes it with AI and turns the transcript into a structured script.',
            imageAlt: 'Video Analyzer analysis interface',
        },
    },
};

