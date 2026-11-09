// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add("login", () => {
  cy.get("body").then(($body) => {
    if ($body.find("#signupName").length) {
      cy.get(".modal button.close").click();
    }
  });

  cy.get("button.header_signin").click();
  cy.get("#signinEmail").type("user1794258071673@example.com");
  cy.get("#signinPassword").type("Password1", { sensitive: true });
  cy.contains("button", "Login").click();
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.overwrite("type", (originalFn, element, text, options = {}) => {
  if (options && options.sensitive) {
    options = { ...options, log: false };

    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});