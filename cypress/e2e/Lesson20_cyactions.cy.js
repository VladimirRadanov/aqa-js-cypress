const baseUrl = "https://qauto.forstudy.space/";
const login = "guest";
const password = "welcome2qauto";

function openRegistrationForm() {
  cy.visit(baseUrl, {
    auth: {
      username: login,
      password: password,
    },
  });

  cy.contains("button", "Sign up").click();
  cy.get("#signupName").should("be.visible");
}

function randomizeEmail() {
  return `user${Date.now() + Math.floor(Math.random() * 1000)}@example.com`;
}

function enterField(selector, value) {
  const trimmedValue = value.trim();

  cy.get(selector).clear();
  if (trimmedValue) {
    cy.get(selector).type(trimmedValue);
  }
  cy.get(selector).blur();
}

describe("Cypress Actions", () => {
  beforeEach(() => {
    openRegistrationForm();
  });

  context("Registration name validation", () => {
    it("shows a required error for an empty name", () => {
      cy.get("#signupName").focus().blur();
      cy.get("div.invalid-feedback p").should("contain.text", "Name required");
    });

    it("shows an invalid error when the name contains non-English letters", () => {
      enterField("#signupName", "John1");
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Name is invalid",
      );
    });

    it("shows a length error when the trimmed name is shorter than 2 characters or larger 20 characters", () => {
      enterField("#signupName", "   A   ");
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Name has to be from 2 to 20 characters long",
      );

      enterField("#signupName", "A".repeat(21));
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("shows a red border when the name is invalid", () => {
      enterField("#signupName", "John1");

      cy.get("#signupName").should(
        "have.css",
        "border-bottom-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  context("Registration last name validation", () => {
    it("shows a required error for an empty last name", () => {
      cy.get("#signupLastName").focus().blur();
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Last name required",
      );
    });

    it("shows an invalid error when the last name contains non-English letters", () => {
      enterField("#signupLastName", "Doe1");
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Last name is invalid",
      );
    });

    it("shows a length error when the trimmed last name is shorter than 2 characters or longer than 20 characters", () => {
      enterField("#signupLastName", "   D   ");
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Last name has to be from 2 to 20 characters long",
      );

      enterField("#signupLastName", "D".repeat(21));
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Last name has to be from 2 to 20 characters long",
      );
    });

    it("shows a red border when the last name is invalid", () => {
      enterField("#signupLastName", "Doe1");

      cy.get("#signupLastName").should(
        "have.css",
        "border-bottom-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  context("Registration email validation", () => {
    it("shows an incorrect error for an invalid email", () => {
      enterField("#signupEmail", "invalid-email");
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Email is incorrect",
      );
    });

    it("shows a required error for an empty email", () => {
      cy.get("#signupEmail").focus().blur();
      cy.get("div.invalid-feedback p").should("contain.text", "Email required");
    });

    it("shows a red border when the email is invalid", () => {
      enterField("#signupEmail", "invalid-email");

      cy.get("#signupEmail").should(
        "have.css",
        "border-bottom-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  context("Registration password validation", () => {
    it("shows a policy error for a password that does not meet the requirements", () => {
      enterField("#signupPassword", "password");
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });

    it("shows a required error for an empty password", () => {
      cy.get("#signupPassword").focus().blur();
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Password required",
      );
    });

    it("shows a red border when the password is invalid", () => {
      enterField("#signupPassword", "password");

      cy.get("#signupPassword").should(
        "have.css",
        "border-bottom-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  context("Registration re-enter password validation", () => {
    it("shows an error when the passwords do not match", () => {
      enterField("#signupPassword", "Password1");
      enterField("#signupRepeatPassword", "Password2");

      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Passwords do not match",
      );
    });

    it("shows a required error for an empty re-enter password field", () => {
      cy.get("#signupRepeatPassword").focus().blur();
      cy.get("div.invalid-feedback p").should(
        "contain.text",
        "Re-enter password required",
      );
    });

    it("shows a red border when the passwords do not match", () => {
      enterField("#signupPassword", "Password1");
      enterField("#signupRepeatPassword", "Password2");

      cy.get("#signupRepeatPassword").should(
        "have.css",
        "border-bottom-color",
        "rgb(220, 53, 69)",
      );
    });
  });

  context("Registration button", () => {
    it("is disabled when registration data is incorrect", () => {
      cy.contains("button", "Register").should("be.disabled");

      enterField("#signupName", "John");
      enterField("#signupLastName", "Doe");
      enterField("#signupEmail", "invalid-email");
      enterField("#signupPassword", "Password1");
      enterField("#signupRepeatPassword", "Password1");

      cy.contains("button", "Register").should("be.disabled");
    });

    it("creates a new user when valid registration data is submitted", () => {
      enterField("#signupName", "John");
      enterField("#signupLastName", "Doe");
      enterField("#signupEmail", randomizeEmail());
      enterField("#signupPassword", "Password1");
      enterField("#signupRepeatPassword", "Password1");

      cy.contains("button", "Register").should("be.enabled").click();
      cy.location("pathname").should("include", "/panel/garage");
    });
  });
});
