describe('Student Profile', () => {
  it('As a student, see its profile', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Login')
    cy.contains('GPA Calculator')

    cy.get("#userId")
      .type("1000004")
      .should("have.value", "1000004")

    cy.get("#password")
      .type("852951TineoC")
      .should("have.value", "852951TineoC")

    cy.screenshot()

    cy.contains("Iniciar Sesión").click()

    cy.url().should("include", "/profile")

    cy.contains("Student")
    cy.contains("GPA")
    cy.contains("Honor")
    cy.contains("Perfil")
    cy.screenshot()
  })
})