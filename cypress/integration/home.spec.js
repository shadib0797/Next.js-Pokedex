describe('Pokedex App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    context('Window', () => {
        it('displays correct title', () => {
          cy.title().should('include', 'PokeDex')
        })
      })

    context("Initial Load", ()=>{
        it('should displays main logo', () => {
            cy.get('.logo').should('exist')
        })
    
        it('should display search bar component', () => {
            cy.get('.container-search-bar')
            .within(()=>{
                cy.get('.search-icon').should('exist')
                cy.get('input[type="text"]').should("exist")
            })
            .should('exist')
        })
    
        it('displays twenty five items by default', () => {
            cy.get('.container-cards .card').should('have.length', 25)
        })
    
        it('should load more items on scroll', () => {
            cy.scrollTo("bottom")
            cy.get('.container-cards .card').should('have.length.greaterThan', 25)
        })
    })

    context('displays search functionality correctly', () => {
        beforeEach(()=>{
            cy.get('input[type="text"]')
            .type("ch")
            .should('have.value', "ch")
            .closest('ul li').should('have.length.at.most', 15)
        })

        it("should display altleast some cards", ()=>{
            cy.get('.container-cards .card').should('have.length.at.most', 25)
        })

        it("displays correct result on click on the suggestion", ()=>{
            cy.get("ul li")
            .first()
            .click()
            .get('input[type="text"]')
            .should("have.value", "charmander")

            cy.get('.container-cards .card')
            .within(()=>{
                cy.contains("charmander")
            })
            .should("have.length", 1)
        })

        it("persists the data onto local storage", ()=>{
            cy.get("ul li")
            .first()
            .click()
            .should(()=>{
                expect(localStorage.getItem("searchData")).to.not.be.null
            })
        })
    })
})