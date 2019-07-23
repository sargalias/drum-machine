import React from 'react';
import { render, fireEvent, cleanup } from 'testUtils';
import DrumMachineInteractiveArea from './DrumMachineInteractiveArea';
import { drumPadsSingle, drumPadsNormal } from './drumPadsHelper';

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
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );

      drumPadsNormal.forEach(({ letter }) => {
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
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );
      expect(() => getAllByTestId2('soundDisplay')).not.toThrow();
    });
  });

  describe('audio', () => {
    let AudioMock;

    beforeEach(() => {
      // eslint-disable-next-line
      AudioMock = jest.fn(function() {
        this.play = jest.fn();
        this.pause = jest.fn();
      });
      jest.spyOn(window, 'Audio').mockImplementation(AudioMock);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('should play audio on drumPad click', () => {
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsSingle} />,
      );
      const button = getByTestId('drumPad_button_W');

      fireEvent.click(button);

      expect(AudioMock.mock.instances[0].play).toHaveBeenCalledTimes(1);
    });

    test('should play correct audio with different drumPad clicks', () => {
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );
      const buttonW = getByTestId('drumPad_button_W');
      const buttonE = getByTestId('drumPad_button_E');
      const playMockW = AudioMock.mock.instances[0].play;
      const playMockE = AudioMock.mock.instances[1].play;

      fireEvent.click(buttonW);
      expect(playMockW).toHaveBeenCalledTimes(1);
      expect(playMockE).not.toHaveBeenCalled();

      fireEvent.click(buttonE);
      expect(playMockW).toHaveBeenCalledTimes(1);
      expect(playMockE).toHaveBeenCalledTimes(1);
    });

    test('should stop audio playing after 1 second with multiple drumpads', () => {
      jest.useFakeTimers();
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );
      const buttonW = getByTestId('drumPad_button_W');
      const buttonE = getByTestId('drumPad_button_E');
      const audioInstanceW = AudioMock.mock.instances[0];
      const audioInstanceE = AudioMock.mock.instances[1];

      // Click on W
      fireEvent.click(buttonW);
      jest.advanceTimersByTime(100); // total 100ms

      // Click on E
      fireEvent.click(buttonE);

      // Play should have been called for both, pause should not have been called
      expect(audioInstanceW.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceW.pause).not.toHaveBeenCalled();
      expect(audioInstanceE.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(850); // total 950ms
      expect(audioInstanceW.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceW.pause).not.toHaveBeenCalled();
      expect(audioInstanceE.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100); // 1050ms total
      expect(audioInstanceW.pause).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100); // 1150ms total
      expect(audioInstanceW.pause).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.pause).toHaveBeenCalledTimes(1);
    });

    test('on multiple clicks close together, should restart audio properly and should finish playing 1s after final click', () => {
      jest.useFakeTimers();
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );
      const buttonW = getByTestId('drumPad_button_W');
      const audioInstance = AudioMock.mock.instances[0];
      expect(audioInstance.play).not.toHaveBeenCalled();
      expect(audioInstance.pause).not.toHaveBeenCalled();

      // First click
      fireEvent.click(buttonW);
      expect(audioInstance.currentTime).toBe(0);
      expect(audioInstance.play).toHaveBeenCalledTimes(1);
      expect(audioInstance.pause).not.toHaveBeenCalled();

      // Second click
      fireEvent.click(buttonW);
      expect(audioInstance.currentTime).toBe(0);
      expect(audioInstance.play).toHaveBeenCalledTimes(2);
      expect(audioInstance.pause).not.toHaveBeenCalled();

      // Third click after 800ms
      audioInstance.currentTime = 500;
      fireEvent.click(buttonW);
      expect(audioInstance.currentTime).toBe(0);
      expect(audioInstance.play).toHaveBeenCalledTimes(3);
      expect(audioInstance.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(950); // total 950ms
      expect(audioInstance.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100); // total 950ms
      expect(audioInstance.pause).toHaveBeenCalledTimes(1);
    });
  });
});
