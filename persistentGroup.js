class PGroup {
  constructor(value) {
    this.value = value;
  }
  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.value.concat([value]));
  }
  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.value.filter(m => m !== value))
  }
  has(arg) {
    return this.value.includes(arg);
  }
}
PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false