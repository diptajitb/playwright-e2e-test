import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle("CURA Healthcare Service");

  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  
});

test("should demo Debug config", async ({ page }, testInfo) => {
  
  console.log(`Config at run-time: ${JSON.stringify(testInfo.config)}`);
});

test.only("should demo fixtures", async ({ page,browserName }, testInfo) => {
  
  console.log(`Browser name: ${browserName}`);
});