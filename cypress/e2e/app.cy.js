describe('App', () => {
    it('should display the home page', () => {
        cy.visit('/')
        cy.contains('Dog Adoption', { timeout: 10000 }).should('be.visible');
    });
});
