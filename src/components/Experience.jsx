import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaServer, FaRocket } from 'react-icons/fa';

const Experience = () => {
    const milestones = [
        {
            year: 'Out/2024',
            title: 'Início da Jornada',
            description: 'Comecei meus estudos em desenvolvimento web, explorando HTML, CSS e JavaScript.',
            icon: <FaCode />
        },
        {
            year: 'Jan/2025',
            title: 'Expense Control',
            description: 'Lancei o projeto de controle de despesas para praticar manipulação de DOM e lógica JS.',
            icon: <FaLaptopCode />
        },
        {
            year: 'Mar/2025',
            title: 'RCP Sistema',
            description: 'Desenvolvimento do sistema completo para gestão de concursos, aplicando conhecimentos de Backend e Banco de Dados.',
            icon: <FaServer />
        },
        {
            year: 'Atualmente',
            title: 'Portfólio v1',
            description: 'Lançamento deste portfólio utilizando React e Vite com foco em performance e design.',
            icon: <FaRocket />
        }
    ];

    return (
        <section id="experience" className="experience">
            <h2>Minha Jornada</h2>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {milestones.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="timeline-icon">
                            {item.icon}
                        </div>
                        <div className="timeline-content">
                            <span className="timeline-date">{item.year}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
