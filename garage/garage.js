//define some constants
const input = document.querySelector("input");
let parent = document.getElementById("mylist");
let children = parent.childNodes;
let li = document.getElementsByTagName("li");

//create the garage and cars
let garage = [];
let id = 1;
let cars = ["Acura", "Honda", "Toyota", "Mazda", "Cadillac", "Infinity"];
//define a lot status
document.getElementById("status").innerHTML = "There's room";

//add a car to the garage
function addcar() {
  garage.push(
    (car = {
      id: id++,
      name: cars[Math.floor(Math.random() * 6)],
    })
  );
//check to see if there is space
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

//remove a car from the garage
function removecar() {
  garage.pop();
  parent.removeChild(parent.lastElementChild);
}

//search for a car
function search() {
    //clear previous search
    var y = document.getElementsByTagName('li')
    for (var items of y) {
        items.style.backgroundColor = "white";
      }
    var val = document.querySelector("input").value - 1;
    console.log(garage[val].name);
    children[val].style.backgroundColor = "yellow";
    document.getElementById("status").innerHTML = garage[val].name;
  }

