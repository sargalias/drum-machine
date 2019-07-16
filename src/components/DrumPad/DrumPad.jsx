import React from 'react';
import styles from './DrumPad.scss';

const DrumPad = ({ letter }) => (
  <button className={styles.DrumPad} type="button">
    {letter}
  </button>
);

export default DrumPad;
