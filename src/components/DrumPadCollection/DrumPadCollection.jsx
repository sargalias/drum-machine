import React from 'react';
import DrumPad from 'components/DrumPad';
import styles from './DrumPadCollection.scss';

const createDrumPads = () => Array.from({ length: 8 }, () => <DrumPad />);

const DrumPadCollection = () => (
  <div className={styles.DrumPadCollection}>{createDrumPads()}</div>
);

export default DrumPadCollection;
