describe("Todos — delete flow", () => {
  const add = (t: string) => {
    cy.get('[data-testid="new-todo-input"]').clear().type(t);
    cy.get('[data-testid="add-todo-button"]').click();
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("deletes a todo", () => {
    add("Alpha");
    add("Bravo");

    cy.contains('[data-testid^="todo-text-"]', "Alpha").should("exist");
    cy.contains('[data-testid^="todo-text-"]', "Bravo").should("exist");

    cy.contains('[data-testid^="todo-text-"]', "Alpha")
      .closest('[data-testid^="todo-item-"]')
      .find('[data-testid^="todo-delete-"], [aria-label="Delete todo"]')
      .click();

    cy.contains('[data-testid^="todo-text-"]', "Alpha").should("not.exist");
    cy.contains('[data-testid^="todo-text-"]', "Bravo").should("exist");
  });
});
