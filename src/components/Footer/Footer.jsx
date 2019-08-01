import React from 'react';
import styles from './Footer.scss';

const Footer = ({ parentClass = '' }) => (
  <footer className={`${styles.Footer} ${parentClass}`}>
    <div className={styles.Footer_content}>
      <div className="attribution">
        By{' '}
        <a
          href="https://sargalias.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spyros Argalias
        </a>
      </div>
      <p className={styles.Footer_sourceCode}>
        <a
          href="https://github.com/sargalias/drum-machine"
          target="_blank"
          rel="noopener noreferrer"
        >
          View code on GitHub
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
