describe('Admin goes to Students List', () => {
  it('watch the students list', () => {
    cy.visit('http://localhost:3000/')

    cy.get("#userId")
    .type("1000044")
    .should("have.value", "1000044")

    cy.get("#password")
      .type("password")
      .should("have.value", "password")

    cy.contains("Iniciar Sesión").click()

    cy.contains("Estudiantes").click()

    cy.url().should("include", "/admin/students")
    cy.get("table")

    cy.contains("Añadir")
    cy.contains("Student")
    cy.screenshot()
  })
})