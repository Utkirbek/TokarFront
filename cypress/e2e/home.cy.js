/// <reference types="cypress" />

describe("Home", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://toker-uz.vercel.app/api/admin/login").as(
      "login"
    );
    cy.visit("http://localhost:3000/");
    cy.get("#email").type("dev@tokar.uz");
    cy.get("#password").type("testtest");
    cy.get('button[type="submit"]').click();
    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("home page da url / bolishi kerak", () => {
    cy.get('a[href="/"]').should("contain", "Tokar");
  });
});
