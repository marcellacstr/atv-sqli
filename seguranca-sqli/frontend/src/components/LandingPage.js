// src/components/LandingPage.js
import React from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles.landingContainer}>
            <header className={styles.header}>
                <h1>Bem-vindo ao Nosso Site</h1>
                <p>Explore nossas funcionalidades e descubra tudo que oferecemos.</p>
                <button className={styles.ctaButton}>Saiba Mais</button>
            </header>
            <section className={styles.features}>
                <div className={styles.featureItem}>
                    <h3>Funcionalidade 1</h3>
                    <p>Descrição da funcionalidade 1.</p>
                </div>
                <div className={styles.featureItem}>
                    <h3>Funcionalidade 2</h3>
                    <p>Descrição da funcionalidade 2.</p>
                </div>
                <div className={styles.featureItem}>
                    <h3>Funcionalidade 3</h3>
                    <p>Descrição da funcionalidade 3.</p>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
