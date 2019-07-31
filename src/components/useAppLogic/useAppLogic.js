import { useState, useReducer } from 'react';

const init = drumPads => {
  const drumPadsState = {};
  drumPads.forEach(({ letter, audioSrc, soundName }) => {
    drumPadsState[letter] = {
      audio: new Audio(audioSrc),
      soundName,
    };
  });
  return drumPadsState;
};

const reducer = (state, { type, payload }) => {
  const newState = clone(state);
  if (type === 'updateTimeoutId') {
    newState[payload.letter].timeoutId = payload.timeoutId;
  }
  return newState;
};

const clone = (original, i = 0) => {
  const copy = {};
  Object.entries(original).forEach(([key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(original, key)) {
      return;
    }

    let finalValue = value;

    // if nested object, copy once more
    if (value && typeof value === 'object' && i === 0) {
      finalValue = clone(value, 1);
    }

    copy[key] = finalValue;
  });
  return copy;
};

const useAppLogic = drumPads => {
  const [drumPadsState, drumPadsDispatch] = useReducer(reducer, drumPads, init);
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
