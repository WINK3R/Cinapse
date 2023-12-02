"use client"
import React from 'react';
import styles from '@/app/ui/components/HeroButtonPrimary.module.css';
interface HeroButtonPrimaryProps {
    children: React.ReactNode
}
const HeroButtonPrimary: React.FC<HeroButtonPrimaryProps> = ({ children }) => {
    return (
        <button
            type="button"
            className={styles.primaryButton}
        >
            {children}
        </button>
    );
};

export default HeroButtonPrimary;