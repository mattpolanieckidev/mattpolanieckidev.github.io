
import Pokemon from "./Pokemon.js";

//Pokemon Name, Number, Type, Catch Status
const bulbasaur = new Pokemon(
  "Bulbasaur",
  1,
  "grass",
  true,
  
);
const ivysaur = new Pokemon(
  "Ivysaur",
  2,
  "grass",
  true,
  
);
const venasaur = new Pokemon(
  "Venasaur",
  3,
  "grass",
  true,
  
);
const squirtle = new Pokemon(
  "Squirtle",
  4,
  "water",
  true,
  
);
const wartortle = new Pokemon(
  "Wartortle",
  5,
  "water",
  true,
  
);

const content = `
<div class="header">
<h1>Pokedex</h1> 
</div>
<div class="grid">
<div class="card">

  <div class="container">
    <h4><b>Name:${bulbasaur.name}</b></h4>
    <p>Type: ${bulbasaur.type}</p>
    <p>Catch Status:${bulbasaur.caught}</p>
    <p>Number:${bulbasaur.number}</p>
  </div>
</div>
<div class="card">

  <div class="container">
    <h4><b>Name:${bulbasaur.name}</b></h4>
    <p>Type: ${bulbasaur.type}</p>
    <p>Catch Status:${bulbasaur.caught}</p>
    <p>Number:${bulbasaur.number}</p>
  </div>
</div>
<div class="card">

  <div class="container">
    <h4><b>Name:${bulbasaur.name}</b></h4>
    <p>Type: ${bulbasaur.type}</p>
    <p>Catch Status:${bulbasaur.caught}</p>
    <p>Number:${bulbasaur.number}</p>
  </div>
</div>
<div class="card">

  <div class="container">
    <h4><b>Name:${bulbasaur.name}</b></h4>
    <p>Type: ${bulbasaur.type}</p>
    <p>Catch Status:${bulbasaur.caught}</p>
    <p>Number:${bulbasaur.number}</p>
  </div>
</div>
<div class="card">

  <div class="container">
    <h4><b>Name:${bulbasaur.name}</b></h4>
    <p>Type: ${bulbasaur.type}</p>
    <p>Catch Status:${bulbasaur.caught}</p>
    <p>Number:${bulbasaur.number}</p>
  </div>
</div>
<div class="card">

  <div class="container">
    <h4><b>Name:${bulbasaur.name}</b></h4>
    <p>Type: ${bulbasaur.type}</p>
    <p>Catch Status:${bulbasaur.caught}</p>
    <p>Number:${bulbasaur.number}</p>
  </div>
</div>
</div>
`
document.body.innerHTML = content;

console.log(bulbasaur, ivysaur, venasaur, squirtle, wartortle);

