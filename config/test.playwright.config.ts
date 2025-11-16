import { defineConfig, devices } from "@playwright/test";
import { baseconfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "path";

console.log(`>> Running tests in Test Env...`);

export default defineConfig<EnvConfig>({
  ...baseconfig, // this will load all base config values from playwright.config.ts
  testDir: path.resolve(process.cwd(), "./tests"),

  use: {
    ...baseconfig.use, //Loading the existing use object from base file to overrite
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig: {
        server: "",
        dbname: "",
        connectionStr: "",
    },
  },
});
