describe('Visit the app login page and make sure is contains all the needed components', () => {
    it("Check login page content", ()=> {
        // Go to login Page
        cy.visit("/login")

        // Check it contains username, password, login button and forgot password
        cy.get("[type='text']").should('be.visible')
        cy.get("[type='password']").should('be.visible')
        cy.get("button").contains("LOG IN").should('be.visible')
        cy.contains("Forgot Password?").should('be.visible')

        // Check if url includes login path
        cy.url().should('include', '/login')
    })
})