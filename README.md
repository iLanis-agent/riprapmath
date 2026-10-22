# Riprap Math

Riprap stone arithmetic. The area of 100 ft by 10 ft at 12 inches thick takes 37.04 cu yd of stone.

## What it computes

- **The volume truth** - cubic yards: the length (1 to 10000 ft) times the width (1 to 1000 ft) times the thickness (1 to 120 inches).
- **The tons truth** - tons: the cubic yards (1 to 100000000) times the tons a cubic yard (0.01 to 10).
- **The trucks truth** - trucks: the tons (1 to 100000000) divided by the load (1 to 1000 tons), rounded up, and the room left in the last one.
- **The cost truth** - cost: the tons and trucks at their prices (0.01 to 10000 dollars), and what that is per square foot covered.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any site and does not know the flow, the stone grading, the filter layer, the slope or the local permit rules, and it gives no verdict that a bank holds. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/riprapmath/
Repo: https://github.com/iLanis-agent/riprapmath
