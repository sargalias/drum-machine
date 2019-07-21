/* eslint-disable */

// WIP
it.skip('drumPad should play audio file', () => {
  let audioElement;

  cy.visit('/');

  cy.getByTestId('drumPad_audio_Q').then($el => {
    audioElement = $el[0];
    cy.spy(audioElement, 'play');
  });

  cy.getByTestId('drumPad_button_Q')
    .click()
    .then(() => {
      expect(audioElement.play).called;
    });
});
