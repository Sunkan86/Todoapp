describe("Smoke", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("appen laddar och root-renderar", () => {
    cy.get("#root")
      .should("exist")
      .and($el => {
        expect($el.text().trim().length).to.be.greaterThan(0);
      });
  });

  it("kalendern i tomt läge visar inga todos", () => {
    cy.get('[data-testid^="calendar-day-"]')
      .should("have.length.greaterThan", 0)
      .each($day => {
        cy.wrap($day).find('[data-testid="todo-item"]').should("not.exist");
      });
  });

  it("UI är redo: input och knapp finns och går att använda", () => {
    cy.get('[data-testid="new-todo-input"]')
      .should("be.visible")
      .and("be.enabled");
    cy.get('[data-testid="add-todo-button"]')
      .should("be.visible")
      .and("not.be.disabled");
  });
});
