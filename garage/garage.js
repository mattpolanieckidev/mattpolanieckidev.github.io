let garage = [];
let id = 1;
let cars = ["Acura", "Honda", "Toyota", "Mazda", "Cadillac", "Infinity"];
document.getElementById("status").innerHTML = "There's room";

function addcar() {
  garage.push(
    (car = {
      id: id++,
      name: cars[Math.floor(Math.random() * 6)],
    })
  );

  if (garage.length < 17) {
    document.getElementById("mylist").innerHTML = "";
    document.getElementById("status").innerHTML = "There's room";
    // Iterate over the property names:
    for (const car of garage) {
      var textnode = document.createTextNode(car.name);
      const node = document.createElement("li");
      node.appendChild(textnode);
      document.getElementById("mylist").appendChild(node);
    }
  } else {
    console.log("full");
    document.getElementById("status").innerHTML = "No room!";
    document.getElementById("status").classList.add("statusfull");
  }
}
const input = document.querySelector("input");
let parent = document.getElementById("mylist");
let children = parent.childNodes;
let li = document.getElementsByTagName("li");
function search() {
  let x = document.querySelector("li");
  var val = document.querySelector("input").value - 1;
  console.log(garage[val].name);
  children[val].style.backgroundColor = "yellow";
  document.getElementById("status").innerHTML = garage[val].name;
}

function removecar() {
  garage.pop();
  parent.removeChild(parent.lastElementChild);
}
