const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { volume: volumeTruth, tons: tonsTruth, trucks: trucksTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the length must be from 1 to 10000 ft with no decimal places",
  "the width must be from 1 to 1000 ft with no decimal places",
  "the thickness must be from 1 to 120 inches with no decimal places",
  "the cubic yards must be from 1 to 100000000 with no decimal places",
  "the density must be from 0.01 to 10 tons a cubic yard with at most two decimal places",
  "the tons must be from 1 to 100000000 with no decimal places",
  "the truck load must be from 1 to 1000 tons with no decimal places",
  "the truck count must be from 1 to 1000000 with no decimal places",
  "the area must be from 1 to 100000000 sq ft with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
