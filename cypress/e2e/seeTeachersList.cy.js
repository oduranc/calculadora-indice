describe('Admin goes to Teachers List', () => {
  it('watch the teachers list', () => {
    cy.visit('http://localhost:3000/')

    cy.get("#userId")
    .type("1000044")
    .should("have.value", "1000044")

    cy.get("#password")
      .type("password")
      .should("have.value", "password")

    cy.contains("Iniciar Sesión").click()

    cy.contains("Profesores").click()

    cy.url().should("include", "/admin/teachers")
    cy.get("table")

    cy.contains("Añadir")
    cy.contains("Teacher")
    cy.screenshot()
  })
})