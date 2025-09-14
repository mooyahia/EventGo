let sendVerficationCode = document.getElementById("sendVerficationCode");
let Email = document.getElementById("email");
let emailAlert = document.getElementById("emailAlert");


// ============= Local Storage Start ===============================================================================================================================================================

// ==================== Email Reset in Local Storage=================

var emailReset = localStorage.getItem("emailReset");

if (emailReset === null || emailReset === "undefined") {
  emailReset = "";
} else {
  emailReset = emailReset;
}

// ==================== Random Verfication Code in Local Storage=================
var randomNum = localStorage.getItem("randomNum");

if (randomNum === null || randomNum === "undefined") {
  randomNum = [];
} else {
  randomNum = JSON.parse(randomNum);
}

// ==================== Users Data in Local Storage=================

var personalinformation = localStorage.getItem("personalInformation");

if (personalinformation === null || personalinformation === "undefined") {
  personalInformation = [];
} else {
  personalInformation = JSON.parse(personalinformation);
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



// ============= Creating Verfication Code & Save It in Local Storage ===============================================================================================================================================================
function random() {
  var randomNumber = Math.ceil(Math.random() * 900000);
  randomNum[0] = randomNumber;
  localStorage.setItem("randomNum", JSON.stringify(randomNum));
  return randomNumber;
}




// ============= Sending Verfication Code To the Existing User ===============================================================================================================================================================
function sendMail() {

    let superAdminExists = SuperAdminContainer.some(function (mail) {
    return mail.email === Email.value;
  });

  let adminExists = AdminContainer.some(function (mail) {
    return mail.email === Email.value;
  });

  let userExists = personalInformation.some(function (mail) {
    return mail.email === Email.value;
  });

  if (!superAdminExists && !adminExists && !userExists) {
    emailAlert.style = "opacity: 1; transition: 0.3s;";
  } else {

  saveMail();
  var params = {
    name: Email.value,
    email: Email.value,
    subject: "Verfication Code",
    passcode: random(),
  };
  emailjs
    .send("service_k8sad1i", "template_r633mhv", params)
    .then(() => {
      window.open("checkVerificationCode.html", "_self");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
    });
  }
}


// ============= Save Interd Mail In Local Storage ===============================================================================================================================================================
function saveMail() {
  emailReset = Email.value;
  localStorage.setItem("emailReset", emailReset.trim().toLowerCase());
}

