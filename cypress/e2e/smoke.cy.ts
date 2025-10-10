describe("App smoke test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders and can add a todo", () => {
    const text = "Write tests";

    cy.get('[data-testid="new-todo-input"]').should("be.visible");
    cy.get('[data-testid="new-todo-input"]').clear();
    cy.get('[data-testid="new-todo-input"]').type(text);

    cy.get('[data-testid="add-todo-button"]').should("be.visible");
    cy.get('[data-testid="add-todo-button"]').click();

    cy.contains('[data-testid="todo-list"]', text).should("exist");
  });
});
