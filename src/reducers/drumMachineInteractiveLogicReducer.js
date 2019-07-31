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

export {
  reducer as drumMachineInteractiveLogicReducer,
  init as drumMachineInteractiveLogicInit,
};
