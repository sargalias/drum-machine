import React from 'react';
import { render, fireEvent, cleanup, act } from 'testUtils';
import DrumMachineInteractiveArea from './DrumMachineInteractiveArea';
import { drumPadsSingle, drumPadsNormal } from './drumPadsHelper';

const soundDuration = 500;

describe('DrumMachineInteractiveArea', () => {
  let AudioMock;

  beforeEach(() => {
    cleanup();
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
    test('should play audio on drumPad click', () => {
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsSingle} />,
      );
      const button = getByTestId('drumPad_button_W');

      fireEvent.click(button);

      expect(AudioMock.mock.instances[0].play).toHaveBeenCalledTimes(1);
    });

    test('should play corresponding audio on keyDown', () => {
      render(<DrumMachineInteractiveArea drumPads={drumPadsNormal} />);

      act(() => {
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'W' }));
      });
      expect(AudioMock.mock.instances[0].play).toHaveBeenCalledTimes(1);

      act(() => {
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
      });
      expect(AudioMock.mock.instances[0].play).toHaveBeenCalledTimes(2);
      expect(AudioMock.mock.instances[1].play).not.toHaveBeenCalled();
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
      jest.advanceTimersByTime(soundDuration * 0.1); // before pause

      // Click on E
      fireEvent.click(buttonE);

      // Play should have been called for both, pause should not have been called
      expect(audioInstanceW.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceW.pause).not.toHaveBeenCalled();
      expect(audioInstanceE.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(soundDuration * 0.85); // before pause
      expect(audioInstanceW.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.play).toHaveBeenCalledTimes(1);
      expect(audioInstanceW.pause).not.toHaveBeenCalled();
      expect(audioInstanceE.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(soundDuration * 0.1); // W has paused, E has not
      expect(audioInstanceW.pause).toHaveBeenCalledTimes(1);
      expect(audioInstanceE.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(soundDuration * 0.1); // Both have paused
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
      audioInstance.currentTime = soundDuration * 0.5;
      fireEvent.click(buttonW);
      expect(audioInstance.currentTime).toBe(0);
      expect(audioInstance.play).toHaveBeenCalledTimes(3);
      expect(audioInstance.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(soundDuration * 0.95); // Before pause
      expect(audioInstance.pause).not.toHaveBeenCalled();

      jest.advanceTimersByTime(soundDuration * 0.1); // After pause
      expect(audioInstance.pause).toHaveBeenCalledTimes(1);
    });
  });

  describe('soundDisplay', () => {
    test('should display correct default value', () => {
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );
      const soundDisplay = getByTestId('soundNameOutput');

      expect(soundDisplay.textContent).toBe('-----------');
    });

    test('should display correct soundName after clicking a drumPad', () => {
      jest.useFakeTimers();
      const { getByTestId } = render(
        <DrumMachineInteractiveArea drumPads={drumPadsNormal} />,
      );
      const buttonW = getByTestId('drumPad_button_W');
      const buttonE = getByTestId('drumPad_button_E');
      const soundDisplay = getByTestId('soundNameOutput');

      fireEvent.click(buttonW);
      expect(soundDisplay.textContent).toBe(drumPadsNormal[0].soundName);

      fireEvent.click(buttonE);
      expect(soundDisplay.textContent).toBe(drumPadsNormal[1].soundName);

      jest.advanceTimersByTime(5000);
      expect(soundDisplay.textContent).toBe(drumPadsNormal[1].soundName);
    });
  });
});
