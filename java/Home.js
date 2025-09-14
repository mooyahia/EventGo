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
