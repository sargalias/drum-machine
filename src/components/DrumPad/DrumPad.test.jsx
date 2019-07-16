import React from 'react';
import { render } from 'testUtils';
import DrumPad from './DrumPad';

describe('DrumPad', () => {
  test('should display correct letter', () => {
    const letter = 'W';

    const { getByText } = render(<DrumPad letter={letter} />);
    const btn = getByText(letter);

    expect(btn.textContent).toBe(letter);
  });
});
