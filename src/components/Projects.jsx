import StaggeredReveal, { RevealItem } from './StaggeredReveal';
import { Tilt } from 'react-tilt';
import rcpImg from '../assets/projects/RCP1.png';
import expenseImg from '../assets/projects/ExpenseControl.png';
import linkthreeImg from '../assets/projects/linkthree.png';
import videoImg from '../assets/projects/video.png';

const Projects = () => {
    const projects = [
        {
            title: 'RCP Sistema de Concursos',
            description: 'Sistema gamificado completo para pessoas que estão se preparando para concursos públicos, organizando e te trazendo uma melhor forma de estudo.',
            link: 'https://github.com/DEVBORGES1/RCP-Sistema-De-Concursos',
            image: rcpImg,
            tech: ['PHP', 'MySQL', 'Bootstrap']
        },
        {
            title: 'Expense Control',
            description: 'Aplicação gamificada para controle de gastos para pessoas compulsivas.',
            link: 'https://github.com/DEVBORGES1/Expense-Control',
            image: expenseImg,
            tech: ['Python', 'Django', 'n8n Agent']
        },
        {
            title: 'LinkThree',
            description: 'Se trata de um conjunto de sites, Landing Page, Site do escritório, Portfolio e um site de mentoria que foi feito para minha cliente.',
            link: 'https://github.com/DEVBORGES1/LINKTHREE',
            image: linkthreeImg,
            tech: ['JavaScript', 'Node.js', 'CSS']
        },
        {
            title: 'Video Analyzer',
            description: 'Ferramenta que tem como objetivo analisar vídeos, transformar em mp3 e usando uma IA para transcrever o vídeo e transformar em um roteiro.',
            link: 'https://github.com/DEVBORGES1/Video-analyzer',
            image: videoImg,
            tech: ['Python', 'AI', 'OpenCV']
        },
    ];

    const defaultOptions = {
        reverse: false,
        max: 15,
        perspective: 1000,
        scale: 1.05,
        speed: 400,
        transition: true,
        axis: null,
        reset: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        glare: true,
        "max-glare": 0.3,
    }

    return (
        <section id="projects" className="projects">
            <h2>Meus Projetos</h2>
            <StaggeredReveal>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <RevealItem key={index} className="reveal-item-wrapper">
                            <Tilt options={defaultOptions} className="tilt-card-wrapper">
                                <div className="project-card">
                                    <div className="project-image-container">
                                        <img src={project.image} alt={project.title} className="project-image" />
                                        <div className="project-overlay">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-overlay">
                                                Ver Projeto
                                            </a>
                                        </div>
                                    </div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <div className="project-tags">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="tech-tag">{t}</span>
                                            ))}
                                        </div>
                                        <p>{project.description}</p>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                            Ver no GitHub &rarr;
                                        </a>
                                    </div>
                                </div>
                            </Tilt>
                        </RevealItem>
                    ))}
                </div>
            </StaggeredReveal>
        </section>
    );
};

export default Projects;
