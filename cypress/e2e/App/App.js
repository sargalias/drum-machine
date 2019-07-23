/* eslint-disable */

it('drumPad should play audio file', () => {
  cy.visit('/', {
    onBeforeLoad: win => {
      cy.spy(win.HTMLMediaElement.prototype, 'play');
    },
  });
  cy.window().then(win => {
    expect(win.HTMLMediaElement.prototype.play).not.called;
  });

  cy.getByTestId('drumPad_button_Q').click();
  cy.window().then(win => {
    expect(win.HTMLMediaElement.prototype.play).called;
  });
});
