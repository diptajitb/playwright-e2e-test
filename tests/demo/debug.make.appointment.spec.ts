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
  // await page.getByRole("button", { name: "Login" }).dblclick();
  await page.getByRole("button", { name: "Login" }).press("Enter")

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


  // await page.pause()  //helps to run from the steps in --ui mode for debug


  //Date input
  await page.getByRole("textbox",{name: "Visit Date (Required)"}).click();
  await page.getByRole("textbox",{name: "Visit Date (Required)"}).fill("05/10/2027");
  // await page.getByRole("textbox",{name: "Visit Date (Required)"}).press("Enter");


  await page.getByRole("textbox", { name: "Comment" }).click();
  await page.getByRole("textbox", { name: "Comment" }).fill("Multiline comments..\ntest123");

  await page.getByRole("button", { name: "Book Appointment" }).click();
  await expect(page.locator("h2")).toContainText("Appointment Confirmation");

  // await page.getByRole("contentinfo").click({ button: "right" });
});
