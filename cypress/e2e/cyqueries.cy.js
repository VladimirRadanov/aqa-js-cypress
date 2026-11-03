const baseUrl = 'https://qauto.forstudy.space/';
const login = 'guest';
const password = 'welcome2qauto';

describe('Cypress Queries', () => {
    beforeEach(() => {
        cy.visit(baseUrl, {
    auth: {
        username: login,
        password: password
      }
    });
});

    context('Header elements', () => {
        it('Home button exists', () => {
            cy.get('a.btn.header-link.-active').should('exist');
        });
        it('About and Contact buttons exist', () => {
            cy.get('button.btn.header-link').should('have.length', 2);
        });
        it('Guest login button exists', () => {
            cy.get('button.header-link.-guest').should('exist');
        });
        it('Sign in button exists', () => {
            cy.get('button.btn.btn-outline-white.header_signin').should('exist');
        });
    });

    context('Footer elements', () => {
        it('Facebook icon exists', () => {
            cy.get('.icon-facebook').should('exist');
        });
        it('Telegram icon exists', () => {
            cy.get('.icon-telegram').should('exist');
        });
        it('Youtube icon exists', () => {
            cy.get('.icon-youtube').should('exist');
        });
        it('Instagram icon exists', () => {
            cy.get('.icon-instagram').should('exist');
        });
        it('LinkedIn icon exists', () => {
            cy.get('.icon-linkedin').should('exist');
        });
        it('Hillel URL exists', () => {
            cy.get('a.contacts_link.display-4').should('exist');
        });
        it('Hillel e-mail exists', () => {
            cy.get('a.contacts_link.display-4').should('exist');
        });
    });


});