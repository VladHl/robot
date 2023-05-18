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

// exporting, to roads.js
module.exports = buildGraph;
// console.log(roadGraph);