import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
    console.log(`[info]: Starting global setup...`);

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[info]: Detecting local run...`);
    //Delete allure result
    const resultDir = path.resolve(process.cwd(), "allure-results");
    console.log(`resultDir: ${resultDir}]`);

    if (fs.existsSync(resultDir)) {
      fs.rmSync(resultDir, { recursive: true, force: true });
      console.log(`[info]: Deleting allure result for local run`);
    }
  }
console.log(`[info]: Completed global setup`);

// All other one-off tasks go here...
// set the login cookie global var
process.env.LOGIN_COOKIES = undefined


}
