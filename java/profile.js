let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let profileImage = document.getElementById("profileImage");
let imageInput = document.getElementById("imageInput");
let editSaveBtn = document.getElementById("editSaveBtn");
let logoutBtn = document.getElementById("logoutBtn");

var Type = localStorage.getItem("type");
var allUsers;
var currentIndex;
if (Type == "superAdmin") {
  allUsers = JSON.parse(localStorage.getItem("SuperAdminContainer")) || [];
  currentIndex = Number(localStorage.getItem("userIndex"));
} else if (Type == "admin") {
  allUsers = JSON.parse(localStorage.getItem("AdminContainer")) || [];
  currentIndex = Number(localStorage.getItem("userIndex"));
} else if (Type == "user") {
  allUsers = JSON.parse(localStorage.getItem("personalInformation")) || [];
  currentIndex = Number(localStorage.getItem("userIndex"));
}

// تحميل بيانات اليوزر في الانبتس
if (currentIndex !== null && allUsers[currentIndex]) {
  let currentUser = allUsers[currentIndex];
  nameInput.value = currentUser.name || "";
  emailInput.value = currentUser.email || "";
  passwordInput.value = currentUser.Password || "";
  profileImage.src = currentUser.image || "images/827-removebg-preview.png";
}

// اقفال الانبتس
setInputsDisabled(true);

// دالة قفل/فتح
function setInputsDisabled(disabled) {
  nameInput.disabled = disabled;
  emailInput.disabled = disabled;
  passwordInput.disabled = disabled;
  imageInput.disabled = disabled;
}

// Update/Save
editSaveBtn.addEventListener("click", function () {
  if (editSaveBtn.textContent.trim() === "Update") {
    setInputsDisabled(false);
    editSaveBtn.textContent = "Save";
  } else {
    saveUserData();
  }
});

// حفظ التعديلات
function saveUserData() {
  if (currentIndex !== null && allUsers[currentIndex]) {
    allUsers[currentIndex] = {
      name: nameInput.value,
      email: emailInput.value,
      Password: passwordInput.value,
      image: profileImage.src,
    };

    if (Type == "superAdmin") {
      localStorage.setItem("SuperAdminContainer", JSON.stringify(allUsers));

} else if (Type == "admin") {
  localStorage.setItem("AdminContainer", JSON.stringify(allUsers));

} else if (Type == "user") {
  localStorage.setItem("personalInformation", JSON.stringify(allUsers));

}

    setInputsDisabled(true);
    editSaveBtn.textContent = "Update";
    alert("✅ Data Saved Successfully!");
  }
}

// تغيير الصورة
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// تسجيل خروج
logoutBtn.addEventListener("click", function () {
  localStorage.setItem("superAdminLoggedIn", "false");
localStorage.setItem("adminLoggedIn", "false");
  localStorage.removeItem("userIndex");
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});



let logout=document.getElementById("logout");

logout.addEventListener("click",function(){
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

  }
  else if(admin === "true"){
    document.getElementById("profileIcon").style.display = "block";
    document.getElementById("adminDashboardLink").style.display = "block";
        document.getElementById("About").style.display = "none";
        document.getElementById("Events").style.display = "none";
        document.getElementById("Speakers").style.display = "none";
        document.getElementById("Contact").style.display = "none";
  }
  else if(superAdmin === "true" ){
    document.getElementById("profileIcon").style.display = "block";
    document.getElementById("superAdminDashboardLink").style.display = "block";
        document.getElementById("About").style.display = "none";
        document.getElementById("Events").style.display = "none";
        document.getElementById("Speakers").style.display = "none";
        document.getElementById("Contact").style.display = "none";
  }
};

// =================== عرض الحجوزات الخاصة باليوزر ===================
// =================== عرض الحجوزات الخاصة باليوزر ===================
let reservationsContainer = document.getElementById("reservations");

function loadReservations() {
  if (!allUsers[currentIndex]) return;

  let currentUser = allUsers[currentIndex];
  let allReservations = JSON.parse(localStorage.getItem("reservations")) || {};
  let userReservations = allReservations[currentUser.email] || [];

  if (userReservations.length === 0) {
    reservationsContainer.innerHTML = "<p>No reservations yet.</p>";
  } else {
    reservationsContainer.innerHTML = "";
    userReservations.forEach((res) => {
      let div = document.createElement("div");
      div.classList.add("reservation-item");
      div.innerHTML = `
        <p><strong>Event:</strong> ${res.event?.name || "Unnamed Event"}</p>
        <p><strong>Date:</strong> ${res.date}</p>
        <p><strong>Tickets:</strong> ${res.tickets}</p>
        <hr/>
      `;
      reservationsContainer.appendChild(div);
    });
  }
}

loadReservations();