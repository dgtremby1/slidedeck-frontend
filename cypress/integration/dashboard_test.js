describe('Check dashboard', ()=> {
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
        // Check if logo is in dashboard
        cy.get('img').should('have.attr', 'src').should('include','slidedeck')

        // Check if has all the components
        cy.contains('Home')
        cy.contains('Enter Data')
        cy.contains('Manage Logs')
        cy.contains('Manage Templates')
        cy.contains('Reports')
        cy.contains('Developer Area')

        // Navigate the dashboard
        cy.get('button').contains("Enter Data").click({force: true}).then(()=> {
            cy.url().should('include', '/new')
        })
        cy.get('button').contains("Home").click({force: true}).then(()=> {
            cy.url().should('include', '/home')
        })
        cy.get('button').contains("Manage Logs").click({force: true}).then(()=> {
            cy.url().should('include', '/logs')
            cy.contains('List').click().then(()=> {
                cy.contains('testing testing hello world').should('be.visible')
                cy.contains('lorem ipsum Dolor').should('be.visible')
                cy.contains('Sit amet').should('be.visible')
            })
            cy.contains('Icons').click().then(()=> {
                cy.contains('testing testing hello world').should('be.visible')
                cy.contains('lorem ipsum Dolor').should('be.visible')
                cy.contains('Sit amet').should('be.visible')
            })
        })
        cy.get('button').contains("Manage Templates").click({force: true}).then(()=> {
            cy.url().should('include', '/templates')
        })
        cy.get('button').contains("Reports").click({force: true}).then(()=> {
            cy.url().should('include', '/reports')
        })
        cy.get('button').contains("Developer Area").click({force: true}).then(()=> {
            cy.url().should('include', '/dev')
            cy.contains('Default Dark').click().then(()=> {
                cy.get('body').should('have.css', 'background-color', 'rgb(31, 41, 55)')
            })
            cy.contains('Default Light').click().then(()=> {
                cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)')
            })
        })
    })
})