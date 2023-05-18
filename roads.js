// importing function to build graph from roads
const buildGraph = require("./graph");

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

const roadGraph = buildGraph(ROADS);

// This makes sure the data is exported in node.js —
// `require('./path/to/scripts.js')` will get you the array.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = roadGraph;
if (typeof global != "undefined" && !global.roadGraph)
  global.roadGraph = roadGraph;