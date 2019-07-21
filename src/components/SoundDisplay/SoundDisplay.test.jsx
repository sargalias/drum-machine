import React from 'react';
import { render, cleanup } from 'testUtils';
import SoundDisplay from './SoundDisplay';

describe('SoundDisplay', () => {
  beforeEach(cleanup);

  test('should display correct default value', () => {
    const defaultSoundname = '-----------';
    const { getByText } = render(<SoundDisplay />);

    expect(() => getByText(defaultSoundname)).not.toThrow();
  });

  test('should display value of soundName prop', () => {
    const soundName = 'foo';
    const { getByText } = render(<SoundDisplay soundName={soundName} />);

    expect(() => getByText(soundName)).not.toThrow();
  });
});
