import { useTilt } from '../../hooks/useTilt';
import './Tilt.css';

const Tilt = ({ children, className = '', max, scale, perspective }) => {
    const ref = useTilt({ max, scale, perspective });

    return (
        <div ref={ref} className={`tilt ${className}`.trim()}>
            {children}
        </div>
    );
};

export default Tilt;
