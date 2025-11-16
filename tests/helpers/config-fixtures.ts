import { test as base } from "@playwright/test";

export type EnvConfig = {
    envName: string;
    appURL: string;
    dbConfig: {};
};

export const test = base.extend<EnvConfig>({
    // Define options and provide default values.
    // We can later override them in the config.
    envName: ["test", { option: true }],
    appURL: ["<provide-a-val>", { option: true }],
    dbConfig: [{}, { option: true }],
});


