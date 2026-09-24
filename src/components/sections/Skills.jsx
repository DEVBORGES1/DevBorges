import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Section from '../layout/Section';
import { skills, skillCategories } from '../../data/skills';
import { useLocale } from '../../i18n/context';
import './Skills.css';

const Skills = () => {
    const { locale, t } = useLocale();
    const [activeCategory, setActiveCategory] = useState('all');
    const tabs = [{ id: 'all', label: t.skills.all }, ...skillCategories.map((c) => ({ id: c.id, label: c.label[locale] }))];

    const filteredSkills = activeCategory === 'all'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);

    return (
        <Section id="skills" className="skills" title={t.skills.title}>
            <div className="skills-tabs">
                {tabs.map(({ id, label }) => (
                    <button
                        key={id}
                        className={`tab-btn ${activeCategory === id ? 'active' : ''}`}
                        aria-pressed={activeCategory === id}
                        onClick={() => setActiveCategory(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <m.div layout className="skills-grid">
                <AnimatePresence>
                    {filteredSkills.map(({ name, icon: Icon, color }) => (
                        <m.div
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
                        </m.div>
                    ))}
                </AnimatePresence>
            </m.div>
        </Section>
    );
};

export default Skills;
