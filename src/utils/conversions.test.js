import assert from "node:assert/strict";
import test from "node:test";
import { convertUnits, unitCategories } from "./conversions.js";

const closeTo = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

test("converts common length, mass, area, and volume units", () => {
  closeTo(convertUnits(1, "length", "km", "mi").value, 0.621371192237334);
  closeTo(convertUnits(3, "length", "ft", "cm").value, 91.44);
  closeTo(convertUnits(1, "mass", "lb", "oz").value, 16);
  closeTo(convertUnits(2, "area", "ha", "m2").value, 20_000);
  closeTo(convertUnits(1, "volume", "gal", "l").value, 3.785411784);
});

test("converts temperature scales with offsets and digital units explicitly", () => {
  closeTo(convertUnits(32, "temperature", "f", "c").value, 0);
  closeTo(convertUnits(0, "temperature", "c", "k").value, 273.15);
  closeTo(convertUnits(100, "temperature", "c", "f").value, 212);
  closeTo(convertUnits(1, "data", "mib", "mb").value, 1.048576);
  closeTo(convertUnits(1, "data", "kib", "b").value, 1024);
  closeTo(convertUnits(2, "time", "h", "s").value, 7200);
  assert.equal(Object.keys(unitCategories).length, 7);
});

test("rejects non-finite values and units from another category", () => {
  assert.throws(() => convertUnits("nope", "length", "km", "mi"), /finite number/);
  assert.throws(() => convertUnits(1, "unknown", "km", "mi"), /category/);
  assert.throws(() => convertUnits(1, "length", "km", "oz"), /same category/);
});
