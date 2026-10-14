import assert from "node:assert/strict";
import test from "node:test";
import { lineValue, stockStatus } from "./inventory-math.ts";

test("single product inventory value matches the acceptance case", () => {
  assert.equal(lineValue(1500, 20), 30000);
  assert.equal(lineValue(1500, 15), 22500);
  assert.equal(lineValue(0, 20), 0);
});

test("stock status thresholds", () => {
  assert.equal(stockStatus(0, 5), "out");
  assert.equal(stockStatus(5, 5), "low");
  assert.equal(stockStatus(1, 5), "low");
  assert.equal(stockStatus(6, 5), "in");
});
