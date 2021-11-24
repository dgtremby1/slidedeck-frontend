describe('Check login with incorrect username and password', ()=> {
    it("Try login", ()=> {
        cy.visit("/login")
        // Type admin as username
        cy.get("[type='text']").type("lololol")
        // Type admin as password
        cy.get("[type='password']").type("lololol")
        // Click LOG IN
        cy.contains('LOG IN').click({force: true}).then(()=> {
            // Check if router app redirected to dashboard page
            cy.url().should('include', '/login')
            cy.contains("Invalid username/password. Please try again.").should('be.visible')
        })
    })
})