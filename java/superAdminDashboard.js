var AdminName = document.getElementById("AdminName");
var AdminEmail = document.getElementById("AdminEmail");
var add = document.getElementById("addEvent");
var update = document.getElementById("update");
var Delete = document.getElementById("delete");
var addAdmin = document.getElementById("addAdmin");
var adminType = document.getElementById("adminType");
var addAdminForm = document.getElementById("addAdminForm");
var superAdminList = document.getElementById("superAdminList");
var adminList = document.getElementById("adminList");
var userList = document.getElementById("userList");
var addAdminFormShow = document.getElementById("addAdminFormShow");
var superAdminListShow = document.getElementById("superAdminListShow");
var adminListShow = document.getElementById("adminListShow");
var userListShow = document.getElementById("userListShow");





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





// ============ Table List Display Begin ===============================================================================================================================================================

// ======= Add Admin Form =================================================
addAdminFormShow.addEventListener("click", function () {
  addAdminForm.style = "display:block;";
  superAdminList.style = "display:none;";
  adminList.style = "display:none;";
  userList.style = "display:none;";

  addAdminFormShow.classList.add("spec");
  superAdminListShow.classList.remove("spec");
  adminListShow.classList.remove("spec");
  userListShow.classList.remove("spec");
});  

// ======= Super Admin Table List =================================================
superAdminListShow.onclick = function () {
  addAdminForm.style = "display:none;";
  superAdminList.style = "display:block;";
  adminList.style = "display:none;";
  userList.style = "display:none;";

  addAdminFormShow.classList.remove("spec");
  superAdminListShow.classList.add("spec");
  adminListShow.classList.remove("spec");
  userListShow.classList.remove("spec");
};    


// ======= Admin Table List =================================================
adminListShow.addEventListener("click", function () {
  addAdminForm.style = "display:none;";
  superAdminList.style = "display:none;";
  adminList.style = "display:block;";
  userList.style = "display:none;";

  addAdminFormShow.classList.remove("spec");
  superAdminListShow.classList.remove("spec");
  adminListShow.classList.add("spec");
  userListShow.classList.remove("spec");
});  


// ======= User Table List =================================================
userListShow.addEventListener("click", function () {
  addAdminForm.style = "display:none;";
  superAdminList.style = "display:none;";
  adminList.style = "display:none;";
  userList.style = "display:block;";

  addAdminFormShow.classList.remove("spec");
  superAdminListShow.classList.remove("spec");
  adminListShow.classList.remove("spec");
  userListShow.classList.add("spec");
});  

// ============ Table List Display End ===============================================================================================================================================================











// ============= Check Selected Permitions Begin ===============================================================================================================================================================
function checkadd() {
  if (document.querySelector("#addEvent").checked == true) {
    return `Allowed`;
  } else {
    return `Not`;
  }
}

function checkupdate() {
  if (document.querySelector("#update").checked == true) {
    return `Allowed`;
  } else {
    return `Not`;
  }
}

function checkdelete() {
  if (document.querySelector("#delete").checked == true) {
    return `Allowed`;
  } else {
    return `Not`;
  }
}

function checkaddadmin() {
  if (document.querySelector("#addAdmin").checked == true) {
    return `Allowed`;
  } else {
    return `Not`;
  }
}
// ============= Check Selected Permitions End ===============================================================================================================================================================




// =========== Insert Data Into Arrays =================================================================================================================================================================

function Admins() {
  if (checkAdmin() === true) {
    if (adminType.value == "Admin") {
      moveToAdmin();
      counter();
      deleteAdminDetails();
      DisplayAdmin();
    } else {
      moveToAdmin();
      counter();
      deleteAdminDetails();
      DisplaySuperAdmin();
    }
    localStorage.setItem("AdminContainer", JSON.stringify(AdminContainer));
    localStorage.setItem(
      "SuperAdminContainer",
      JSON.stringify(SuperAdminContainer)
    );
  } else {
    confirm(`You Have To add Permitions`);
  }
}
// ============================================================================================================================================================================



// ======== Delete Admins Data From Form Begin ====================================================================================================================================================================

function deleteAdminDetails() {
  AdminName.value = "";
  AdminEmail.value = "";
  document.querySelector("#addEvent").checked = false;
  document.querySelector("#update").checked = false;
  document.querySelector("#delete").checked = false;
  document.querySelector("#addAdmin").checked = false;
}
// ======== Delete Admins Data From Form End ====================================================================================================================================================================





// ======== Display Super Admin In Table ====================================================================================================================================================================

