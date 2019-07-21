import React from 'react';
import { render, cleanup } from 'testUtils';
import DrumMachineInteractiveArea from './DrumMachineInteractiveArea';
import drumPads from './drumPadsHelper';

describe('DrumMachineInteractiveArea', () => {
  beforeEach(cleanup);

  test('renders correct drumPads with empty drumPads prop', () => {
    const drumPadsProp = [];

    const { getAllByTestId } = render(
      <DrumMachineInteractiveArea drumPads={drumPadsProp} />,
    );

    expect(() => getAllByTestId(/drumPad_button_*/)).toThrow();
  });

  test('renders correct drumPads with normal drumPads prop', () => {
    const { getByTestId } = render(
      <DrumMachineInteractiveArea drumPads={drumPads} />,
    );

    drumPads.forEach(({ letter, audioSrc }) => {
      const button = getByTestId(`drumPad_button_${letter}`);
      const audio = getByTestId(`drumPad_audio_${letter}`);
      expect(button.textContent).toBe(letter);
      expect(audio.getAttribute('src')).toBe(audioSrc);
    });
  });

  test('renders soundDisplay component', () => {
    const { getByTestId: getByTestId1 } = render(
      <DrumMachineInteractiveArea drumPads={[]} />,
    );
    expect(() => getByTestId1('soundDisplay')).not.toThrow();
    cleanup();

    const { getByTestId: getAllByTestId2 } = render(
      <DrumMachineInteractiveArea drumPads={drumPads} />,
    );
    expect(() => getAllByTestId2('soundDisplay')).not.toThrow();
  });
});
