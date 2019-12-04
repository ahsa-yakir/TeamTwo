describe('Test Login', function() {
    describe('test valid login', function() {
        it('visit login page', function() {
            cy.visit('http://localhost:4200/');

            cy.contains('Login').click();
            cy.url().should('include', '/login');
        });

        it('test email validation', function() {
            cy.get('input[name="email"]')
                .type('invalidEmail')
                .clear();
            cy.get('input[name="password"]')
                .type('awdawdawd')
                .clear();
            cy.get('#mat-error-0').should('exist');
        });

        it('input into forms correctly', function() {
            cy.get('input[name="email"]')
                .type('test@test.com')
                .should('have.value', 'test@test.com');
            cy.get('input[name="password"]')
                .type('test')
                .should('have.value', 'test');
        });

        it('logs in and redirects', function() {
            cy.get('.mat-raised-button').click();
            cy.url().should('be', 'http://localhost:4200/');
        });

        it('checks header buttons changed', function() {
            cy.get(':nth-child(1) > .mat-button').should('contain', 'New Post');
            cy.get(':nth-child(2) > .mat-button').should('contain', 'Logout');
        });
    });

    describe('test invalid login', function() {
        it('visit login page', function() {
            cy.visit('http://localhost:4200/');

            cy.contains('Login').click();
            cy.url().should('include', '/login');
        });

        it('input into forms correctly with invalid credentials', function() {
            cy.get('input[name="email"]')
                .type('invalidtest@test.com')
                .should('have.value', 'invalidtest@test.com');
            cy.get('input[name="password"]')
                .type('test')
                .should('have.value', 'test');
        });

        it('fails log-in and does not redirect', function() {
            cy.get('.mat-raised-button').click();
            cy.url().should('equal', 'http://localhost:4200/login');
        });

        it('checks header buttons did not change', function() {
            cy.get(':nth-child(1) > .mat-button').should('contain', 'Login');
            cy.get(':nth-child(2) > .mat-button').should('contain', 'Signup');
        });
    });
});

describe('Test Homepage', function() {
    it('checks header buttons are correct', function() {
        cy.visit('http://localhost:4200/');
        cy.get(':nth-child(1) > .mat-button').should('contain', 'Login');
        cy.get(':nth-child(2) > .mat-button').should('contain', 'Signup');
    });

    it('check posts load', function() {
        cy.get('.mat-accordion[class="mat-accordion ng-star-inserted"]').should(
            'exist'
        );
    });
});
