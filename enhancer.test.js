const enhancer = require("./enhancer.js");
const equip = require("./equipment.js");
const results = require("./results.js");
const armor = equip.armor;
const weapons = equip.weapons;

//FAIL
// durability decreased by 5 if under 15.
// durability decreased by 10 if >= 15
// if >= 16, enhancement decreases 1 on fail
// if <= 14, no enhancement if durability under 25
// if >= 15, no enhancement if durability below 10.
// has to change name to reflect new enhancement if decreased.

describe("enhancement", () => {
  describe("success function", () => {
    test("below 7 weapon will not fail", () => {
      expect(enhancer.success(weapons[0])).toEqual(results.lowWeapon);
    });
    test("below 5 armor will not fail", () => {
      expect(enhancer.success(armor[1])).toEqual(results.lowArmor);
    });
    test("return fail for durability < 25 and enhance < 15", () => {
      expect(enhancer.success(armor[0])).toEqual("failed");
    });
    test("return fail for durability < 10 and enhance >= 15", () => {
      expect(enhancer.success(armor[2])).toEqual("failed");
    });
    test("add one for success less than 16", () => {
      expect(enhancer.success(weapons[1])).toEqual(results.passEquip);
    });
    test("returns accurate string for >= 16 enhancement", () => {
      expect(enhancer.success(weapons[2])).toEqual(results.passHighEnhance);
    });
    test("enhancement does not go beyond 20", () => {
      expect(enhancer.success(weapons[3])).toEqual("failed");
    });
  });
  describe("fail function", () => {
    test("durability decrease by 5 when enhance < 15", () => {
      expect(enhancer.fail(weapons[4])).toEqual(results.lowFail);
    });
    test("durability decrease by 10 when enhance >= 15", () => {
      expect(enhancer.fail(armor[3])).toEqual(results.highFail);
    });
    test("enhancement level changes if fail at EL >= 16", () => {
      expect(enhancer.fail(armor[2])).toEqual(results.stringLevelsFail);
    });
  });
});
