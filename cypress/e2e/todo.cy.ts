describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should allow a user to add a new todo", () => {
    const todoText = "Learn Cypress";

    cy.getByTestId("new-todo-input").type(todoText);
    cy.getByTestId("add-todo-button").click();

    cy.getByTestId("todo-list")
      .should("contain.text", todoText)
      .and("be.visible");
  });
});
