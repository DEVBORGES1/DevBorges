import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { skills, skillCategories } from '../data/skills';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');

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
                            <Tilt options={defaultOptions} className="skill-card">
                                <div className="icon-wrapper" aria-hidden="true">
                                    <Icon size={40} color={color} />
                                </div>
                                <h3>{name}</h3>
                            </Tilt>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Skills;
