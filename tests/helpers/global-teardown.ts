import { type FullConfig } from "@playwright/test";
import { exec } from "child_process";
import { error } from "console";
import { stderr, stdout } from "process";

export default async function globalSetup(config: FullConfig) {
    console.log(`[info]: Starting global teardown...`);

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(`[info]: Detecting local run...`);

    //run allure serve command to open allure report
    exec("allure serve", (error, stdout,stderr) => {
      if (error){
        console.error("Error while starting Allure server:", error.message);
      }
    });
    
  }
console.log(`[info]: Completed global teardown process`);
}
