import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

test("Work with different objects", async ({ page }) => {
  // Login
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await page.getByLabel("Username").clear();
  // await page.getByLabel("Username").fill("John Doe");
  // await page.getByLabel("Username").pressSequentially("John Doe",{delay:0.5_000});
  // await page.locator("//*[@id='txt-username']").pressSequentially("John Doe",{delay:0.5_000});

  await page.locator("#txt-username").pressSequentially("John Doe", { delay: 0.5_000 });
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  // await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Login" }).dblclick();

  await expect(page.locator("h2")).toContainText("Make Appointment");

  // objects
  //Assert default dropdown value
  await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
  await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");
  //select by label or index
  await page.getByLabel("Facility").selectOption({label:"Tokyo CURA Healthcare Center"});
  await page.getByLabel("Facility").selectOption({index:2});
  // Assert dropdown count
  let drpdwnOptionsEle = page.getByLabel("Facility").locator('Option');
  await expect(drpdwnOptionsEle).toHaveCount(3);

  // Get all dropdown values
  let listOfDrpdwn = await page.getByLabel("Facility").all();
  let listOfOptions = [];
  for (let ele of listOfDrpdwn){
    let eleText = await ele.textContent();
    if (eleText){
        listOfOptions.push(eleText)
    }    
  }

  console.log(`>> list of options: ${listOfOptions}`)

  //checkbox
  await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
  await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).uncheck();
  //Radio button
  //Assert default select option
  await expect(page.getByText("Medicare")).toBeChecked();  

  // await page.getByRole("radio", { name: "Medicaid" }).click();
  await page.getByRole("radio", { name: "Medicaid" }).check();

  await expect(page.getByText("Medicare")).not.toBeChecked();  

  await page.locator("span").click();
  await page.getByRole("cell", { name: "«" }).click();
  await page.getByRole("cell", { name: "7" }).first().click();
  await page.getByRole("textbox", { name: "Comment" }).click();
  await page.getByRole("textbox", { name: "Comment" }).fill("Multiline comments..\ntest123");
  await page.getByRole("button", { name: "Book Appointment" }).click();
  await expect(page.locator("h2")).toContainText("Appointment Confirmation");

  await page.getByRole("contentinfo").click({ button: "right" });
});


test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
  });

  test("Should confirm all prices are non zero values", async ({ page }) => {
    let productElms = page.locator(".inventory_item");
    await expect(productElms).toHaveCount(6);

    //Get product names and prices
    let totalProducts = await productElms.count();
    let priceArr = [];

    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productElms.nth(i);

      //product name
      let productName = await eleNode
        .locator(".inventory_item_name ")
        .innerText();

      //price
      let price = await eleNode.locator(".inventory_item_price").innerText();

      priceArr.push(price);

      //Print Result
      console.log(`Product: ${productName}, Price: ${price}`);
    }

    let priceNum = priceArr.map((item) => parseFloat(item.replace("$", "")));
    //[29.99,9.99,15.99,49.99,7.99,15.99]

    console.log(`Price array: ${priceArr}`);
    console.log(`Modified Price array: ${priceNum}`);

    let invalidPriceArr = priceNum.filter((item) => item <= 0);

    if (invalidPriceArr.length > 0) {
      console.log(`Error`);
    }

    expect(invalidPriceArr).toHaveLength(0);
  });
});