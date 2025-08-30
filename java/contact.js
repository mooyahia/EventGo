// document.addEventListener("DOMContentLoaded", function () {
//   const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
//   const mainNav = document.querySelector(".main-nav");

//    mobileMenuBtn.addEventListener("click", function () {
//     mainNav.style.display = mainNav.style.display === "flex" ? "none" : "flex";
//   });

//      const navLinks = document.querySelectorAll(".main-nav a");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", function () {
//       if (window.innerWidth <= 992) {
//         mainNav.style.display = "none";
//       }
//     });
//   });


//   const contactForm = document.getElementById("contactForm");
//   if (contactForm) {
//     contactForm.addEventListener("submit", function (e) {
//       e.preventDefault();

//       const name = document.getElementById("name").value;
//       const email = document.getElementById("email").value;
//       const subject = document.getElementById("subject").value;
//       const message = document.getElementById("message").value;

//       let successMsg = document.getElementById("successMsg");
//       if (!successMsg) {
//         successMsg = document.createElement("p");
//         successMsg.id = "successMsg";
//         successMsg.style.color = "green";
//         successMsg.style.marginTop = "10px";
//         contactForm.appendChild(successMsg);
//       }
//       successMsg.textContent = `Thank you ${name}, your message has been received successfully! We will contact you soon at ${email}.`;

//       contactForm.reset();
//     });
//   }


//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       e.preventDefault();

//       const targetId = this.getAttribute("href");
//       if (targetId === "#") return;

//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         window.scrollTo({
//           top: targetElement.offsetTop - 80,
//           behavior: "smooth",
//         });
//       }
//     });
//   });

//   const header = document.querySelector("header");
//   if (header) {
//     window.addEventListener("scroll", function () {
//       if (window.scrollY > 100) {
//         header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
//       } else {
//         header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
//       }
//     });
//   }


//   const formGroups = document.querySelectorAll(".form-group");
//   formGroups.forEach((group) => {
//     const input = group.querySelector("input, textarea");
//     const label = group.querySelector("label");

//     if (input && label && input.value.trim() !== "") {
//       label.style.top = "-10px";
//       label.style.fontSize = "12px";
//       label.style.color = "#6C60FF";
//     }
// });


// let logout = document.getElementById("logout");

// logout.addEventListener("click", function () {
//   localStorage.setItem("userLoggedIn", "false");
//   localStorage.setItem("adminLoggedIn", "false");
//   localStorage.setItem("superAdminLoggedIn", "false");
//   location.reload();
// }});

// window.onload = function () {
//   let userLoggedIn = localStorage.getItem("userLoggedIn");
//   let admin = localStorage.getItem("adminLoggedIn");
//   let superAdmin = localStorage.getItem("superAdminLoggedIn");
//   if (userLoggedIn === "true") {
//     document.getElementById("profileIcon").style.display = "block";
//   } else if (admin === "true") {
//     document.getElementById("nav").style.display = "none";
//     document.getElementById("profileIcon").style.display = "block";
//     document.getElementById("adminDashboardLink").style.display = "block";
//     document.getElementById("About").style.display = "none";
//     document.getElementById("Events").style.display = "none";
//     document.getElementById("Speakers").style.display = "none";
//     document.getElementById("Contact").style.display = "none";
//   } else if (superAdmin === "true") {
//     document.getElementById("nav").style.display = "none";
//     document.getElementById("profileIcon").style.display = "block";
//     document.getElementById("superAdminDashboardLink").style.display = "block";
//     document.getElementById("About").style.display = "none";
//     document.getElementById("Events").style.display = "none";
//     document.getElementById("Speakers").style.display = "none";
//     document.getElementById("Contact").style.display = "none";
//   }
// };

//===========================================================================
// document.addEventListener("DOMContentLoaded", function () {
//   // Toggle mobile menu
//   const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
//   const mainNav = document.querySelector(".main-nav");
//   if (mobileMenuBtn && mainNav) {
//     mobileMenuBtn.addEventListener("click", function () {
//       mainNav.style.display = mainNav.style.display === "flex" ? "none" : "flex";
//     });

//     const navLinks = document.querySelectorAll(".main-nav a");
//     navLinks.forEach((link) => {
//       link.addEventListener("click", function () {
//         if (window.innerWidth <= 992) {
//           mainNav.style.display = "none";
//         }
//       });
//     });
//   }

//   // Contact form
//   const contactForm = document.getElementById("contactForm");
//   if (contactForm) {
//     contactForm.addEventListener("submit", function (e) {
//       e.preventDefault();
//       const nameEl = document.getElementById("name");
//       const emailEl = document.getElementById("email");
//       const subjectEl = document.getElementById("subject");
//       const messageEl = document.getElementById("message");

//       const name = nameEl ? nameEl.value : "";
//       const email = emailEl ? emailEl.value : "";
//       const subject = subjectEl ? subjectEl.value : "";
//       const message = messageEl ? messageEl.value : "";

//       let successMsg = document.getElementById("successMsg");
//       if (!successMsg) {
          
