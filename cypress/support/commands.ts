// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// eslint-disable-next-line @typescript-eslint/no-namespace

declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): void;

    restoreAfterOwnerUserLogin(): void;

    clearAllLocalStorage(): void;

    writeToFilterInput(fieldName: string, stringToWrite: string): void;

    findByTooltip(tooltipString: string): Chainable<any>;

  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});

Cypress.Commands.add('writeToFilterInput', (fieldName, stringToWrite) => {
  cy.get('[data-cy=' + fieldName + '-filter-input]').type(stringToWrite);
});

Cypress.Commands.add('findByTooltip', (tooltipString) => {
  return cy.get('[ng-reflect-ngb-tooltip="' + tooltipString + '"]');
});


Cypress.Commands.add('clearAllLocalStorage', (key, value) => {
  cy.window().then((window) => {
    window.localStorage.clear();
  });
});


Cypress.on('window:before:load', win => {
  delete win.fetch;
});
