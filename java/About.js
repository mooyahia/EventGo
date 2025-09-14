

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

