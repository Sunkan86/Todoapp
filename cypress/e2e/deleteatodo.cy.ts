describe("Delete a todo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds and deletes a todo", () => {
    const text = "Köp mjölk";

    cy.get('[data-testid="new-todo-input"]').should("be.visible");
    cy.get('[data-testid="new-todo-input"]').clear();
    cy.get('[data-testid="new-todo-input"]').type(text);

    cy.get('[data-testid="add-todo-button"]').should("be.visible");
    cy.get('[data-testid="add-todo-button"]').click();

    cy.contains('[data-testid="todo-list"]', text).as("row");
    cy.get("@row").should("exist");

    cy.get("@row").find('[aria-label="Delete todo"]').as("deleteBtn");
    cy.get("@deleteBtn").should("be.visible");
    cy.get("@deleteBtn").click();

    cy.contains('[data-testid="todo-list"]', text).should("not.exist");
  });
});
