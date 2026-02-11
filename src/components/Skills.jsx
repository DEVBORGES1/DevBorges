import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import {
    FaReact, FaNodeJs, FaPython, FaJs, FaGitAlt, FaAws, FaLinux
} from 'react-icons/fa';
import {
    SiMysql, SiPhp, SiTypescript, SiPostgresql, SiMongodb, SiDjango
} from 'react-icons/si';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const skills = [
        // Frontend
        { name: 'React', category: 'Frontend', level: 90, icon: <FaReact size={40} color="#61DAFB" /> },
        { name: 'JavaScript', category: 'Frontend', level: 95, icon: <FaJs size={40} color="#F7DF1E" /> },
        { name: 'TypeScript', category: 'Frontend', level: 85, icon: <SiTypescript size={40} color="#3178C6" /> },

        // Backend
        { name: 'Node.js', category: 'Backend', level: 85, icon: <FaNodeJs size={40} color="#339933" /> },
        { name: 'PHP', category: 'Backend', level: 80, icon: <SiPhp size={40} color="#777BB4" /> },
        { name: 'Python', category: 'Backend', level: 75, icon: <FaPython size={40} color="#3776AB" /> },
        { name: 'Django', category: 'Backend', level: 70, icon: <SiDjango size={40} color="#092E20" /> },
        { name: 'C#', category: 'Backend', level: 70, icon: <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#239120' }}>C#</span> },

        // Database
        { name: 'MySQL', category: 'Backend', level: 85, icon: <SiMysql size={40} color="#4479A1" /> },
        { name: 'PostgreSQL', category: 'Backend', level: 80, icon: <SiPostgresql size={40} color="#336791" /> },
        { name: 'MongoDB', category: 'Backend', level: 75, icon: <SiMongodb size={40} color="#47A248" /> },

        // Tools/DevOps
        { name: 'Git', category: 'Ferramentas', level: 90, icon: <FaGitAlt size={40} color="#F05032" /> },
        { name: 'AWS', category: 'Ferramentas', level: 65, icon: <FaAws size={40} color="#FF9900" /> },
        { name: 'Linux', category: 'Ferramentas', level: 80, icon: <FaLinux size={40} color="#FCC624" /> },
    ];

    const categories = ['Todos', 'Frontend', 'Backend', 'Ferramentas'];

    const filteredSkills = activeCategory === 'Todos'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    const defaultOptions = {
        reverse: false,
        max: 25,
        perspective: 1000,
        scale: 1.05,
        speed: 400,
        transition: true,
        axis: null,
        reset: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        glare: true,
        "max-glare": 0.4,
    }

    return (
        <section id="skills" className="skills">
            <h2>Habilidades & Tecnologias</h2>

            <div className="skills-tabs">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <motion.div layout className="skills-grid">
                <AnimatePresence>
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Tilt options={defaultOptions} className="skill-card">
                                <div className="icon-wrapper">
                                    {skill.icon}
                                </div>
                                <h3>{skill.name}</h3>

                            </Tilt>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Skills;
