import { test, expect } from "@playwright/test";
import constants from "../../data/constants.json";

// test("Should load home page with correct title", async ({ page }) => {
//   await page.goto("https://katalon-demo-cura.herokuapp.com/");

//   await expect(page).toHaveTitle("CURA Healthcare Service");

//   await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

// });

test("should handle constant json data", async ({ page }) => {
  console.log(`>> Constant data: ${constants.STATUSCODES}`);
});
