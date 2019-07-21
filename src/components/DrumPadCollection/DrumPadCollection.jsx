import React from 'react';
import DrumPad from 'components/DrumPad';
import styles from './DrumPadCollection.scss';

const DrumPadCollection = ({ drumPads }) => (
  <div className={styles.DrumPadCollection}>
    {drumPads.map(({ letter, audioSrc }) => (
      <DrumPad letter={letter} audioSrc={audioSrc} key={letter} />
    ))}
  </div>
);

export default DrumPadCollection;
