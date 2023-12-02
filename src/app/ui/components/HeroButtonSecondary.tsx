
import React from 'react';
import styles from '@/app/ui/components/HeroButtonSecondary.module.css';
interface HeroButtonPrimaryProps {
    children: React.ReactNode
}
const HeroButtonSecondary: React.FC<HeroButtonPrimaryProps> = ({ children }) => {
    return (
        <button
            type="button"
            className={styles.secondaryButton}
        >
            {children}
        </button>
    );
};

export default HeroButtonSecondary;