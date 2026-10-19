
const planets = [
  {
    name: "MERCURY",
    type: "Terrestrial",
    year: "88 Earth days",
    moons: 0,
    description: "The smallest planet in our solar system. Mercury races around the Sun in just 88 Earth days.",
    color: "mercury"
  },
  {
    name: "VENUS",
    type: "Terrestrial",
    year: "225 Earth days",
    moons: 0,
    description: "A world of thick clouds and extreme heat. Venus is the hottest planet in our solar system.",
    color: "venus"
  },
  {
    name: "EARTH",
    type: "Terrestrial",
    year: "365.25 days",
    moons: 1,
    description: "Our home world. Earth has liquid water on its surface and is currently the only world known to support life.",
    color: "earth"
  },
  {
    name: "MARS",
    type: "Terrestrial",
    year: "687 Earth days",
    moons: 2,
    description: "The Red Planet. Mars has enormous volcanoes, ancient valleys, and evidence of water in its past.",
    color: "mars"
  },
  {
    name: "JUPITER",
    type: "Gas giant",
    year: "11.86 Earth years",
    moons: 101,
    description: "The largest planet in our solar system. Jupiter is famous for its enormous storms and the Great Red Spot.",
    color: "jupiter"
  },
  {
    name: "SATURN",
    type: "Gas giant",
    year: "29.4 Earth years",
    moons: 274,
    description: "A giant planet surrounded by spectacular rings made mostly of countless pieces of ice and rocky material.",
    color: "saturn"
  },
  {
    name: "URANUS",
    type: "Ice giant",
    year: "84 Earth years",
    moons: 28,
    description: "A distant ice giant that rotates on its side. Its blue-green appearance comes from methane in its atmosphere.",
    color: "uranus"
  },
  {
    name: "NEPTUNE",
    type: "Ice giant",
    year: "165 Earth years",
    moons: 16,
    description: "A deep-blue world far from the Sun, known for powerful winds and a cold, dynamic atmosphere.",
    color: "neptune"
  }
];

const grid = document.getElementById("planet-grid");
const detailName = document.getElementById("detail-name");
const detailNumber = document.getElementById("planet-number");
const detailDescription = document.getElementById("detail-description");
const detailType = document.getElementById("detail-type");
const detailYear = document.getElementById("detail-year");
const detailMoons = document.getElementById("detail-moons");
const detailVisual = document.getElementById("detail-visual");
const discoverButton = document.getElementById("discover-btn");
const missionMessage = document.getElementById("mission-message");
const soundButton = document.getElementById("sound-btn");

let selectedPlanet = 0;

function showPlanet(index) {
  const planet = planets[index];
  selectedPlanet = index;

  detailName.textContent = planet.name;
  detailNumber.textContent =
    "PLANET " + String(index + 1).padStart(2, "0");
  detailDescription.textContent = planet.description;
  detailType.textContent = planet.type;
  detailYear.textContent = planet.year;
  detailMoons.textContent = planet.moons;

  detailVisual.innerHTML =
    '<div class="detail-planet ' + planet.color + '"></div>';

  document.querySelectorAll(".planet-card").forEach((card, i) => {
    const active = i === index;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });

  missionMessage.textContent = "DESTINATION SELECTED: " + planet.name;

  detailVisual.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

function buildPlanetCards() {
  planets.forEach((planet, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "planet-card";
    card.setAttribute("aria-pressed", "false");

    const ball = document.createElement("span");
    ball.className = "mini-planet " + planet.color;

    const name = document.createElement("strong");
    name.textContent = planet.name;

    const type = document.createElement("small");
    type.textContent = planet.type;

    card.append(ball, name, type);
    card.addEventListener("click", () => showPlanet(index));
    grid.appendChild(card);
  });
}

discoverButton.addEventListener("click", () => {
  let next = Math.floor(Math.random() * planets.length);

  if (planets.length > 1 && next === selectedPlanet) {
    next = (next + 1) % planets.length;
  }

  showPlanet(next);
  document.getElementById("planets").scrollIntoView({
    behavior: "smooth"
  });
});

soundButton.addEventListener("click", () => {
  soundButton.textContent = "◉ SOUND OFF";
  missionMessage.textContent =
    "SOUND IS OFF. Explore the cosmos in silent mode.";
});

buildPlanetCards();
showPlanet(0);
