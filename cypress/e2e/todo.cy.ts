describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow a user to add a new todo", () => {
    const text = "Buy milk";

    cy.get('[data-testid="new-todo-input"]').should("be.visible");
    cy.get('[data-testid="new-todo-input"]').clear();
    cy.get('[data-testid="new-todo-input"]').type(text);

    cy.get('[data-testid="add-todo-button"]').should("be.visible");
    cy.get('[data-testid="add-todo-button"]').click();

    cy.contains('[data-testid="todo-list"]', text).should("exist");
  });
});
