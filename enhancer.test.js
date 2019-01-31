const enhancer = require("./enhancer.js");
const equip = require("./equipment.js");
const armor = equip.armor;
const weapons = equip.weapons;
const lowWeapon = {
  name: "[+1]awesome sword",
  type: "weapon",
  durability: 12,
  enhancement: "+1"
};
const lowArmor = {
  name: "[+1]old boots",
  type: "armor",
  durability: 4,
  enhancement: "+1"
};
const passEquip = {
  name: "[+1]spear",
  type: "weapon",
  durability: 100,
  enhancement: "+1"
};
const passHighEnhance = {
  name: "[DUO]bow",
  type: "weapon",
  durability: 100,
  enhancement: "DUO"
};
//FAIL
// durability decreased by 5 if under 15.
// durability decreased by 10 if >= 15
// if > 16, enhancement decreases 1 on fail
// if <= 14, no enhancement if durability under 25
// if >= 15, no enhancement if durability below 10.
// has to change name to reflect new enhancement if decreased.

describe("enhancement", () => {
  describe("success function", () => {
    test("below 7 weapon will not fail", () => {
      expect(enhancer.success(weapons[0])).toEqual(lowWeapon);
    });
    test("below 5 armor will not fail", () => {
      expect(enhancer.success(armor[1])).toEqual(lowArmor);
    });
    test("return fail for durability < 25 and enhance < 15", () => {
      expect(enhancer.success(armor[0])).toEqual("failed");
    });
    test("return fail for durability < 10 and enhance >= 15", () => {
      expect(enhancer.success(armor[2])).toEqual("failed");
    });
    test("add one for success less than 16", () => {
      expect(enhancer.success(weapon[1])).toEqual(passEquip);
    });
    test("returns accurate string for >= 16 enhancement", () => {
      expect(enhancer.success(weapon[3])).toEqual(passHighEnhance);
    });
  });
});
