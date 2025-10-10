describe("Delete a todo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds and deletes a todo", () => {
    const text = "Köp mjölk";

    cy.get("[data-cy=todo-input]").should("be.visible");
    cy.get("[data-cy=todo-input]").as("input");
    cy.get("@input").clear();
    cy.get("@input").type(`${text}{enter}`);

    cy.contains("[data-cy=todo-item]", text).as("row");
    cy.get("@row").should("exist");

    cy.get("@row").find("[data-cy=delete-todo]").as("deleteBtn");
    cy.get("@deleteBtn").should("be.visible");
    cy.get("@deleteBtn").click();

    cy.contains("[data-cy=todo-item]", text).should("not.exist");
  });
});
