describe('Student goes to Ranking', () => {
  it('watch the top 10 students with higher GPA', () => {
    cy.visit('http://localhost:3000/')

    cy.get("#userId")
    .type("1000004")
    .should("have.value", "1000004")

    cy.get("#password")
      .type("852951TineoC")
      .should("have.value", "852951TineoC")

    cy.contains("Iniciar Sesión").click()

    cy.contains("Ranking").click()

    cy.url().should("include", "/student/ranking")
    cy.get("table")

    cy.contains("Top 10 Índices de la Aplicación")
    cy.screenshot()
  })
})