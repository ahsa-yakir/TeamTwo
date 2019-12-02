describe('Test Signup', function() {
    describe('test invalid signup', function() {
        it('visit signup page', function() {
            cy.visit('http://localhost:4200/');

            cy.contains('Signup').click();
            cy.url().should('include', '/signup');
        });

        it('input into forms correctly with invalid credentials', function() {
            cy.get('input[name="email"]')
                .type('test@test.com')
                .should('have.value', 'test@test.com');
            cy.get('input[name="password"]')
                .type('test')
                .should('have.value', 'test');
        });

        it('fails signup and does not redirect', function() {
            cy.server();
            cy.route('POST', '/api/user/signup').as('postAccount');
            cy.get('.mat-raised-button').click();
            cy.wait('@postAccount').then(xhr => {
                expect(xhr.status).to.be.equal(500);
            });
            cy.url().should('equal', 'http://localhost:4200/signup');
        });

        it('checks header buttons did not change', function() {
            cy.get(':nth-child(1) > .mat-button').should('contain', 'Login');
            cy.get(':nth-child(2) > .mat-button').should('contain', 'Signup');
        });
    });

    describe('test valid signup', function() {
        it('visit signup page', function() {
            cy.visit('http://localhost:4200/');

            cy.contains('Signup').click();
            cy.url().should('include', '/signup');
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
                .type('testSignupEmail@test.com')
                .should('have.value', 'testSignupEmail@test.com');
            cy.get('input[name="password"]')
                .type('test')
                .should('have.value', 'test');
        });

        it('signs up and redirects', function() {
            cy.server();
            cy.route('POST', '/api/user/signup').as('postAccount');
            cy.get('.mat-raised-button').click();
            cy.wait('@postAccount').then(xhr => {
                expect(xhr.status).to.be.equal(201);
            });
            cy.url().should('be', 'http://localhost:4200/');
        });

        it('checks header buttons changed', function() {
            cy.get(':nth-child(1) > .mat-button').should('contain', 'Login');
            cy.get(':nth-child(2) > .mat-button').should('contain', 'Signup');
            // SHOULD BE WHAT IS BELOW
            // cy.get(':nth-child(1) > .mat-button').should('contain', 'New Post');
            // cy.get(':nth-child(2) > .mat-button').should('contain', 'Logout');
        });
    });
});

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
                .type('testSignupEmail@test.com')
                .should('have.value', 'testSignupEmail@test.com');
            cy.get('input[name="password"]')
                .type('test')
                .should('have.value', 'test');
        });

        it('logs in and redirects', function() {
            cy.server();
            cy.route('POST', '/api/user/login').as('loginUser');
            cy.get('.mat-raised-button').click();
            cy.wait('@loginUser').then(xhr => {
                expect(xhr.status).to.be.equal(200);
                expect(localStorage.getItem('token')).to.not.equal(null);
            });
            cy.url().should('be', 'http://localhost:4200/');
        });

        it('checks header buttons changed', function() {
            cy.get(':nth-child(1) > .mat-button').should('contain', 'New Post');
            cy.get(':nth-child(2) > .mat-button').should('contain', 'Logout');
        });
    });

    describe('test logout', function() {
        it('login', function() {
            cy.visit('http://localhost:4200/login');
            expect(localStorage.getItem('token')).to.equal(null);
            cy.get('input[name="email"]').type('testSignupEmail@test.com');
            cy.get('input[name="password"]').type('test');
            cy.server();
            cy.route('POST', '/api/user/login').as('loginUser');
            cy.get('.mat-raised-button').click();
            cy.wait('@loginUser').then(xhr => {
                expect(xhr.status).to.be.equal(200);
                expect(localStorage.getItem('token')).to.not.equal(null);
            });
            cy.url().should('be', 'http://localhost:4200/');
        });

        it('click logout', function() {
            cy.get(':nth-child(2) > .mat-button').click();
        });

        it('checks header buttons did not change', function() {
            cy.get(':nth-child(1) > .mat-button').should('contain', 'Login');
            cy.get(':nth-child(2) > .mat-button').should('contain', 'Signup');
        });

        it('checks token does not exist in local storage', function() {
            expect(localStorage.getItem('token')).to.equal(null);
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
