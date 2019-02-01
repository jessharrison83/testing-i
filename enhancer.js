const enhanceConvert = enhance => {
  const numbers = [16, 17, 18, 19, 20];
  const levels = ["PRI", "DUO", "TRI", "TET", "PEN"];
  if (levels.includes(enhance)) {
    return numbers[levels.indexOf(enhance)];
  } else return Number(enhance);
};

const durabilityCheck = (item, enhance) => {
  if (enhance <= 15 && item.durability >= 25) {
    return true;
  } else if (enhance > 15 && item.durability >= 10) {
    return true;
  } else return false;
};

const highEnhanceRevert = enhance => {
  const numbers = [15, 16, 17, 18, 19, 20];
  const levels = ["+15", "PRI", "DUO", "TRI", "TET", "PEN"];
  return levels[numbers.indexOf(enhance)];
};

const nameStripper = (name, enhance) => {
  if (enhance != 0) {
    const split = name.split(" ");
    split.shift();
    return split.join(" ");
  } else return name;
};

module.exports = {
  success: item => {
    //holds minimum durability based on type
    let minimum = 0;
    let currentEnhance = enhanceConvert(item.enhancement);
    const durability = durabilityCheck(item, currentEnhance);
    const strippedName = nameStripper(item.name, currentEnhance);
    //check for type
    if (item.type === "weapon") {
      minimum = 7;
    } else {
      minimum = 5;
    }
    //add one for enhancement levels under the minimum for fail || add one if meets durability requirements and is under 15
    if (currentEnhance <= minimum || (currentEnhance < 15 && durability)) {
      currentEnhance += 1;
      let enhanceString = `+${currentEnhance}`;
      item.enhancement = enhanceString;
      item.name = `[${enhanceString}] ${strippedName}`;
      return item;
    } else if (!durability || currentEnhance === 20) {
      return "failed";
    } else if (currentEnhance >= 15) {
      console.log(currentEnhance);
      currentEnhance += 1;
      let highLevelString = highEnhanceRevert(currentEnhance);
      item.enhancement = highLevelString;
      item.name = `[${highLevelString}] ${strippedName}`;
      return item;
    }
  },
  fail: item => {
    let level = enhanceConvert(item.enhancement);
    if (level < 15) {
      item.durability -= 5;
      return item;
    } else if (level === 15) {
      item.durability -= 10;
      return item;
    } else {
      item.durability -= 10;
      level -= 1;
      item.enhancement = highEnhanceRevert(level);
      const stripped = nameStripper(item.name, level);
      if (level > 15) {
        item.name = `[${item.enhancement}] ${stripped}`;
        return item;
      } else {
        item.name = `[+${level}] ${stripped}`;
        return item;
      }
    }
  },
  repair: item => {}
};
