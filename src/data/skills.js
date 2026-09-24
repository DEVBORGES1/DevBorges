import { FaReact, FaNodeJs, FaPython, FaJs, FaGitAlt, FaAws, FaLinux, FaVial } from 'react-icons/fa';
import {
    SiMysql, SiPhp, SiTypescript, SiPostgresql, SiMongodb, SiLaravel, SiDotnet,
    SiSupabase, SiNginx, SiGithubactions, SiExpo,
} from 'react-icons/si';
import { TbBrandReactNative, TbSql } from 'react-icons/tb';

export const skillCategories = ['Todos', 'Backend', 'Frontend & Mobile', 'Banco de Dados', 'DevOps & Qualidade'];

export const skills = [
    { name: 'Node.js', category: 'Backend', icon: FaNodeJs, color: '#339933' },
    { name: 'PHP', category: 'Backend', icon: SiPhp, color: '#777BB4' },
    { name: 'Laravel', category: 'Backend', icon: SiLaravel, color: '#FF2D20' },
    { name: 'C# / .NET', category: 'Backend', icon: SiDotnet, color: '#8C6BDB' },
    { name: 'Python', category: 'Backend', icon: FaPython, color: '#3776AB' },

    { name: 'TypeScript', category: 'Frontend & Mobile', icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', category: 'Frontend & Mobile', icon: FaJs, color: '#F7DF1E' },
    { name: 'React', category: 'Frontend & Mobile', icon: FaReact, color: '#61DAFB' },
    { name: 'React Native', category: 'Frontend & Mobile', icon: TbBrandReactNative, color: '#61DAFB' },
    { name: 'Expo', category: 'Frontend & Mobile', icon: SiExpo, color: '#FFFFFF' },

    { name: 'PostgreSQL', category: 'Banco de Dados', icon: SiPostgresql, color: '#4F8CC9' },
    { name: 'MySQL', category: 'Banco de Dados', icon: SiMysql, color: '#4479A1' },
    { name: 'SQL Server', category: 'Banco de Dados', icon: TbSql, color: '#CC2927' },
    { name: 'Supabase', category: 'Banco de Dados', icon: SiSupabase, color: '#3ECF8E' },
    { name: 'MongoDB', category: 'Banco de Dados', icon: SiMongodb, color: '#47A248' },

    { name: 'Git', category: 'DevOps & Qualidade', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub Actions', category: 'DevOps & Qualidade', icon: SiGithubactions, color: '#2088FF' },
    { name: 'Nginx', category: 'DevOps & Qualidade', icon: SiNginx, color: '#009639' },
    { name: 'Linux', category: 'DevOps & Qualidade', icon: FaLinux, color: '#FCC624' },
    { name: 'AWS', category: 'DevOps & Qualidade', icon: FaAws, color: '#FF9900' },
    { name: 'Playwright / Appium', category: 'DevOps & Qualidade', icon: FaVial, color: '#45BA4B' },
];