//           successMsg = document.createElement("p");
//           successMsg.id = "successMsg";
//           successMsg.style.color = "green";
//           successMsg.style.marginTop = "10px";
//           contactForm.appendChild(successMsg);
//         }
//         successMsg.textContent = `Thank you ${name}, your message has been received successfully! We will contact you soon at ${email}.`;
  
//         contactForm.reset();
//       });
//     }
  
//     // Smooth scroll
//     document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//       anchor.addEventListener("click", function (e) {
//         e.preventDefault();
//         const targetId = this.getAttribute("href");
//         if (targetId === "#") return;
//         const targetElement = document.querySelector(targetId);
//         if (targetElement) {
//           window.scrollTo({ top: targetElement.offsetTop - 80, behavior: "smooth" });
//         }
//       });
//     });
  
//     // Header shadow on scroll
//     const header = document.querySelector("header");
//     if (header) {
//       window.addEventListener("scroll", function () {
//         if (window.scrollY > 100) {
//           header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
//         } else {
//           header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
//         }
//       });
//     }
  
//     // Floating labels
//     const formGroups = document.querySelectorAll(".form-group");
//     formGroups.forEach((group) => {
//       const input = group.querySelector("input, textarea");
//       const label = group.querySelector("label");
//       if (input && label && input.value.trim() !== "") {
//         label.style.top = "-10px";
//         label.style.fontSize = "12px";
//         label.style.color = "#6C60FF";
//       }
//     });
  
//     // Logout
//     const logout = document.getElementById("logout");
//     if (logout) {
//       logout.addEventListener("click", function () {
//         localStorage.setItem("userLoggedIn", "false");
//         localStorage.setItem("adminLoggedIn", "false");
//         localStorage.setItem("superAdminLoggedIn", "false");
//         location.reload();
//       });
//     }
  
//     // Check login state
//     const userLoggedIn = localStorage.getItem("userLoggedIn");
//     const admin = localStorage.getItem("adminLoggedIn");
//     const superAdmin = localStorage.getItem("superAdminLoggedIn");
  
//     if (userLoggedIn === "true") {
//       const el = document.getElementById("profileIcon");
//       if (el) el.style.display = "block";
//     } else if (admin === "true") {
//       document.getElementById("nav")?.style.setProperty("display", "none");
//       document.getElementById("profileIcon")?.style.setProperty("display", "block");
//       document.getElementById("adminDashboardLink")?.style.setProperty("display", "block");
//       ["About", "Events", "Speakers", "Contact"].forEach((id) => {
//         document.getElementById(id)?.style.setProperty("display", "none");
//       });
//     } else if (superAdmin === "true") {
//       document.getElementById("nav")?.style.setProperty("display", "none");
//       document.getElementById("profileIcon")?.style.setProperty("display", "block");
//       document.getElementById("superAdminDashboardLink")?.style.setProperty("display", "block");
//       ["About", "Events", "Speakers", "Contact"].forEach((id) => {
//         document.getElementById(id)?.style.setProperty("display", "none");
//       });
//     }
//   });



(function () {
  const form = document.getElementById("contactForm");
  if (!form) return console.warn("contactForm not found");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("❌ من فضلك املأ كل البيانات");
      return;
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    const KEY = "contactMessages";
    const messages = JSON.parse(localStorage.getItem(KEY) || "[]");
    messages.push(newMessage);
    localStorage.setItem(KEY, JSON.stringify(messages));

    form.reset();
    alert("✅ تم حفظ رسالتك بنجاح");
    console.log("Saved messages:", JSON.parse(localStorage.getItem(KEY)));
  });
})();

const logout = document.getElementById("logout");
if (logout) {
  logout.addEventListener("click", function () {
    localStorage.setItem("userLoggedIn", "false");
    localStorage.setItem("adminLoggedIn", "false");
    localStorage.setItem("superAdminLoggedIn", "false");
    location.reload();
  });
}

let userLoggedIn = localStorage.getItem("userLoggedIn");
let admin = localStorage.getItem("adminLoggedIn");
let superAdmin = localStorage.getItem("superAdminLoggedIn");

if (userLoggedIn === "true") {
  document.getElementById("profileIcon")?.style.setProperty("display", "block");
} else if (admin === "true") {
  document.getElementById("nav")?.style.setProperty("display", "none");
  document.getElementById("profileIcon")?.style.setProperty("display", "block");
  document.getElementById("adminDashboardLink")?.style.setProperty("display", "block");
  ["About", "Events", "Speakers", "Contact"].forEach(id => {
    document.getElementById(id)?.style.setProperty("display", "none");
  });
} else if (superAdmin === "true") {
  document.getElementById("nav")?.style.setProperty("display", "none");
  document.getElementById("profileIcon")?.style.setProperty("display", "block");
  document.getElementById("superAdminDashboardLink")?.style.setProperty("display", "block");
  ["About", "Events", "Speakers", "Contact"].forEach(id => {
    document.getElementById(id)?.style.setProperty("display", "none");
  });
}
