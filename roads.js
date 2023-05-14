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

//Building a graph, for each place tells what can be reached from there
// edges - roads
function buildGraph(edges) {
  //creat an empty object 
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (graph[from] == null) {
        graph[from] = [to];
      } else {
        graph[from].push(to);
      }
    }
  // Iterating through array elements (map), and spliting it into 2 el.(split)
    for (let [from, to] of edges.map(r => r.split("-"))) {
  
  // Adding places you can reached out to for the 1st place in the list
      addEdge(from, to);
  
  // For the ssecond place destinations place will be the 1st place
      addEdge(to, from);
    }
  // Returns an object with places names which contains an array of possible destinations
    return graph;
  }

// This makes sure the data is exported in node.js —
// `require('./path/to/scripts.js')` will get you the array.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = ROADS;
if (typeof global != "undefined" && !global.ROADS)
  global.ROADS = ROADS;