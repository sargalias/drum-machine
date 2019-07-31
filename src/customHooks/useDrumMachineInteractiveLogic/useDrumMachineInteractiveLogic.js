import { useState, useReducer } from 'react';
import {
  drumMachineInteractiveLogicReducer,
  drumMachineInteractiveLogicInit,
} from '../../reducers/drumMachineInteractiveLogicReducer';

const useAppLogic = drumPads => {
  const [drumPadsState, drumPadsDispatch] = useReducer(
    drumMachineInteractiveLogicReducer,
    drumPads,
    drumMachineInteractiveLogicInit,
  );
  const [lastSoundName, setLastSoundName] = useState();

  const handleDrumPadInteraction = letter => {
    const { audio, timeoutId: currentTimeoutId } = drumPadsState[letter];
    restartAudio(audio, currentTimeoutId);
    const timeoutId = setTimeoutStopAudioPlaying(letter);
    setLastSoundName(drumPadsState[letter].soundName);
    updateTimeoutId(letter, timeoutId);
  };

  const restartAudio = (audio, timeoutId) => {
    clearInterval(timeoutId);
    audio.currentTime = 0; // eslint-disable-line
    audio.play();
  };

  const setTimeoutStopAudioPlaying = letter =>
    setTimeout(() => {
      drumPadsState[letter].audio.pause();
    }, 500);

  const updateTimeoutId = (letter, timeoutId) => {
    const action = {
      type: 'updateTimeoutId',
      payload: {
        letter,
        timeoutId,
      },
    };
    drumPadsDispatch(action);
  };

  return [handleDrumPadInteraction, lastSoundName];
};

export default useAppLogic;
