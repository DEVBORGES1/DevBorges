import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

const StaggeredReveal = ({ children, staggerDelay = 0.2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    return (
        <m.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ width: '100%' }}
        >
            {children}
        </m.div>
    );
};

export const RevealItem = ({ children, ...props }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <m.div variants={itemVariants} {...props}>
            {children}
        </m.div>
    );
};

export default StaggeredReveal;
