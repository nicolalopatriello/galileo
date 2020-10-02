/// <reference types="cypress" />


context('gll-sidenav', () => {

  beforeEach(() => {
    cy.viewport(1920, 768);
  });

  // todo try to solve have.css match
  it('If sidenav is opened a group menu section should exist', () => {
    cy.visit('/tables');
    cy.findByText('Tools').should('have.css', 'background', 'rgb(0, 0, 255) none repeat scroll 0% 0% / auto padding-box border-box');
  });



});
