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
});
