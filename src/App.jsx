import React from 'react';
import 'abstracts/variables.scss';
import 'base/base.scss';
import 'base/typography.scss';
import DrumMachineInteractiveArea from 'components/DrumMachineInteractiveArea';
import Instructions from 'components/Instructions';
import Footer from 'components/Footer';
import drumPads from './config/drumPads';
import styles from './App.scss';

const App = () => (
  <div className={styles.App}>
    <h1 className={styles.App_heading}>Drum machine</h1>
    <DrumMachineInteractiveArea drumPads={drumPads} />
    <Instructions />
    <Footer parentClass={styles.App_Footer} />
  </div>
);

export default App;
