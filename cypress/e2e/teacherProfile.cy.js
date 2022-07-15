describe('Teacher Profile', () => {
  it('As a teacher, see its profile', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Login')
    cy.contains('GPA Calculator')

    cy.get("#userId")
      .type("1000044")
      .should("have.value", "1000044")

    cy.get("#password")
      .type("password")
      .should("have.value", "password")

    cy.screenshot()

    cy.contains("Iniciar Sesión").click()

    cy.url().should("include", "/profile")

    cy.contains("Perfil")
    cy.screenshot()
  })
})