/// <reference types="cypress" />


context('dialogService.showConfirmDialog()', () => {

  beforeEach(() => {
    cy.viewport(1920, 768);
    cy.visit('/dialogs');
  });

  it('Open Danger dialog with confirm text', () => {
    cy.findByRole('button', { name: 'Open Danger dialog with confirm text'}).should('exist').click().then(t => {
      cy.findByRole('button', {name: 'ConfirmButton'}).should('be.disabled');
      cy.get('[data-cy=confirmButtonCheck]').type('textToConfirm');
      cy.findByRole('button', {name: 'ConfirmButton'}).should('be.enabled');
    });
  });

  it('Open Danger dialog without confirm text', () => {
    cy.findByRole('button', { name: 'Open Danger dialog without confirm text'}).should('exist').click().then(t => {
      cy.get('.modal-header').should('have.class', 'bg-danger');
      cy.findByRole('button', {name: 'ConfirmButton'}).should('be.enabled').should('have.class', 'btn-danger').click();
    });
  });

  it('Open Success dialog', () => {
    cy.findByRole('button', { name: 'Open Success dialog'}).should('exist').click().then(t => {
      cy.get('.modal-header').should('have.class', 'bg-success');
      cy.findByRole('button', {name: 'Got it'}).should('be.enabled').should('have.class', 'btn-success').click();
    });
  });

  it('Open Danger dialog', () => {
    cy.findByRole('button', { name: 'Open Danger dialog'}).should('exist').click().then(t => {
      cy.get('.modal-header').should('have.class', 'bg-danger');
      cy.findByRole('button', {name: 'Got it'}).should('be.enabled').should('have.class', 'btn-danger').click();
    });
  });



});
