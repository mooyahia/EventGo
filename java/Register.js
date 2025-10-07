let fName = document.getElementById("fName");
let mName = document.getElementById("mName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let Password = document.getElementById("password");
let passwordConfirmation = document.getElementById("passwordConfirmation");
let birthDate = document.getElementById("birthDate");
let Label = document.getElementById("passlabel");
var personalInformation;
let xmarkCapital = document.getElementById("xmarkCapital");
let xmarkSmall = document.getElementById("xmarkSmall");
let xmarkNumbers = document.getElementById("xmarkNumbers");
let xmarkSymbol = document.getElementById("xmarkSymbol");
let xmarkLength = document.getElementById("xmarkLength");
let emailAlert = document.getElementById("emailAlert");
let passAlert = document.getElementById("passAlert");
let passConfirmAlert = document.getElementById("passConfirmAlert");



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




// ============= Check If Email Exists ===============================================================================================================================================================
email.addEventListener("keyup", function () {
  let superAdminExists = SuperAdminContainer.some(function (mail) {
    return mail.email === email.value;
  });

  let adminExists = AdminContainer.some(function (mail) {
    return mail.email === email.value;
  });

  let userExists = personalInformation.some(function (mail) {
    return mail.email === email.value;
  });

  if (
    superAdminExists === true ||
    adminExists === true ||
    userExists === true
  ) {
    emailAlert.style = "display: block;";
  } else {
    emailAlert.style = "display: none;";
  }
});


// ============= Show Password Icon Setup ===============================================================================================================================================================
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

// ==== Check Password Matching Start ============================================================================================================================================

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
    fName.value != "" &&
    mName.value != "" &&
    lName.value != "" &&
    email.value != "" &&
    Password.value != "" &&
    passwordConfirmation.value != "" &&
    birthDate.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}
// ==== Check if Inputs Are Not empty End ============================================================================================================================================



// ==== Add Registeration Information To Array Start ============================================================================================================================================
function addInformation() {
  if (checkInput() == true) {
    var Informations = {
      firstName: fName.value,
      middleName: mName.value,
      lastName: lName.value,
      name: fName.value + " " + mName.value + " " + lName.value,
      email: email.value,
      Password: Password.value,
      BirthDate: birthDate.value,
    };

    personalInformation.push(Informations);

    localStorage.setItem(
      "personalInformation",
      JSON.stringify(personalInformation)
    );

    localStorage.setItem("userIndex", personalInformation.length - 1);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(personalInformation[personalInformation.length - 1])
    );

    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(Informations));

    window.open("login.html");

    clearInfo();
  } else {
    alert("You Must Enter Data");
  }
}

// ==== Add Registeration Information To Array End ============================================================================================================================================



// ==== Clear Registeration Information From Form After Register Start ============================================================================================================================================
function clearInfo() {
  fName.value = "";
  mName.value = "";
  lName.value = "";
  email.value = "";
  Password.value = "";
  passwordConfirmation.value = "";
  birthDate.value = "";
}
// ==== Clear Registeration Information From Form After Register End ============================================================================================================================================


