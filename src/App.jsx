import React from 'react';
import 'abstracts/variables.scss';
import 'base/base.scss';
import 'base/typography.scss';
import DrumMachineInteractiveArea from 'components/DrumMachineInteractiveArea';
import Instructions from 'components/Instructions';

const App = () => (
  <div>
    <h1>Drum machine</h1>
    <DrumMachineInteractiveArea drumPads={[]} />
    <Instructions />
  </div>
);

export default App;
