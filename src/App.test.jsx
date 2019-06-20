import React from 'react';
import { render } from 'testUtils';
import App from './App';

test('snapshot', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
