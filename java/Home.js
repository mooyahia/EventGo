//==================================== Function To Show Page Content ===================================================

const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkBoxes);

function checkBoxes() {
  const triggerBottom = window.innerHeight * 0.8;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
checkBoxes();

//  =================================== Function to hidden Navbar When Scroll =============================================

const navbar = document.getElementById("nav");
addEventListener("scroll", () => {
  if (scrollY > 0) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }
});


//===================================================

let logout=document.getElementById("logout");

logout.addEventListener("click",function(){
      localStorage.setItem("userLoggedIn", "false");
      localStorage.setItem("adminLoggedIn", "false");
      localStorage.setItem("superAdminLoggedIn", "false");
      location.reload();
});

//==============================Function Control What Will Appear in The Navigation Bar===================
window.onload = function () {
  let userLoggedIn = localStorage.getItem("userLoggedIn");
  let admin = localStorage.getItem("adminLoggedIn");
  let superAdmin = localStorage.getItem("superAdminLoggedIn");
  if (userLoggedIn === "true") {
    document.getElementById("nav").style.display = "none";
    document.getElementById("profileIcon").style.display = "block";
  }
  else if(admin === "true"){
    document.getElementById("nav").style.display = "none";
    document.getElementById("profileIcon").style.display = "block";
    document.getElementById("adminDashboardLink").style.display = "block";
        document.getElementById("About").style.display = "none";
        document.getElementById("Events").style.display = "none";
        document.getElementById("Speakers").style.display = "none";
        document.getElementById("Contact").style.display = "none";
  }
  else if(superAdmin === "true" ){
        document.getElementById("nav").style.display = "none";
    document.getElementById("profileIcon").style.display = "block";
    document.getElementById("superAdminDashboardLink").style.display = "block";
        document.getElementById("About").style.display = "none";
        document.getElementById("Events").style.display = "none";
        document.getElementById("Speakers").style.display = "none";
        document.getElementById("Contact").style.display = "none";
  }
};




// ============= Local Storage Begin ===============================================================================================================================================================

// ==================== User information Container in Local Storage=================
var personalInformation = localStorage.getItem("personalInformation");
if (personalInformation === null || personalInformation === "undefined") {
  personalInformation = [];
} else {
  personalInformation = JSON.parse(personalInformation);
}

// ==================== Admin Container in Local Storage=================

var AdminContainer;
if (
  localStorage.getItem("AdminContainer") === null ||
  localStorage.getItem("AdminContainer") === "undefined"
) {
  AdminContainer = [];
} else {
  AdminContainer = JSON.parse(localStorage.getItem("AdminContainer"));
}

// ==================== Super Admin Container in Local Storage=================
var SuperAdminContainer;
if (
  localStorage.getItem("SuperAdminContainer") === null ||
  localStorage.getItem("SuperAdminContainer") === "undefined"
) {
  SuperAdminContainer = [];
} else {
  SuperAdminContainer = JSON.parse(localStorage.getItem("SuperAdminContainer"));
}

// ============= Local Storage End ===============================================================================================================================================================

// ==================== Set Testing  Accounts in Local Storage=================
function testing ()  {
  for (i = 0; i == personalInformation.length; i--) {
    var Informations = {
      firstName: "Event",
      middleName: "Go",
      lastName: "User",
      name: "Event Go User",
      email: "user@gmail.com",
      Password: "EventGo1#",
      BirthDate: "30-80-2025",
    };

    personalInformation.push(Informations);
    localStorage.setItem(
      "personalInformation",
      JSON.stringify(personalInformation)
    );
    if (i < 0) {
      break;
    }
  };

    for (i = 0; i == AdminContainer.length; i--) {
    var Informations = {
      firstName: "Event",
      middleName: "Go",
      lastName: "Admin",
      name: "Event Go Admin",
      email: "eventgo@gmail.com",
      Password: "EventGo1#",
      BirthDate: "30-80-2025",
    };

    AdminContainer.push(Informations);
    localStorage.setItem(
      "AdminContainer",
      JSON.stringify(AdminContainer)
    );
    if (i < 0) {
      break;
    }
  };

    for (i = 0; i == SuperAdminContainer.length; i--) {
    var Informations = {
      firstName: "Event",
      middleName: "Go",
      lastName: "Super Admin",
      name: "Event Go SuperAdmin",
      email: "eventgo1213@gmail.com",
      Password: "EventGo1#",
      BirthDate: "30-80-2025",
    };

    SuperAdminContainer.push(Informations);
    localStorage.setItem(
      "SuperAdminContainer",
      JSON.stringify(SuperAdminContainer)
    );
    if (i < 0) {
      break;
    }
  }
};

testing();
