/* eslint-disable */

// WIP
it.skip('drumPad should play audio file', () => {
  cy.visit('/');
  cy.spy(window.Audio.prototype, 'play');

  cy.getByTestId('drumPad_button_Q')
    .click()
    .then(() => {
      expect(window.Audio.prototype.play).called;
    });
});
