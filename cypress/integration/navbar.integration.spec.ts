/// <reference types="cypress" />


context('gll-navbar', () => {

  beforeEach(() => {
    cy.viewport(1920, 768);
  });

  // todo try to solve have.css match
  it('If sidenav is opened a group menu section should exist', () => {
    cy.visit('/tables');
    cy.get('[data-cy=user-menu]').click();
    cy.findByText('Marco Rossi').should('exist');
  });



});
