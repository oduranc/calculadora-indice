describe('Login and Logout', () => {
  it('Login and Logout as Admin User', () => {
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

    cy.contains("Admin")
    cy.contains("Perfil")
    cy.screenshot()

    cy.get(".rounded-full").first().click()

    cy.contains("Cerrar Sesión").click()
    cy.contains("Login")
    cy.screenshot()
  })
})