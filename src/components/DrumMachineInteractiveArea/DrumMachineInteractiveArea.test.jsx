import React from 'react';
import { render, cleanup } from 'testUtils';
import DrumMachineInteractiveArea from './DrumMachineInteractiveArea';

describe('DrumMachineInteractiveArea', () => {
  beforeEach(cleanup);

  test('renders correct drumPads with empty drumPads prop', () => {
    const drumPads = [];

    const { getAllByTestId } = render(
      <DrumMachineInteractiveArea drumPads={drumPads} />,
    );

    expect(() => getAllByTestId(/drumPad_button_*/)).toThrow();
  });
});
