import React, { useReducer } from 'react';
import DrumPadCollection from 'components/DrumPadCollection';
import SoundDisplay from 'components/SoundDisplay';

const init = drumPads => {
  const drumPadsState = {};
  drumPads.forEach(({ letter, audioSrc }) => {
    drumPadsState[letter] = {
      audio: new Audio(audioSrc),
    };
  });
  return drumPadsState;
};

const DrumMachineInteractiveArea = ({ drumPads }) => {
  const [drumPadsState] = useReducer(() => {}, drumPads, init);

  const handleDrumPadInteraction = letter => {
    drumPadsState[letter].audio.play();
    setTimeoutStopAudioPlaying(letter);
  };

  const setTimeoutStopAudioPlaying = letter => {
    setTimeout(() => {
      drumPadsState[letter].audio.pause();
    }, 1000);
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
