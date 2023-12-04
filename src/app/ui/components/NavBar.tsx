"use client"
import React from 'react';
import styles from '@/app/ui/components/NavBar.module.css';
import Link from "next/link";
import Image from "next/image";
const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <Link href={'/'}><Image src="/icon.svg" width={145} height={25} alt={"icon"} priority={true}/></Link>
            <div className={styles.NavBarContainer}>
                <div className={styles.ShortCuts}>
                    <Link href={'/discover'}><p>Découvrir</p></Link>
                    <Link href={'/movies'}><p>Films</p></Link>
                    <Link href={'/series'}><p>Séries</p></Link>
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