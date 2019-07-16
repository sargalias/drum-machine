import React from 'react';
import { render, cleanup, fireEvent } from 'testUtils';
import DrumPad from './DrumPad';

describe('DrumPad', () => {
  beforeEach(cleanup);

  test('should display correct letter', () => {
    const letter = 'W';

    const { getByText } = render(<DrumPad letter={letter} />);
    const btn = getByText(letter);

    expect(btn.textContent).toBe(letter);
  });

  test('should render audio element with audio src passed as prop', () => {
    const audioSrc = 'https://test.com/';
    const letter = 'W';
    const { getByTestId } = render(
      <DrumPad letter={letter} audioSrc={audioSrc} />,
    );
    const audioElement = getByTestId(`drumPad_audio_${letter}`);

    expect(audioElement.src).toBe(audioSrc);
  });

  test('should call prop function with letter on interaction (click or button press with keyboard)', () => {
    const mockFn = jest.fn();
    const letter = 'W';
    const { getByText } = render(
      <DrumPad letter={letter} onInteraction={mockFn} />,
    );
    const btn = getByText(letter);

    expect(mockFn).not.toHaveBeenCalled();

    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(letter);
  });
});
