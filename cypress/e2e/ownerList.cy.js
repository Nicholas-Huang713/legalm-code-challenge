describe('OwnerList', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('add new owner', () => {
        cy.get('button').contains('Adopt').click();
        cy.contains('Adopt a Dog').should('be.visible');
        cy.get('form').within(() => {
            cy.get('#name').clear().type('Nick');
            cy.get('#exp').clear().type(5);
            cy.get('button').contains('Submit').click();
        });
        cy.contains('Adopt a Dog').should('be.visible');
        cy.get('button').filter(':contains("Edit")')
            .should('have.length', 4);
    });

    it('delete owner', () => {
        cy.get('button').contains('X').click();
        cy.get('button').filter(':contains("Edit")')
            .should('have.length', 2);
        cy.get('button').contains('X').click();
        cy.get('button').filter(':contains("Edit")')
            .should('have.length', 1);

    });

    it('edit owner', () => {
        cy.contains('Alice').should('be.visible');
        cy.get('button').contains('Edit').click();
        cy.contains('Edit Profile').should('be.visible');
        cy.get('form').within(() => {
            cy.get('#name').clear().type('Nick');
            cy.get('button').contains('Submit').click();
        });
        cy.contains('Alice').should('not.exist');
        cy.contains('Nick').should('be.visible');

    });

    it('view owner details', () => {
        cy.get('button').contains('Details').click();
        cy.contains('Alice').should('be.visible');
        cy.contains('Marshmallow').should('be.visible');
        cy.contains('Favorite Food').should('be.visible');
    });

    it('filter owner list', () => {
        cy.contains('Alice').should('be.visible');
        cy.get('select').select('10');
        cy.get('button').filter(':contains("Edit")')
            .should('have.length', 1);
        cy.get('select').select('1').should('have.value', '1');
        cy.contains('No Owners To Display').should('be.visible');
        cy.get('select').select('none').should('have.value', 'none');
        cy.get('button').filter(':contains("Edit")')
            .should('have.length', 3);
    });
});
