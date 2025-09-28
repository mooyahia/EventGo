let searchInput = document.getElementById("search");
let eventContainer = JSON.parse(localStorage.getItem("eventData") || "[]");

// ============= Search For And Event  ===============================================================================================================================================================
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
        .toString()
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
             <td><button type="button" id="bookNow" onclick="bookEvent(${i})">Book Now</button></td>
        </tr>`;
  }
  document.getElementById("tBody").innerHTML = cart;
}
searchInput.addEventListener("keyup", function () {
  searchEvents(searchInput.value);
});

// ============= Display Events In Page  ===============================================================================================================================================================
function displayAllEvents() {
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
        <td><button type="button" id="bookNow" onclick="bookEvent(${i})">Book Now</button></td>
    </tr>`;
  }
  document.getElementById("tBody").innerHTML += cartEv;
}
displayAllEvents();

// ============= Show Event Place Location  ===============================================================================================================================================================
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

// ============= Book Button & Check If User is LoggedIN  ===============================================================================================================================================================
function bookEvent(i) {
  let userLoggedIn = localStorage.getItem("userLoggedIn");
  let adminLoggedIn = localStorage.getItem("adminLoggedIn");
  let superAdminLoggedIn = localStorage.getItem("superAdminLoggedIn");

  if (userLoggedIn === "true") {
    localStorage.setItem("eventindex", i);
    localStorage.setItem("selectedEvent", JSON.stringify(eventContainer[i])); // إضافة
    window.open("Booking.html");
  } else if (adminLoggedIn === "true" || superAdminLoggedIn === "true") {
    alert("You must log in as a regular user to book an event.");
  } else {
   Swal.fire({
  title: "You Have To Login First",
  icon: "warning",
  iconColor: "red",
  color: "red",
  confirmButtonText: "OK",
  confirmButtonColor: "#33a1e0", 
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});

  }
}

// ============= Reset Every Thing False If The User Logged Out ===============================================================================================================================================================

let logout = document.getElementById("logout");

logout.addEventListener("click", function () {
  localStorage.setItem("userLoggedIn", "false");
  localStorage.setItem("adminLoggedIn", "false");
  localStorage.setItem("superAdminLoggedIn", "false");
  location.reload();
});

window.onload = function () {
  let userLoggedIn = localStorage.getItem("userLoggedIn");
  let admin = localStorage.getItem("adminLoggedIn");
  let superAdmin = localStorage.getItem("superAdminLoggedIn");
  if (userLoggedIn === "true") {
    document.getElementById("profileIcon").style.display = "block";
  } else if (admin === "true") {
    document.getElementById("nav").style.display = "none";
    document.getElementById("profileIcon").style.display = "block";
    document.getElementById("adminDashboardLink").style.display = "block";
    document.getElementById("About").style.display = "none";
    document.getElementById("Events").style.display = "none";
    document.getElementById("Speakers").style.display = "none";
    document.getElementById("Contact").style.display = "none";
  } else if (superAdmin === "true") {
    document.getElementById("nav").style.display = "none";
    document.getElementById("profileIcon").style.display = "block";
    document.getElementById("superAdminDashboardLink").style.display = "block";
    document.getElementById("About").style.display = "none";
    document.getElementById("Events").style.display = "none";
    document.getElementById("Speakers").style.display = "none";
    document.getElementById("Contact").style.display = "none";
  }
};
function events(){
    localStorage.setItem("eventData", JSON.stringify(eventContainer));
  eventContainer = JSON.parse(localStorage.getItem("eventData"));
  if (eventContainer.length==0 || eventContainer==null){
      let events = {
      name: "NTI Course",
      date: "2025-08-01",
      description: "A professional training program offered by the National Telecommunication Institute (NTI), focusing on advanced IT, networking, and software development skills. It equips learners with practical knowledge and hands-on experience to prepare them for the tech industry.",
      time: "11:00",
      location: "جامعه المنيا",
      capacity: "20",
      price: "0",
    }
      eventContainer.push(events);
           events = {
      name: "ITI Course",
      date: "2025-09-08",
      description: "A professional training program offered by the Information Technology Institute (ITI), focusing on advanced IT, networking, and software development skills. It equips learners with practical knowledge and hands-on experience to prepare them for the tech industry.",
      time: "11:30",
      location: "جامعه القاهره",
      capacity: "100",
      price: "500",
    }
      eventContainer.push(events);
      
    localStorage.setItem("eventData", JSON.stringify(eventContainer));
  }

};
events();
