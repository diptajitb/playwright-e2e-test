import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("GO to login page", async ({ page }) => {
    //1. open url and verify header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
  });

  test("Should login successfully", async ({ page }) => {
    //Successful Login
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should prevent login with invalid creds", async ({ page }) => {
    //Invalid Login
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword123");
    await page.getByRole("button", { name: "Login" }).click();

    //4. Assert an error message
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
