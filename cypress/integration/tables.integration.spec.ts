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

  it('Boolean field should have custom icon', () => {
    cy.visit('/tables');
    cy.get(`[ng-reflect-icon="fas,user-shield"]`).should('have.length', 2)
    cy.get(`[ng-reflect-icon="fas,user"]`).should('have.length', 2)
  });

  it('If trueFaIcon or falseFaIcon isn\'t set, table should render true or false', () => {
    cy.visit('/tables');
    cy.get('table').contains('false')
    cy.get('table').contains('true')
  });

  it('If search a member with age = 30, table rows should be 1', () => {
    cy.visit('/tables');
    cy.get('.tableRow').should('have.length', 4);
    cy.writeToFilterInput('age', '30');
    cy.get('.tableRow').should('have.length', 1);
  });

  it('If search a member with age >= 30, table rows should be 2', () => {
    cy.visit('/tables');
    cy.get('.tableRow').should('have.length', 4);
    cy.get('[data-cy=age-filter-options]').click();
    cy.get('[data-cy=age-dropdown-filter]').select('greaterThanOrEqual');
    cy.writeToFilterInput('age', '30');
    cy.get('.tableRow').should('have.length', 2);
  });

  it('If delete action si clicked, dialog should be visible', () => {
    cy.visit('/tables');
    cy.get('[data-cy=delete-action]').first().click();
    cy.get('.modal-header').should('exist');
    cy.findByRole('button', { name: 'Delete'}).should('exist');
    cy.findByRole('button', { name: 'Cancel'}).should('exist');
  });

  it('If Cancel btn is clicked, dialog should be closed', () => {
    cy.visit('/tables');
    cy.get('[data-cy=delete-action]').first().click();
    cy.get('.modal-header').should('exist');
    cy.findByRole('button', { name: 'Cancel'}).click();
    cy.get('.modal-header').should('not.exist');
  });




});
