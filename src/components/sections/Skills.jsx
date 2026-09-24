import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { skills, skillCategories } from '../../data/skills';
import './Skills.css';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const filteredSkills = activeCategory === 'Todos'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    return (
        <Section id="skills" className="skills" title="Habilidades & Tecnologias">
            <div className="skills-tabs">
                {skillCategories.map((category) => (
                    <button
                        key={category}
                        className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                        aria-pressed={activeCategory === category}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <motion.div layout className="skills-grid">
                <AnimatePresence>
                    {filteredSkills.map(({ name, icon: Icon, color }) => (
                        <motion.div
                            key={name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="skill-card">
                                <div className="icon-wrapper" aria-hidden="true">
                                    <Icon size={40} color={color} />
                                </div>
                                <h3>{name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </Section>
    );
};

export default Skills;
