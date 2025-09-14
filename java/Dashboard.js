//====================== Declare All Variables ===========================

var eventsName = document.getElementById("eventsName");
var eventsDescription = document.getElementById("eventsDescription");
var eventDate = document.getElementById("eventDate");
var eventTime = document.getElementById("eventTime");
var eventLocation = document.getElementById("eventLocation");
var eventPrice = document.getElementById("eventPrice");
var eventCapacity = document.getElementById("eventCapacity");
var but1 = document.getElementById("but1");
var but2 = document.getElementById("but2");
var btnAddEvents = document.getElementById("btnAddEvents");
let mood = "create";
let ev;
var tBody = document.getElementById("tBody");
var searchInput = document.getElementById("search");

// ==================== Speakers Container in Local Storage =================

let speakersData = JSON.parse(localStorage.getItem("speakerData")) || [];

totalSpeakers();

// ==================== User information Container in Local Storage =================

var personalInformation = localStorage.getItem("personalInformation");
if (personalInformation === null || personalInformation === "undefined") {
  personalInformation = [];
} else {
  personalInformation = JSON.parse(personalInformation);
}

// ==================== Declare Local Storage And Event information Container in Local Storage =================

var eventContainer;
if (localStorage.getItem("eventData") == null) {
  eventContainer = [];
} else {
  eventContainer = JSON.parse(localStorage.getItem("eventData"));
  displayEvents();
}

// =========================== Local Storage End ===============================================================================================================================================================

//======================== Function To Add Events ===========================

function addEvents() {
  if (checkData() === true) {
    let events = {
      name: eventsName.value,
      date: eventDate.value,
      description: eventsDescription.value,
      time: eventTime.value,
      location: eventLocation.value,
      capacity: eventCapacity.value,
      price: eventPrice.value,
    };
    if (mood === "create") {
      eventContainer.push(events);
    } else {
      eventContainer[ev] = events;
      mood = "create";
      btnAddEvents.innerHTML = "+ Add Event";
    }
    console.log(eventContainer);
    deleteInput();
    displayEvents();
    totalEvents();
    localStorage.setItem("eventData", JSON.stringify(eventContainer));
  } else {
    alert("You Need To Enter Event Details");
  }
}

//====================== Function To Delete Events Inputs ===========================

function deleteInput() {
  eventsName.value = "";
  eventDate.value = "";
  eventsDescription.value = "";
  eventTime.value = "";
  eventLocation.value = "";
  eventCapacity.value = "";
  eventPrice.value = "";
}

//====================== Function To Display Events ===========================

function displayEvents() {
  let cartEv = ``;
  for (let i = 0; i < eventContainer.length; i++) {
    cartEv += `<tr>
                  <td class="span">ID</td>
        <td>${i + 1}</td>
                <td class="span">Date</td>
        <td>${eventContainer[i].date}</td>
                <td class="span">Time</td>
        <td>${eventContainer[i].time}</td>
                <td class="span">Event</td>
        <td>
          <div class="description">
            <a data-bs-toggle="collapse" href="#desc${i}" role="button" aria-expanded="false" aria-controls="desc">
              ${eventContainer[i].name}
            </a>
            <div class="collapse" id="desc${i}">
              <div class="card card-body description-card">
                ${eventContainer[i].description}
              </div>
            </div>
          </div>
        </td>
                <td class="span">Location</td>
        <td>
          ${eventContainer[i].location}
          <button class="btn btn-sm btn-outline-info ms-2" onclick="showOnMap('${
            eventContainer[i].location
          }')">
            <i class="fa-solid fa-map-location-dot"></i>
          </button>
        </td>
                <td class="span">Capacity</td>
        <td>${eventContainer[i].capacity}</td>
                <td class="span">Price</td>
        <td>${eventContainer[i].price}</td>
        <td><button class="btn btn-outline-warning" onclick="updateEvents(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteEvents(${i})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`;
  }
  document.getElementById("tBody").innerHTML = cartEv;
  totalEvents();
  totalusers();
  totalSpeakers();
}

//====================== Function To add Map Using API ===========================

