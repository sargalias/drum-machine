import React from 'react';
import DrumPad from 'components/DrumPad';
import styles from './DrumPadCollection.scss';
import audioSrc from '../../audio/AM_AmbiArpD120-02.wav';

const createDrumPads = () =>
  Array.from({ length: 8 }, (el, i) => (
    <DrumPad letter="W" audioSrc={audioSrc} key={i} />
  ));

const DrumPadCollection = () => (
  <div className={styles.DrumPadCollection}>{createDrumPads()}</div>
);

export default DrumPadCollection;
