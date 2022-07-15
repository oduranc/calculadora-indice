describe('Admin goes to Admins List', () => {
  it('watch the admins list', () => {
    cy.visit('http://localhost:3000/')

    cy.get("#userId")
    .type("1000044")
    .should("have.value", "1000044")

    cy.get("#password")
      .type("password")
      .should("have.value", "password")

    cy.contains("Iniciar Sesión").click()

    cy.contains("Administradores").click()

    cy.url().should("include", "/admin/admins")
    cy.get("table")

    cy.contains("Añadir")
    cy.contains("Admin")
    cy.screenshot()
  })
})