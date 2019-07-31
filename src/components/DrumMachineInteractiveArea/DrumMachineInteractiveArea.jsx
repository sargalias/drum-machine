import React, { useEffect } from 'react';
import DrumPadCollection from 'components/DrumPadCollection';
import SoundDisplay from 'components/SoundDisplay';
import useAppLogic from 'customHooks/useDrumMachineInteractiveLogic';

const DrumMachineInteractiveArea = ({ drumPads }) => {
  const [handleDrumPadInteraction, lastSoundName] = useAppLogic(drumPads);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      const upperCaseKey = key && key.toUpperCase();
      const isInDrumPads = drumPads.some(
        ({ letter }) => letter === upperCaseKey,
      );
      if (isInDrumPads) {
        handleDrumPadInteraction(upperCaseKey);
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, [drumPads, handleDrumPadInteraction]);

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
