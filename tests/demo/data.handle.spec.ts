import { test, expect } from "@playwright/test";
import constants from "../../data/constants.json";
import TestData from "../../data/test-data";

test("Should load home page with correct title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle("CURA Healthcare Service");

  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("should handle constant json data", async ({ page }) => {
  console.log(`>> Constant data: ${JSON.stringify(constants.STATUSCODES)}`);
});

const makeApptTestData = TestData.makeAppointmentTestData();

//Access test data
for (const appData of makeApptTestData) {
  console.log(`>> Test data: ${JSON.stringify(appData)}`);
  test(
    `${appData.testId}: Work with different objects`,
    {
      annotation: { type: "Story", description: "JIRA-1234 test" },
      tag: "@smoke",
    },
    async ({ page }, testInfo) => {
      // Login
      // get url from config file
      const envConfig = testInfo.project.use as any;

      // await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await page.goto(envConfig.appURL);

      await page.getByRole("link", { name: "Make Appointment" }).click();
      await page.getByLabel("Username").clear();

      // await page.locator("#txt-username").pressSequentially("John Doe", { delay: 0.5_000 });
      await page.locator("#txt-username").fill(process.env.TEST_USER_NAME);
      // await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
      await page.getByRole("button", { name: "Login" }).press("Enter");

      // Set dynamic value: coockies in global variable
      const loginCookies = await page.context().cookies();
      process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

      console.log(`Login cookies: ${process.env.LOGIN_COOKIES}`);

      await expect(page.locator("h2")).toContainText("Make Appointment");

      // objects

      await page.getByLabel("Facility").selectOption(appData.facility);

      // Assert dropdown count
      let drpdwnOptionsEle = page.getByLabel("Facility").locator("Option");
      await expect(drpdwnOptionsEle).toHaveCount(3);

      //checkbox
      await page
        .getByRole("checkbox", { name: "Apply for hospital readmission" })
        .check();
      await page
        .getByRole("checkbox", { name: "Apply for hospital readmission" })
        .uncheck();
      //Radio button
      //Assert default select option

      // await page.getByRole("radio", { name: "Medicaid" }).click();
      await page.getByRole("radio", { name: appData.hcp }).check();

      //Date input
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .fill(appData.visitDt);
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .press("Enter");

      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("Multiline comments..\ntest123");

      await page.getByRole("button", { name: "Book Appointment" }).click();
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation"
      );

      // await page.getByRole("contentinfo").click({ button: "right" });
    }
  );
}

// test("Should be able to access LoginCoockies", async ({ page }) => {
//   console.log(`Login cookies: ${process.env.LOGIN_COOKIES}`)

// });
