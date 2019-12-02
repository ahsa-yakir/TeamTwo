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
