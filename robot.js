// Importing road graph
const roadGraph = require("./roads");

// memory fot the best routes
const MAILROUTE = require("./mailRoute");

//The Task
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

// Changing a state
  move(destination) {

// Check if destination is accessible from the place
    if (!roadGraph[this.place].includes(destination)) {
      return this;

    } else {
      let tempParcels = this.parcels;
      let parcels = this.parcels.map(p => {

        // Any other parcels left in other places (delivered) aren't touched
        if (p.place != this.place) return p;

        // Moving a parcel (changing place)
        return {place: destination, address: p.address};

        // Keeping only p's that address isn't the same as place (delivering)
      }).filter(p => p.place != p.address);
      
      // consoling if any parcels got delivered
      if (parcels.length != tempParcels.length) {
        console.log ("One or more parcels got delivered")
      }

      // creating a new state
      return new VillageState(destination, parcels);
    }
  }

// Add static method that collects random parcels, and initial place - "Post Office"
  static random(parcelCount = 5) {

    let parcels = [];

    for (let i = 0; i < parcelCount; i++) {

      let address = randomPick(Object.keys(roadGraph));
      let place;

      // keep picking new places while it's place the same as address
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address})
    }

    // return object (state) with beginning place - PO, and arraya of parcels to deliver
    return new VillageState("Post Office", parcels);
  }
}

function runRobot(state, robot, memory) {
  // Counter with no conditions
  for (let turn = 0;; turn++) {

    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }

    // Direction, either random or routed
    let action = robot(state, memory);

    // Changing a state after move
    state = state.move(action.direction);

    // Updating memory, accesing it from returned robot f
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// Random place from keys of road Graph
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

//Random robot directions
function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

// The Mails's truck route
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = MAILROUTE;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// Find route
function findRoute(graph, from, to) {

  // arr should be explored next
  let work = [{at: from, route: []}];

  for (let i = 0; i < work.length; i++) {
    // taking item in the list and exploring

    let {at, route} = work[i];
    // exploring all accessible places from this place

    for (let place of graph[at]) {
      // if there is straight route to the end place, return route

      if (place == to) return route.concat(place);
      // if we haven't looked at this item before, push it to explore list
      
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

// Routed robot
function goalOrientedRobot({place, parcels}, route) {
  // Ran out of memory route
  if (route.length == 0) {
    // Going through left parcels
    let parcel = parcels[0];
    // if p is in other place then the robot's status
    if (parcel.place != place) {
      // find route to a parcel
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      // find route to a parcel if it is in the same place
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  // get a first route from the memory, and slice one firts route
  return {direction: route[0], memory: route.slice(1)};
}

//measuring a robot
function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0;
  let total2 = 0;

  for (let i = 0; i < 100; i++) {

    // generating object with begining place - PO and 5 parcels as default
    let state = VillageState.random()

    // Counting steps for each robot
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot ${robot1.name} needed ${total1 / 100} steps per task`)
  console.log(`Robot ${robot2.name} needed ${total2 / 100}`)
}
// count steps
function countSteps(state, robot, memory) {
  for (let steps = 0;; steps++) {
    if (state.parcels == 0) return steps;

    // picking a direction
    let action = robot(state, memory);

    // updating a state after move
    state = state.move(action.direction);

    // updating memory
    memory = action.memory;
  }
}

function findBetterRoute(graph, from, to) {

  // arr should be explored next
  let work = [{at: from, route: []}];

  let fastestRoute = [];

  function fastestRouteCheck(fastestRoute, route) {
    if (fastestRoute.length > route.length) {
      return route;
    } else {
      return fastestRoute;
    }
  }

  for (let i = 0; i < work.length; i++) {
    // taking item in the list and exploring it

    let {at, route} = work[i];
    // exploring all accessible places from this place

    for (let place of graph[at]) {

      if (place == to) {

        // if there is straight route to the end place, save route
        route = route.concat(place);

        // comparing fastest route (if it is not empty) and current route
        if (fastestRoute.length !== 0) {

          fastestRoute = fastestRouteCheck(fastestRoute, route);

        } else {

          // if it's empty than, first found route is a fastest route so far
        fastestRoute = route;
        }
      }

      // if we haven't looked at this item before, push it to explore list
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }

  return fastestRoute;
}

// Efficient robot funtion
function efficientRobot({place, parcels}, route) {
  // Ran out of memory route
  if (route.length == 0) {
    // Going through left parcels
    let parcel = parcels[0];
    // if p is in other place then the robot's status
    if (parcel.place != place) {
      //  route to a parcel
      route = findBetterRoute(roadGraph, place, parcel.place);
    } else {
      // find route to a parcel if it is in the same place
      route = findBetterRoute(roadGraph, place, parcel.address);
    }
  }
  // get a first route from the memory, and slice one firts route
  return {direction: route[0], memory: route.slice(1)};
}
// runRobot(VillageState.random(), efficientRobot, []);
compareRobots(efficientRobot, [], goalOrientedRobot, []);