const ROADS = [
  "Alice's House-Bob's House",
  "Alice's House-Post Office",
  "Daria's House-Ernie's House",
  "Ernie's House-Grete's House",
  "Grete's House-Shop",
  "Marketplace-Post Office",
  "Alice's House-Cabin",
  "Bob's House-Town Hall",
  "Daria's House-Town Hall",
  "Grete's House-Farm",
  "Marketplace-Farm",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

// This makes sure the data is exported in node.js —
// `require('./path/to/scripts.js')` will get you the array.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = ROADS;
if (typeof global != "undefined" && !global.ROADS)
  global.ROADS = ROADS;