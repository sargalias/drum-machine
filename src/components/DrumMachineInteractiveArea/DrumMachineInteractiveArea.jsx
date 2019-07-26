import React from 'react';
import DrumPadCollection from 'components/DrumPadCollection';
import SoundDisplay from 'components/SoundDisplay';
import useAppLogic from 'components/useAppLogic';

const DrumMachineInteractiveArea = ({ drumPads }) => {
  const [handleDrumPadInteraction, lastSoundName] = useAppLogic(drumPads);

  return (
    <div>
      <DrumPadCollection
        drumPads={drumPads}
        handleDrumPadInteraction={handleDrumPadInteraction}
      />
      <SoundDisplay soundName={lastSoundName} />
    </div>
  );
};

export default DrumMachineInteractiveArea;
