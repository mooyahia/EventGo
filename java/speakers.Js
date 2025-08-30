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
// الملف الثاني (عرض البيانات فقط)
document.addEventListener("DOMContentLoaded", function () {
  let speakersData = JSON.parse(localStorage.getItem("speakerData") || "[]");

  const speakersContainer = document.getElementById("speakersContainer");

  function displaySpeakers() {
    speakersData.forEach((speaker) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4", "col-sm-6", "mb-4", "speaker-card");
      col.innerHTML = `
        <img src="${speaker.image}" class="team-img" alt="person">
        <div class="social-icons">
          <a href="#"><i class="bi bi-facebook"></i></a>
          <a href="#"><i class="bi bi-twitter"></i></a>
          <a href="#"><i class="bi bi-instagram"></i></a>
        </div>
        <h6 class="fw-bold">${speaker.name}</h6>
        <p class="text-muted mb-0">${speaker.role}</p>
      `;
      speakersContainer.appendChild(col);
    });
  }

  displaySpeakers();
});