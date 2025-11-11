//Using the sample application,
// 1. Pick up the first product displayed on the page
// 2. Click on "Add to Cart"
// 3. Proceed until checkout
// 4. Assert the confirmation message

import { test, expect } from "@playwright/test";

test("Add to a cart", async ({ page }) => {
  //login
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  
  await expect(page.locator('[data-test="title"]')).toContainText("Products");

  // 1. Pick up the first product displayed on the page
  let productElms = page.locator(".inventory_item");
  let firstProductEle = productElms.nth(0);
  let firstProductName = await firstProductEle.locator(".inventory_item_name ").innerText();
  console.log(`1st product name: ${firstProductName}`);

  // 2. Click on "Add to Cart"
  // await page.locator('[data-test="item-4-title-link"]').click();
  // await page.locator('[data-test="add-to-cart"]').click();
  await firstProductEle.locator("//button[text()='Add to cart']").click();

  // 3. Proceed until checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(
    firstProductName
  );
  await page.getByRole("button",{name: "Checkout"}).click();

  await page.locator('[data-test="firstName"]').fill("test");
  await page.locator('[data-test="lastName"]').fill("b");
  await page.locator('[data-test="postalCode"]').fill("9999999");
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(
    firstProductName
  );
  await page.locator('[data-test="finish"]').click();

  // 4. Assert the confirmation message
  await expect(page.locator('[data-test="complete-header"]')).toContainText(
    "Thank you for your order!"
  );
  await expect(page.locator('[data-test="complete-text"]')).toContainText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  );
  await expect(page.locator('[data-test="title"]')).toContainText(
    "Checkout: Complete!"
  );
  await page.locator('[data-test="back-to-products"]').click();
});
