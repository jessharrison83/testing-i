const enhancer = require("./enhancer.js");

//SUCCESS
//check to see that it returns an object
//enhancement is a string
//enhancement has to have + before numbers 1-15
//enhancement number cannot be about 15. after 15 uses table.
//if enhancement is zero, it's not displayed.
//increases enhancement by 1, updates name with new enhancement.

//FAIL
// durability decreased by 5 if under 15.
// durability decreased by 10 if >= 15
// if > 16, enhancement decreases 1 on fail
// if <= 14, no enhancement if durability under 25
// if >= 15, no enhancement if durability below 10.
// has to change name to reflect new enhancement if decreased.
