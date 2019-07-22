import React from 'react';
import DrumPad from 'components/DrumPad';
import styles from './DrumPadCollection.scss';

const DrumPadCollection = ({ drumPads, handleDrumPadInteraction }) => (
  <div className={styles.DrumPadCollection}>
    {drumPads.map(({ letter }) => (
      <DrumPad
        letter={letter}
        onInteraction={handleDrumPadInteraction}
        key={letter}
      />
    ))}
  </div>
);

export default DrumPadCollection;
