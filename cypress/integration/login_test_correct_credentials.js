describe('Check login with correct username and password', ()=> {
    it("Try login", ()=> {
        cy.visit("/login")
        // Type admin as username
        cy.get("[type='text']").type("admin")
        // Type admin as password
        cy.get("[type='password']").type("admin")
        // Click LOG IN
        cy.contains('LOG IN').click({force: true}).then(()=> {
            // Check if router app redirected to dashboard page
            cy.url().should('include', '/dashboard')
        })
    })
})