import React from 'react';
import DrumPadCollection from 'components/DrumPadCollection';
import SoundDisplay from 'components/SoundDisplay';

const DrumMachineInteractiveArea = ({ drumPads }) => (
  <div>
    <DrumPadCollection drumPads={drumPads} />
    <SoundDisplay />
  </div>
);

export default DrumMachineInteractiveArea;
