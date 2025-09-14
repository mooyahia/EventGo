let verficationCode = document.getElementById("verficationCode");
let Password = document.getElementById("password");
let passwordConfirmation = document.getElementById("passwordConfirmation");
let Label = document.getElementById("passlabel");
var personalInformation;
let xmarkCapital = document.getElementById("xmarkCapital");
let xmarkSmall = document.getElementById("xmarkSmall");
let xmarkNumbers = document.getElementById("xmarkNumbers");
let xmarkSymbol = document.getElementById("xmarkSymbol");
let xmarkLength = document.getElementById("xmarkLength");
let verficationCodeAlert = document.getElementById("verficationCodeAlert");
let passAlert = document.getElementById("passAlert");
let passConfirmAlert = document.getElementById("passConfirmAlert");
let updatePassword=document.getElementById("updatePassword")


// ============= Local Storage Begin ===============================================================================================================================================================

// ==================== User Reset Email in Local Storage=================
var emailReset = localStorage.getItem("emailReset");
if (emailReset === null) {
  emailReset = "";
}

// ==================== User Confirmation Code in Local Storage=================
var randomNum = localStorage.getItem("randomNum");

if (randomNum === null || randomNum === "undefined") {
  randomNum = [];
} else {
  randomNum = JSON.parse(randomNum);
}

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



// ============= Show Password Icon  ===============================================================================================================================================================
function show() {
  if (Password.type == "password") {
    Password.type = "text";
    document.getElementById("eyeslash-icon").style = "visibility: hidden;";
    document.getElementById("eye-icon").style =
      "visibility: visible; color: #F6F6F6;";
    Label.style = "top: -1px;;";
  } else {
    Password.type = "password";
    document.getElementById("eye-icon").style = "visibility: hidden;";
    document.getElementById("eyeslash-icon").style = "visibility: visible;";
    Label.style = "top: -1px;;";
  }
}


// ==== Password Validation Start ============================================================================================================================================
Password.addEventListener("keyup", function () {
  var capital = /[A-Z]/;
  var small = /[a-z]/;
  var numbers = /[0-9]/;
  var symbols = /\W/;
  passAlert.style = "display: block;   opacity: 1;";
  if (capital.test(Password.value) != true) {
    xmarkCapital.innerHTML = `<span ><i class="fa-solid fa-xmark"></i></span><span>One Capital Letter</span>`;
    xmarkCapital.style.color = "red";
  } else {
    xmarkCapital.innerHTML = `<span ><i class="fa-solid fa-check"></i></span><span>One Capital Letter</span>`;
    xmarkCapital.style.color = "green";
  }
  // ================================================
  if (small.test(Password.value) != true) {
    xmarkSmall.innerHTML = `<span ><i class="fa-solid fa-xmark"></i></span><span>One Small Letter</span>`;
    xmarkSmall.style.color = "red";
  } else {
    xmarkSmall.innerHTML = `<span ><i class="fa-solid fa-check"></i></span><span>One Small Letter</span>`;
    xmarkSmall.style.color = "green";
  }
  // ================================================

  if (numbers.test(Password.value) != true) {
    xmarkNumbers.innerHTML = `<span ><i class="fa-solid fa-xmark"></i></span><span>One Number</span>`;
    xmarkNumbers.style.color = "red";
  } else {
    xmarkNumbers.innerHTML = `<span ><i class="fa-solid fa-check"></i></span><span>One Number</span>`;
    xmarkNumbers.style.color = "green";
  }
  // ================================================

  if (symbols.test(Password.value) != true) {
    xmarkSymbol.innerHTML = `<span ><i class="fa-solid fa-xmark"></i></span><span>One Symbol</span>`;
    xmarkSymbol.style.color = "red";
  } else {
    xmarkSymbol.innerHTML = `<span ><i class="fa-solid fa-check"></i></span><span>One Symbol</span>`;
    xmarkSymbol.style.color = "green";
  }
  // ================================================
  if (Password.value.length < 8) {
    xmarkLength.innerHTML = `<span ><i class="fa-solid fa-xmark"></i></span><span>8 digits length</span>`;
    xmarkLength.style.color = "red";
  } else {
    xmarkLength.innerHTML = `<span ><i class="fa-solid fa-check"></i></span><span>8 digits length</span>`;
    xmarkLength.style.color = "green";
  }
  // ================================================

  Password.addEventListener("blur", function () {
    if (
      capital.test(Password.value) == true &&
      small.test(Password.value) == true &&
      numbers.test(Password.value) == true &&
      symbols.test(Password.value) == true &&
      Password.value.length >= 8
    ) {
      passAlert.style = "display: none;";
    }
  });
});

// ==== Password Validation End ============================================================================================================================================




// ==== Check Passwords Matching Start ============================================================================================================================================

passwordConfirmation.addEventListener(
  "input",

  function () {
    if (Password.value != passwordConfirmation.value) {
      passConfirmAlert.style = "display: block;";
    } else {
      passConfirmAlert.innerHTML = `<span><i class="fa-solid fa-check"></i></span><span>Passwords Are Matches</span>`;
      passConfirmAlert.style = "display: block; color:green;";
    }
  }
);

passwordConfirmation.addEventListener("blur", function () {
  passConfirmAlert.style = "display: none;";
});
// ==== Check Password Matching End ============================================================================================================================================





// ==== Check if Inputs Are Not empty Start ============================================================================================================================================
function checkInput() {
  if (
    verficationCode.value != "" &&
    password.value != "" &&
    passwordConfirmation.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}
// ==== Check if Inputs Are Not empty End ============================================================================================================================================




// ==== Update Password In Local Storage ============================================================================================================================================
updatePassword.addEventListener("click", function () {
  let superAdminIndex = SuperAdminContainer.findIndex(function (mail) {
    return mail.email === emailReset.trim().toLowerCase();
  });

  let adminIndex = AdminContainer.findIndex(function (mail) {
    return mail.email === emailReset.trim().toLowerCase();
  });

  let userIndex = personalInformation.findIndex(function (mail) {
    return mail.email === emailReset.trim().toLowerCase();
  });

  if (superAdminIndex !== -1 && verficationCode.value === String(randomNum[0])) {
    SuperAdminContainer[superAdminIndex].Password = Password.value;
  localStorage.setItem("SuperAdminContainer", JSON.stringify(SuperAdminContainer));
    resetData();
    window.open("login.html");
  } else if (adminIndex !== -1 && verficationCode.value === String(randomNum[0])) {
    AdminContainer[adminIndex].Password = Password.value;
  localStorage.setItem("AdminContainer", JSON.stringify(AdminContainer));
    resetData();
    window.open("login.html");
  } else if (userIndex !== -1 && verficationCode.value === String(randomNum[0])) {
    personalInformation[userIndex].Password = Password.value;
  localStorage.setItem("personalInformation", JSON.stringify(personalInformation));
    resetData();
    window.open("login.html");

  } else {
    alert("Verfication code is not true")
  }

})


// ==== Reset Stored Info In Local Storage ============================================================================================================================================
function resetData() {
  randomNum = [];
  emailReset = "";
  localStorage.setItem("randomNum", JSON.stringify(randomNum));
  localStorage.setItem("emailReset", JSON.stringify(emailReset));
}



