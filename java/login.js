let Password = document.getElementById("password");
let Login = document.getElementById("login");
let Email = document.getElementById("email");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");
let nav = document.querySelector(".nav");

// ============= Local Storage Start ===============================================================================================================================================================

// ==================== Users Data in Local Storage=================
let personalInformation = localStorage.getItem("personalInformation");
if (!personalInformation || personalInformation === "undefined") {
  personalInformation = [];
} else {
  personalInformation = JSON.parse(personalInformation);
}

// ==================== Admin Container in Local Storage=================
let AdminContainer = localStorage.getItem("AdminContainer");
if (!AdminContainer || AdminContainer === "undefined") {
  AdminContainer = [];
} else {
  AdminContainer = JSON.parse(AdminContainer);
}

// ==================== Super Admin Container in Local Storage=================
let SuperAdminContainer = localStorage.getItem("SuperAdminContainer");
if (!SuperAdminContainer || SuperAdminContainer === "undefined") {
  SuperAdminContainer = [];
} else {
  SuperAdminContainer = JSON.parse(SuperAdminContainer);
}

// ============= Local Storage End ===============================================================================================================================================================



// ============= Check If Email Exists or Not  ===============================================================================================================================================================
Email.addEventListener("keyup", function () {
  let superAdminExists = SuperAdminContainer.some(function (user) {
    return user.email === Email.value;
  });
  
  let adminExists = AdminContainer.some(function (user) {
    return user.email === Email.value;
  });
  
  let userExists = personalInformation.some(function (user) {
    return user.email === Email.value;
  });
  
  if (!superAdminExists && !adminExists && !userExists) {
    emailAlert.style.opacity = 1;
    emailAlert.style.transition = "0.3s";
  } else {
    emailAlert.style.opacity = 0;
  }
});





// ============= Show Password Icon  ===============================================================================================================================================================
function show() {
  if (Password.type === "password") {
    Password.type = "text";
    document.getElementById("eyeslash-icon").style.visibility = "hidden";
    document.getElementById("eye-icon").style.visibility = "visible";
  } else {
    Password.type = "password";
    document.getElementById("eye-icon").style.visibility = "hidden";
    document.getElementById("eyeslash-icon").style.visibility = "visible";
  }
}



// ============= Search User Info To Login  ===============================================================================================================================================================
Login.addEventListener("click", function (e) {
  e.preventDefault(); 


  let superAdminIndex = SuperAdminContainer.findIndex(function (user) {
    return user.email === Email.value;
  });

  let adminIndex = AdminContainer.findIndex(function (user) {
    return user.email === Email.value;
  });

  let userIndex = personalInformation.findIndex(function (user) {
    return user.email === Email.value;
  });


  if (
    superAdminIndex !== -1 &&
    SuperAdminContainer[superAdminIndex].Password === Password.value
  ) {
    localStorage.setItem("userIndex", superAdminIndex);
    localStorage.setItem("type", "superAdmin");
    localStorage.setItem("superAdminLoggedIn", "true");
    window.open("index.html");
  } else if (
    adminIndex !== -1 &&
    AdminContainer[adminIndex].Password === Password.value
  ) {
    localStorage.setItem("userIndex", adminIndex);
    localStorage.setItem("type", "admin");
    localStorage.setItem("adminLoggedIn", "true");
    window.open("index.html");
  } else if (
    userIndex !== -1 &&
    personalInformation[userIndex].Password === Password.value
  ) {
    
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userIndex", userIndex);
    localStorage.setItem("type", "user");
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(personalInformation[userIndex])
    );
    window.open("index.html");
  } else {
    passwordAlert.style.opacity = 1;
    passwordAlert.style.transition = "0.3s";
  }
});


