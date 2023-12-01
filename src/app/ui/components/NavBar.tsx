import React from 'react';
import styles from '@/app/ui/components/NavBar.module.css';
import Link from "next/link";
const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <Link href={'/'}><img src="/icon.svg" width={145} alt={"icon"}/></Link>
            <div className={styles.NavBarContainer}>
                <div className={styles.ShortCuts}>
                    <Link href={'/home'}><p>Tendances</p></Link>
                    <p>Nouveautés</p>
                    <p>Découvrir</p>
                </div>
                <div className={styles.ShortCuts}>
                    <p>Favoris</p>
                    <p>Enregistrés</p>
                </div>
            </div>

        </div>
    );
};

export default NavBar;