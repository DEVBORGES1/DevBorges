import vitaleImg from '../assets/projects/vitale.webp';
import rcpImg from '../assets/projects/rcp.webp';
import expenseImg from '../assets/projects/expense-control.webp';
import linkthreeImg from '../assets/projects/linkthree.webp';
import videoImg from '../assets/projects/video-analyzer.webp';
import { projectItems, projectText } from './projectContent';
import { projectRoute } from '../i18n/routes';

const images = {
    vitale: vitaleImg,
    rcp: rcpImg,
    nathiara: linkthreeImg,
    expense: expenseImg,
    video: videoImg,
};

const techByLocale = { en: { IA: 'AI' }, pt: { 'Data Viz': 'Visualização de dados' } };

export const getProjects = (locale) =>
    projectItems.map((item) => ({
        ...item,
        ...projectText[locale][item.id],
        image: images[item.id],
        href: projectRoute(item.id, locale),
        tech: item.tech.map((t) => techByLocale[locale][t] ?? t),
    }));

export const getProject = (id, locale) => getProjects(locale).find((project) => project.id === id);
