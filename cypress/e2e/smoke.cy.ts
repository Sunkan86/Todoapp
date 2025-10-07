describe("Smoke", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("loads the app and mounts the root", () => {
    cy.get("#root")
      .should("exist")
      .and($el => {
        expect($el.text().trim().length).to.be.greaterThan(0);
      });
  });

  it("shows no todos in the calendar when empty", () => {
    cy.get('[data-testid^="calendar-day-"]')
      .should("have.length.greaterThan", 0)
      .each($day => {
        cy.wrap($day).find('[data-testid="todo-item"]').should("not.exist");
      });
  });

  it("UI is ready: input and button are usable", () => {
    cy.get('[data-testid="new-todo-input"]')
      .should("be.visible")
      .and("be.enabled");
    cy.get('[data-testid="add-todo-button"]')
      .should("be.visible")
      .and("not.be.disabled");
  });
});
