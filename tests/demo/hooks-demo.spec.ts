import { test, expect } from "@playwright/test";

test.beforeAll("Before all hook", () => {
  console.log(`beforeAll hook -- should run once per worker`);
});

test.beforeEach("Before each hook", () => {
  console.log(`beforeEach hook -- should run before each test in this file`);
});

test.describe("Test suite 1", () => {
  test.beforeAll("Suite1 Before all hook", () => {
    console.log(`Suite1 beforeAll hook -- should run once per worker`);
  });

  test.beforeEach("Suite1 Before each hook", () => {
    console.log(
      `Suite1 beforeEach hook -- should run before each test in this file`
    );
  });

  test("Test 1", async ({ page }) => {});

  test("Test 2", async ({ page }) => {});

  test("Test 3", async ({ page }) => {});
});

test.describe("Test suite 2", () => {
  test.beforeEach("Suite2 Before each hook", () => {
    console.log(
      `Suite2 beforeEach hook -- should run before each test in this file`
    );
  });

  test("Test 4", async ({ page }) => {});

  test("Test 5", async ({ page }) => {});

  test("Test 6", async ({ page }) => {});
});
