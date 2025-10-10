escribe("App smoke test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the app and can add a todo", () => {
    const text = "Write tests";

    cy.get("[data-cy=app-root]").should("be.visible");
    cy.get("[data-cy=todo-input]").should("be.visible");
    cy.get("[data-cy=todo-input]").clear();
    cy.get("[data-cy=todo-input]").type(`${text}{enter}`);

    cy.contains("[data-cy=todo-item]", text).should("exist");
  });
});
