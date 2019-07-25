import React from 'react';
import styles from './SoundDisplay.scss';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
const SoundDisplay = ({ soundName = '-----------' }) => (
  <div className={styles.SoundDisplay} data-testid="soundDisplay">
    <label
      htmlFor="soundName"
      className={styles.SoundDisplay_label}
      id="soundNameLabel"
    >
      Sound name
      <output
        id="soundName"
        className={styles.SoundDisplay_output}
        data-testid="soundNameOutput"
      >
        {soundName}
      </output>
    </label>
  </div>
);
/* eslint-enable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

export default SoundDisplay;