function DisplaySuperAdmin() {
  let superAdminCart = ``;
  for (let i = 0; i < SuperAdminContainer.length; i++) {
    superAdminCart += `        <tr>
            <td>${SuperAdminContainer[i].name}</td>
            <td>${SuperAdminContainer[i].email}</td>
            <td>${SuperAdminContainer[i].add}</td>
            <td>${SuperAdminContainer[i].update}</td>
            <td>${SuperAdminContainer[i].Delete}</td>
            <td>${SuperAdminContainer[i].addAdmin}</td>
            <td>${SuperAdminContainer[i].adminType}</td>
            <td><button class="btn btn-outline-danger" onclick="deleteSuperAdmin(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
  }
  document.getElementById("tBodySuperAdmin").innerHTML = superAdminCart;
}
// ============================================================================================================================================================================







// ========== Display Admin In Table ==================================================================================================================================================================
function DisplayAdmin() {
  let adminCart = ``;
  for (let i = 0; i < AdminContainer.length; i++) {
    adminCart += `        <tr>
            <td>${AdminContainer[i].name}</td>
            <td>${AdminContainer[i].email}</td>
            <td>${AdminContainer[i].add}</td>
            <td>${AdminContainer[i].update}</td>
            <td>${AdminContainer[i].Delete}</td>
            <td>${AdminContainer[i].addAdmin}</td>
            <td>${AdminContainer[i].adminType}</td>
            <td><button class="btn btn-outline-danger" onclick="deleteAdmin(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
  }
  document.getElementById("tBodyAdmin").innerHTML = adminCart;
}
// ============================================================================================================================================================================





// ============ Display Users In Table================================================================================================================================================================
function DisplayUser() {
  let userCart = ``;
  for (let i = 0; i < personalInformation.length; i++) {
    userCart += `        <tr>
    <td>${i+1}</td>
            <td>${personalInformation[i].firstName} ${personalInformation[i].middleName}</td>
            <td>${personalInformation[i].email}</td>
            <td><button class="btn btn-outline-danger" onclick="deleteUser(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
  }
  document.getElementById("tBodyUser").innerHTML = userCart;
}
// ============================================================================================================================================================================






// ============= Check That Inputs Are Not Empty===============================================================================================================================================================

function checkAdmin() {
  if (
    AdminName.value != "" &&
    AdminEmail.value != "" &&
    (document.querySelector("#addEvent").checked == true ||
      document.querySelector("#update").checked == true ||
      document.querySelector("#delete").checked == true ||
      document.querySelector("#addAdmin").checked == true)
  ) {
    return true;
  } else {
    return false;
  }
}
// ============================================================================================================================================================================


// ========= Move User Account To Admin Container ===================================================================================================================================================================
function moveToAdmin() {
  let index = personalInformation.findIndex(function (mail) {
    return (
      mail.email.toLowerCase().trim() === AdminEmail.value.toLowerCase().trim()
    );
  });
  if (index !== -1) {
    let adminInfo = {
      name: `${personalInformation[index].firstName} ${personalInformation[index].middleName}`,
      email: personalInformation[index].email,
      Password: personalInformation[index].Password,
      BirthDate: personalInformation[index].BirthDate,
      add: checkadd(),
      update: checkupdate(),
      Delete: checkdelete(),
      addAdmin: checkaddadmin(),
      adminType: adminType.value,
    };
    personalInformation.splice(index, 1);
    localStorage.setItem(
      "personalInformation",
      JSON.stringify(personalInformation)
    );
    if (adminType.value == "Admin") {
      AdminContainer.push(adminInfo);
      localStorage.setItem("AdminContainer", JSON.stringify(AdminContainer));
    } else {
      SuperAdminContainer.push(adminInfo);
      localStorage.setItem(
        "SuperAdminContainer",
        JSON.stringify(SuperAdminContainer)
      );
    }
  } else {
    console.log("User not found with email:", AdminEmail.value);
  }
}
// ============================================================================================================================================================================




// ============= User & Admin & Super Admin Counter  ===============================================================================================================================================================
var adminCount = AdminContainer.length;
var superAdminCount = SuperAdminContainer.length;
var userCount = personalInformation.length;

function counter() {
  document.getElementById("superAdminCount").innerHTML = `${superAdminCount}`;
  document.getElementById("adminCount").innerHTML = `${adminCount}`;
  document.getElementById("userCount").innerHTML = `${userCount}`;
}

window.onload = function () {
  DisplayAdmin();
  DisplaySuperAdmin();
  DisplayUser()
  counter();
};






// ============= Delete User & Admin & Super Admin  ===============================================================================================================================================================
function deleteUser(index) {
  var Confirmation = confirm("Are You sure you want to Delete ? ");
  if (Confirmation) {
    personalInformation.splice(index, 1);
    localStorage.setItem("personalInformation", JSON.stringify(personalInformation));
    DisplayUser();
  } else {
    confirm("Deletion Canceld");
  }
}

function deleteAdmin(index) {
  var Confirmation = confirm("Are You sure you want to Delete ? ");
  if (Confirmation) {
    AdminContainer.splice(index, 1);
    localStorage.setItem("AdminContainer", JSON.stringify(AdminContainer));
    DisplayAdmin();
  } else {
        confirm("Deletion Canceld");
  }
}

function deleteSuperAdmin(index) {
  var Confirmation = confirm("Are You sure you want to Delete ? ");
  if (Confirmation) {
    SuperAdminContainer.splice(index, 1);
    localStorage.setItem("SuperAdminContainer", JSON.stringify(SuperAdminContainer));
    DisplaySuperAdmin();
  } else {
        confirm("Deletion Canceld");
  }
}

