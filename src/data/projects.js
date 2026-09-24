import rcpImg from '../assets/projects/rcp.webp';
import expenseImg from '../assets/projects/expense-control.webp';
import linkthreeImg from '../assets/projects/linkthree.webp';
import videoImg from '../assets/projects/video-analyzer.webp';

export const projects = [
    {
        title: 'RCP — Sistema de Concursos',
        description: 'Plataforma SaaS para candidatos a concursos públicos: rotina de estudos personalizada, simulados interativos e dashboard de desempenho com gamificação. Backend com autenticação, gestão de simulados e registro de progresso.',
        image: rcpImg,
        imageAlt: 'Página inicial do RCP — Sistema de Concursos',
        tech: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
        repo: 'https://github.com/DEVBORGES1/RCP-Sistema-De-Concursos',
    },
    {
        title: 'Plataforma Jurídica — Dra. Nathiara Borges',
        description: 'Projeto para cliente: conjunto de sites sobre direitos das pessoas com deficiência (TEA) — landing page, site do escritório, portfólio, mentorias e hub de links — com foco em acessibilidade.',
        image: linkthreeImg,
        imageAlt: 'Site da Dra. Nathiara Borges, advogada especialista em direito dos autistas',
        tech: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
        repo: 'https://github.com/DEVBORGES1/LINKTHREE',
        demo: 'https://nathiaraborgesadv.vercel.app/',
    },
    {
        title: 'Expense Control',
        description: 'Aplicação desktop para finanças pessoais pensada para quem tem compulsão por compras: dashboard com gráficos, orçamentos por categoria, wishlist de compras planejadas, metas e gamificação para incentivar a economia.',
        image: expenseImg,
        imageAlt: 'Ilustração de dashboard financeiro do Expense Control',
        tech: ['Python', 'Desktop', 'Visualização de dados'],
        repo: 'https://github.com/DEVBORGES1/Expense-Control',
    },
    {
        title: 'Video Analyzer',
        description: 'Ferramenta em Python que extrai o áudio de vídeos, transcreve o conteúdo com IA e transforma a transcrição em um roteiro estruturado.',
        image: videoImg,
        imageAlt: 'Interface de análise de vídeo do Video Analyzer',
        tech: ['Python', 'OpenCV', 'IA'],
        repo: 'https://github.com/DEVBORGES1/Video-analyzer',
    },
];
