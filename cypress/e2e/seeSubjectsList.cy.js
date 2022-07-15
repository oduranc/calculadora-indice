describe('Admin goes to Subjects List', () => {
  it('watch the subjects list', () => {
    cy.visit('http://localhost:3000/')

    cy.get("#userId")
    .type("1000044")
    .should("have.value", "1000044")

    cy.get("#password")
      .type("password")
      .should("have.value", "password")

    cy.contains("Iniciar Sesión").click()

    cy.contains("Asignaturas").click()

    cy.url().should("include", "/admin/subjects")
    cy.get("table")

    cy.contains("Añadir")
    cy.contains("Asignaturas")
    cy.screenshot()
  })
})