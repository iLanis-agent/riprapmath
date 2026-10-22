// Riprap Math engine: stone volume for a lined slope or channel, tons from a density, truckloads, and the cost per square foot covered. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the plan and the quarry ticket.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _LEN = "the length must be from 1 to 10000 ft with no decimal places";
var _WID = "the width must be from 1 to 1000 ft with no decimal places";
var _THK = "the thickness must be from 1 to 120 inches with no decimal places";
var _CY = "the cubic yards must be from 1 to 100000000 with no decimal places";
var _DENS = "the density must be from 0.01 to 10 tons a cubic yard with at most two decimal places";
var _TONS = "the tons must be from 1 to 100000000 with no decimal places";
var _LOAD = "the truck load must be from 1 to 1000 tons with no decimal places";
var _TRUCKS = "the truck count must be from 1 to 1000000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function volumeTruth(lenft, widft, thkin) {
  var l = _i(lenft, _LEN, 5, 1, 10000), w = _i(widft, _WID, 4, 1, 1000), t = _i(thkin, _THK, 3, 1, 120);
  var cy100 = _hu(l * w * t * 100, 324);
  return "The area of " + l + " ft by " + w + " ft at " + t + " inches thick takes " + _dec(cy100, 2) + " cu yd of stone.";
}
function tonsTruth(cy, dens) {
  var c = _i(cy, _CY, 9, 1, 100000000), d = _p(dens, _DENS, 2, 2, 1, 1000);
  return "The " + c + " cu yd at " + _dec(d, 2) + " tons a cubic yard weighs " + _dec(c * d, 2) + " tons.";
}
function trucksTruth(tons, load) {
  var t = _i(tons, _TONS, 9, 1, 100000000), l = _i(load, _LOAD, 4, 1, 1000);
  var n = Math.floor((t + l - 1) / l), spare = n * l - t;
  return "The " + t + " tons in loads of " + l + " tons takes " + _pl(n, " truck", " trucks") + ", leaving " + spare + (spare === 1 ? " ton" : " tons") + " of room in the last one.";
}
function costTruth(tons, tonprice, trucks, fee, area) {
  var t = _i(tons, _TONS, 9, 1, 100000000), tp = _p(tonprice, _PRICE, 5, 2, 1, 1000000);
  var n = _i(trucks, _TRUCKS, 7, 1, 1000000), f = _p(fee, _PRICE, 5, 2, 1, 1000000);
  var a = _i(area, _AREA_N, 9, 1, 100000000);
  var cents = t * tp + n * f, per = _hu(cents, a);
  return "The " + t + (t === 1 ? " ton" : " tons") + " at $" + _dec(tp, 2) + " and the " + _pl(n, " truck", " trucks") + " at $" + _dec(f, 2) + " delivery cost $" + _money(cents) + ", or $" + _money(per) + " a square foot over the " + a + ".";
}
var _AREA_N = "the area must be from 1 to 100000000 sq ft with no decimal places";