async function showOnMap(location) {
  try {
    const resolve = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`
    );
    const data = await resolve.json();

    if (!data.length) {
      return alert("Location not found!");
    }
    const { lat, lon } = data[0];
    const mapWindow = window.open();

    mapWindow.document.writeln(`
      <html>
      <head>
        <title>Event Location</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      </head>
      <body>
        <div id="map" style="width:100%; height:100vh;"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          const map = L.map("map").setView([${lat}, ${lon}], 30);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
          L.marker([${lat}, ${lon}]).addTo(map);
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    alert("Error fetching location!");
  }
}

//====================== Function To Check Data  ===========================

function checkData() {
  if (
    eventsName.value != "" &&
    eventDate.value != "" &&
    eventTime.value != "" &&
    eventPrice.value != "" &&
    eventLocation.value != "" &&
    eventsDescription.value != ""
  ) {
    return true;
  } else return false;
}

//====================== Function To Delete Events ===========================

function deleteEvents(index) {
  var confirmDelete = confirm("Are You Sure You Want To Delete This Event?");
  if (confirmDelete) {
    eventContainer.splice(index, 1);
    displayEvents();
    localStorage.setItem("eventData", JSON.stringify(eventContainer));
  } else {
    alert("Event deletion canceled.");
  }
}

//====================== Function To Update Events ===========================

function updateEvents(i) {
  eventsName.value = eventContainer[i].name;
  eventsDescription.value = eventContainer[i].description;
  eventDate.value = eventContainer[i].date;
  eventTime.value = eventContainer[i].time;
  eventLocation.value = eventContainer[i].location;
  eventCapacity.value = eventContainer[i].capacity;
  eventPrice.value = eventContainer[i].price;
  btnAddEvents.innerHTML = "Update";
  mood = "update";
  ev = i;
  scroll({
    top: 10,
    behavior: "smooth",
  });
}

//====================== Function To Search In Events ===========================

function searchEvents(searchInput) {
  var cart = ``;
  for (var i = 0; i < eventContainer.length; i++) {
    if (
      eventContainer[i].name
        .toLowerCase()
        .includes(searchInput.toLowerCase()) == true ||
      eventContainer[i].date
        .toLowerCase()
        .includes(searchInput.toLowerCase()) == true ||
      eventContainer[i].location
        .toLowerCase()
        .includes(searchInput.toLowerCase()) == true ||
      eventContainer[i].price
        .toLowerCase()
        .includes(searchInput.toLowerCase()) == true
    )
      cart += `<tr>
                  <td class="span">ID</td>
        <td>${i + 1}</td>
                <td class="span">Date</td>
        <td>${eventContainer[i].date}</td>
                <td class="span">Time</td>
        <td>${eventContainer[i].time}</td>
                <td class="span">Event</td>
        <td>
          <div class="description">
            <a data-bs-toggle="collapse" href="#desc${i}" role="button" aria-expanded="false" aria-controls="desc">
              ${eventContainer[i].name}
            </a>
            <div class="collapse" id="desc${i}">
              <div class="card card-body description-card">
                ${eventContainer[i].description}
              </div>
            </div>
          </div>
        </td>
                <td class="span">Location</td>
        <td>
          ${eventContainer[i].location}
          <button class="btn btn-sm btn-outline-info ms-2" onclick="showOnMap('${
            eventContainer[i].location
          }')">
            <i class="fa-solid fa-map-location-dot"></i>
          </button>
        </td>
                <td class="span">Capacity</td>
        <td>${eventContainer[i].capacity}</td>
                <td class="span">Price</td>
        <td>${eventContainer[i].price}</td>
            <td><button class="btn btn-outline-warning" onclick="updateEvents(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteEvents(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
  }
  document.getElementById("tBody").innerHTML = cart;
}

//======================  Display Function Search When KeyUp  ===========================

searchInput.addEventListener("keyup", function () {
  searchEvents(searchInput.value);
});

//======================  Function Get Count Of Events  ===========================

function totalEvents() {
  document.getElementById("total").innerText = eventContainer.length;
}

//======================  Function Get Count Of Users  ===========================

function totalusers() {
  document.getElementById("totaluser").innerText = personalInformation.length;
}

//====================== Function Get Count Of Speakers ===========================

function totalSpeakers() {
  document.getElementById("totalSpeakers").innerText = speakersData.length;
}
