import vitaleImg from '../assets/projects/vitale.webp';
import rcpImg from '../assets/projects/rcp.webp';
import expenseImg from '../assets/projects/expense-control.webp';
import linkthreeImg from '../assets/projects/linkthree.webp';
import videoImg from '../assets/projects/video-analyzer.webp';

const items = [
    {
        id: 'vitale',
        image: vitaleImg,
        tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL'],
        // Projeto para cliente: sem repositório público
    },
    {
        id: 'rcp',
        image: rcpImg,
        tech: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
        repo: 'https://github.com/DEVBORGES1/RCP-Sistema-De-Concursos',
    },
    {
        id: 'nathiara',
        image: linkthreeImg,
        tech: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
        repo: 'https://github.com/DEVBORGES1/LINKTHREE',
        demo: 'https://nathiaraborgesadv.vercel.app/',
    },
    {
        id: 'expense',
        image: expenseImg,
        tech: ['Python', 'Desktop', 'Data Viz'],
        repo: 'https://github.com/DEVBORGES1/Expense-Control',
    },
    {
        id: 'video',
        image: videoImg,
        tech: ['Python', 'OpenCV', 'IA'],
        repo: 'https://github.com/DEVBORGES1/Video-analyzer',
    },
];

const text = {
    pt: {
        vitale: {
            title: 'App Vitale — Gestão de Pilates',
            description: 'App mobile para Android e iOS de um estúdio de pilates, com áreas para alunos e instrutores: agenda e reserva de aulas, treinos e login com Google. Monorepo em TypeScript com controle de acesso por perfil, Row Level Security no Supabase e testes E2E com Playwright e Appium.',
            imageAlt: 'Mockups do App Vitale: tela de login, início do aluno e início da instrutora',
        },
        rcp: {
            title: 'RCP — Sistema de Concursos',
            description: 'Plataforma SaaS para candidatos a concursos públicos: rotina de estudos personalizada, simulados interativos e dashboard de desempenho com gamificação. Backend com autenticação, gestão de simulados e registro de progresso.',
            imageAlt: 'Página inicial do RCP — Sistema de Concursos',
        },
        nathiara: {
            title: 'Plataforma Jurídica — Dra. Nathiara Borges',
            description: 'Projeto para cliente: conjunto de sites sobre direitos das pessoas com deficiência (TEA) — landing page, site do escritório, portfólio, mentorias e hub de links — com foco em acessibilidade.',
            imageAlt: 'Site da Dra. Nathiara Borges, advogada especialista em direito dos autistas',
        },
        expense: {
            title: 'Expense Control',
            description: 'Aplicação desktop para finanças pessoais pensada para quem tem compulsão por compras: dashboard com gráficos, orçamentos por categoria, wishlist de compras planejadas, metas e gamificação para incentivar a economia.',
            imageAlt: 'Ilustração de dashboard financeiro do Expense Control',
        },
        video: {
            title: 'Video Analyzer',
            description: 'Ferramenta em Python que extrai o áudio de vídeos, transcreve o conteúdo com IA e transforma a transcrição em um roteiro estruturado.',
            imageAlt: 'Interface de análise de vídeo do Video Analyzer',
        },
    },
    en: {
        vitale: {
            title: 'Vitale App — Pilates Studio Management',
            description: 'Android and iOS mobile app for a Pilates studio, with areas for students and instructors: class schedule and booking, workouts and Google sign-in. TypeScript monorepo with role-based access control, Row Level Security on Supabase and E2E tests with Playwright and Appium.',
            imageAlt: 'Vitale App mockups: login screen, student home and instructor home',
        },
        rcp: {
            title: 'RCP — Exam Prep Platform',
            description: 'SaaS platform for candidates preparing for Brazilian public service exams: personalized study routines, interactive mock exams and a gamified performance dashboard. Backend with authentication, mock exam management and progress tracking.',
            imageAlt: 'RCP exam prep platform home page',
        },
        nathiara: {
            title: 'Legal Platform — Nathiara Borges',
            description: 'Client project: a set of websites about the rights of people with disabilities (autism) — landing page, law office website, portfolio, mentoring and link hub — with a focus on accessibility.',
            imageAlt: 'Website of Nathiara Borges, a lawyer specialized in autism rights',
        },
        expense: {
            title: 'Expense Control',
            description: 'Desktop personal finance app designed for compulsive shoppers: charts dashboard, category budgets, a wishlist for planned purchases, goals and gamification to encourage saving.',
            imageAlt: 'Illustration of the Expense Control finance dashboard',
        },
        video: {
            title: 'Video Analyzer',
            description: 'Python tool that extracts audio from videos, transcribes it with AI and turns the transcript into a structured script.',
            imageAlt: 'Video Analyzer analysis interface',
        },
    },
};

const techByLocale = { en: { IA: 'AI' }, pt: { 'Data Viz': 'Visualização de dados' } };

export const getProjects = (locale) =>
    items.map((item) => ({
        ...item,
        ...text[locale][item.id],
        tech: item.tech.map((t) => techByLocale[locale][t] ?? t),
    }));
