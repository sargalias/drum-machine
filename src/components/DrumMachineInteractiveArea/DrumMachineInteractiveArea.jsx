import React, { useReducer } from 'react';
import DrumPadCollection from 'components/DrumPadCollection';
import SoundDisplay from 'components/SoundDisplay';

// create JavaScript audio object
// create the handler function
//   plays audio object

const DrumMachineInteractiveArea = ({ drumPads }) => {
  const initialState = {
    W: { audio: new Audio((drumPads[0] && drumPads[0].audioSrc) || '') },
  };
  const [drumPadsState] = useReducer(() => {}, initialState);

  const handleDrumPadInteraction = () => {
    drumPadsState.W.audio.play();
  };

  return (
    <div>
      <DrumPadCollection
        drumPads={drumPads}
        handleDrumPadInteraction={handleDrumPadInteraction}
      />
      <SoundDisplay />
    </div>
  );
};

export default DrumMachineInteractiveArea;
