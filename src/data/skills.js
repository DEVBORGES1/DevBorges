import { FaReact, FaNodeJs, FaPython, FaJs, FaGitAlt, FaAws, FaLinux, FaVial } from 'react-icons/fa';
import {
    SiMysql, SiPhp, SiTypescript, SiPostgresql, SiMongodb, SiLaravel, SiDotnet,
    SiSupabase, SiNginx, SiGithubactions, SiExpo,
} from 'react-icons/si';
import { TbBrandReactNative, TbSql } from 'react-icons/tb';

export const skillCategories = [
    { id: 'backend', label: { pt: 'Backend', en: 'Backend' } },
    { id: 'frontend', label: { pt: 'Frontend & Mobile', en: 'Frontend & Mobile' } },
    { id: 'database', label: { pt: 'Banco de Dados', en: 'Databases' } },
    { id: 'devops', label: { pt: 'DevOps & Qualidade', en: 'DevOps & Quality' } },
];

export const skills = [
    { name: 'Node.js', category: 'backend', icon: FaNodeJs, color: '#339933' },
    { name: 'PHP', category: 'backend', icon: SiPhp, color: '#777BB4' },
    { name: 'Laravel', category: 'backend', icon: SiLaravel, color: '#FF2D20' },
    { name: 'C# / .NET', category: 'backend', icon: SiDotnet, color: '#8C6BDB' },
    { name: 'Python', category: 'backend', icon: FaPython, color: '#3776AB' },

    { name: 'TypeScript', category: 'frontend', icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', category: 'frontend', icon: FaJs, color: '#F7DF1E' },
    { name: 'React', category: 'frontend', icon: FaReact, color: '#61DAFB' },
    { name: 'React Native', category: 'frontend', icon: TbBrandReactNative, color: '#61DAFB' },
    { name: 'Expo', category: 'frontend', icon: SiExpo, color: '#FFFFFF' },

    { name: 'PostgreSQL', category: 'database', icon: SiPostgresql, color: '#4F8CC9' },
    { name: 'MySQL', category: 'database', icon: SiMysql, color: '#4479A1' },
    { name: 'SQL Server', category: 'database', icon: TbSql, color: '#CC2927' },
    { name: 'Supabase', category: 'database', icon: SiSupabase, color: '#3ECF8E' },
    { name: 'MongoDB', category: 'database', icon: SiMongodb, color: '#47A248' },

    { name: 'Git', category: 'devops', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub Actions', category: 'devops', icon: SiGithubactions, color: '#2088FF' },
    { name: 'Nginx', category: 'devops', icon: SiNginx, color: '#009639' },
    { name: 'Linux', category: 'devops', icon: FaLinux, color: '#FCC624' },
    { name: 'AWS', category: 'devops', icon: FaAws, color: '#FF9900' },
    { name: 'Playwright / Appium', category: 'devops', icon: FaVial, color: '#45BA4B' },
];
