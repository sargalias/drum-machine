import React from 'react';
import styles from './Instructions.scss';

const Instructions = () => (
  <section className={styles.Instructions}>
    <h2>Instructions</h2>
    <div>
      <ul className={styles.Instructions_instructionList}>
        <li className={styles.Instructions_instruction}>
          Click on a drum pad to play a sound.
        </li>
        <li className={styles.Instructions_instruction}>
          The sound name will be displayed in the sound display area.
        </li>
        <li className={styles.Instructions_instruction}>
          Press the corresponding key on your keyboard to play the drumpad with
          that key.
        </li>
      </ul>
    </div>
  </section>
);

export default Instructions;
