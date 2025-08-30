/* =========================
  Initialize EmailJS
========================= */
(function () {
  emailjs.init({
    publicKey: "Po1OWPpZxoy_brtXq", // 🔑 Your Email JS Public Key
  });
})();

/* =========================
  Load Event Data & Current Event Index
========================= */
var eventContainer = localStorage.getItem("eventData")
  ? JSON.parse(localStorage.getItem("eventData"))
  : [];

var EventIndex = Number(localStorage.getItem("eventindex")) || 0;

// Initialize booked property if not exists
if (!eventContainer[EventIndex].hasOwnProperty("booked")) {
  eventContainer[EventIndex].booked = 0;
  localStorage.setItem("eventData", JSON.stringify(eventContainer));
}

let MAX_BOOKINGS = Number(eventContainer[EventIndex].capacity);
let currentBookings = Number(eventContainer[EventIndex].booked);

/* =========================
  DOM Elements
========================= */
const alertBox = document.getElementById("alertBox");
const seatsLeftEl = document.getElementById("seatsLeft");
const form = document.getElementById("bookingForm");
const sendBtn = document.getElementById("sendCodeBtn");
const bookBtn = document.getElementById("bookBtn");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("username");
const cardInput = document.getElementById("card");
const expInput = document.getElementById("expDate");
const ccpInput = document.getElementById("ccp");
const otpInput = document.getElementById("activationInput");
const logout = document.getElementById("logout");

let generatedCode = ""; // Stores the generated activation code

/* =========================
  Helpers
========================= */
function showAlert(msg, type = "info") {
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = msg;
  alertBox.classList.remove("d-none");
}

function clearAlert() {
  alertBox.classList.add("d-none");
  alertBox.textContent = "";
}

function updateSeatsUI() {
  const left = Math.max(0, MAX_BOOKINGS - currentBookings);
  seatsLeftEl.textContent = left;
  if (left === 0) {
    sendBtn.disabled = true;
    bookBtn.disabled = true;
    showAlert("❌ Booking is full — no seats available.", "danger");
  } else {
    sendBtn.disabled = false;
    bookBtn.disabled = false;
    clearAlert();
  }
}

/* =========================
  Send Activation Code via EmailJS
========================= */
sendBtn.addEventListener("click", async () => {
  clearAlert();

  if (!nameInput.value.trim()) return showAlert("⚠ Please enter your full name.", "warning");
  if (!emailInput.value.trim()) return showAlert("⚠ Please enter your email address.", "warning");
  if (!cardInput.value.replace(/\s/g, "").match(/^\d{16}$/)) return showAlert("⚠ Card number must be 16 digits.", "warning");
  if (!expInput.value) return showAlert("⚠ Please select the card expiration date.", "warning");
  if (!ccpInput.value.match(/^\d{4}$/)) return showAlert("⚠ CCP/Password must be 4 digits.", "warning");

  generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expireAt = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString();

  const templateParams = {
    email: emailInput.value,
    passcode: generatedCode,
    time: expireAt,
  };

  try {
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    await emailjs.send("service_k8sad1i", "template_k2k3e49", templateParams);
    showAlert("✅ Activation code sent to your email.", "success");
  } catch (err) {
    console.error("EmailJS Error:", err);
    showAlert("❌ Error while sending code. Check Service/Template/Email in EmailJS.", "danger");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "📩 Send activation code";
  }
});

/* =========================
  Confirm Booking
========================= */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearAlert();

  if (MAX_BOOKINGS - currentBookings <= 0) {
    return showAlert("❌ No seats available.", "danger");
  }

  const userCode = otpInput.value.trim();
  if (!generatedCode) return showAlert("⚠ Please click (Send activation code) first.", "warning");
  if (userCode !== generatedCode) return showAlert("❌ Incorrect activation code.", "danger");

  // تحديث عدد الحجز للحدث
  currentBookings += 1;
  eventContainer[EventIndex].booked = currentBookings;
  localStorage.setItem("eventData", JSON.stringify(eventContainer));

  // 🟢 إضافة الحجز للمستخدم الحالي
  let currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  let bookings = currentUser.bookings || [];

  let bookingDetails = {
    event: JSON.parse(localStorage.getItem("selectedEvent")),
    date: new Date().toLocaleDateString(),
    tickets: 1,
  };

  bookings.push(bookingDetails);
  currentUser.bookings = bookings;
  localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

  /* =========================
    تحديث كائن reservations العام
    عشان البروفايل يقدر يقرأه
  ========================= */
  let reservations = JSON.parse(localStorage.getItem("reservations")) || {};
  if (!reservations[currentUser.email]) {
    reservations[currentUser.email] = [];
  }
  reservations[currentUser.email].push(bookingDetails);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  /* ========================= */

  updateSeatsUI();
  showAlert("🎉 Booking successful! Thank you for using EventGo.", "success");
  otpInput.value = "";
});


/* =========================
  Logout Handling
========================= */
logout.addEventListener("click", function () {
  localStorage.setItem("LoggedIn", "false");
  location.reload();
});

/* =========================
  Initial Run
========================= */
updateSeatsUI();

window.onload = function () {
  let LoggedIn = localStorage.getItem("LoggedIn");
  if (LoggedIn === "true") {
    document.getElementById("profileIcon").style.display = "block";
  }
};