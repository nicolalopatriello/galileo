/// <reference types="cypress" />

import './tables.integration.spec';

context('Cypress', () => {

  beforeEach(() => {
    cy.viewport(1920, 768);
  });

  it('Table page should exist', () => {
    cy.visit('/tables');
    cy.url().should('contain', 'tables')
  });


  it('Initially, number of rows should be 3, after filter on ColC rows should be 1', () => {
    cy.visit('/tables');
    cy.get('.tableRow').should('have.length', 4)
    cy.writeToFilterInput('name', 'Nicola');
    cy.get('.tableRow').should('have.length', 1)
  });

});
