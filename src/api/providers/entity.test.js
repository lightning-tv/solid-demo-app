import { expect, vi } from "vitest";
import { minutesToHMM } from "./entity.js";

test("function should return 0h 00min when 0 is passed in as an argument", () => {
  const result = minutesToHMM(0);
  expect(result).toEqual("0h 00min");
});
