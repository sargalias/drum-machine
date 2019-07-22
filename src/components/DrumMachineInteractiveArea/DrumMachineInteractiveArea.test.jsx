import React from 'react';
import { render, fireEvent, cleanup } from 'testUtils';
import DrumMachineInteractiveArea from './DrumMachineInteractiveArea';
import drumPads, { drumPadsSingle } from './drumPadsHelper';

describe('DrumMachineInteractiveArea', () => {
  beforeEach(cleanup);

  describe('renders', () => {
    test('correct drumPads with empty drumPads prop', () => {
      const drumPadsProp = [];

      const { getAllByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsProp} />,
      );

      expect(() => getAllByTestId(/drumPad_button_*/)).toThrow();
    });

    test('correct drumPads with normal drumPads prop', () => {
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPads} />,
      );

      drumPads.forEach(({ letter }) => {
        const button = getByTestId(`drumPad_button_${letter}`);
        expect(button.textContent).toBe(letter);
      });
    });

    test('soundDisplay component', () => {
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

  describe('audio', () => {
    let originalAudio;
    let AudioMock;
    let playMock;
    let pauseMock;

    beforeEach(() => {
      originalAudio = window.Audio;
      AudioMock = jest.fn();
      playMock = jest.fn();
      pauseMock = jest.fn();
      AudioMock.prototype.play = playMock;
      AudioMock.prototype.pause = pauseMock;
      window.Audio = AudioMock;
    });

    afterEach(() => {
      window.Audio = originalAudio;
    });

    test('should play audio on drumPad click', () => {
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsSingle} />,
      );
      const button = getByTestId('drumPad_button_W');

      fireEvent.click(button);

      expect(playMock).toHaveBeenCalledTimes(1);
    });
  });
});
