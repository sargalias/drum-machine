/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import styles from './DrumPad.scss';

const DrumPad = ({ letter, audioSrc }) => (
  <button className={styles.DrumPad} type="button">
    {letter}
    <audio src={audioSrc} data-testid={`drumPad_audio_${letter}`} />
  </button>
);

export default DrumPad;
