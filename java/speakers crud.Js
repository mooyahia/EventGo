document.addEventListener("DOMContentLoaded", function () {
  let speakersData = JSON.parse(localStorage.getItem("speakerData")) || [];
  const speakersContainer = document.getElementById("speakersContainer");
  const addSpeakerForm = document.getElementById("addSpeakerForm");
  let editIndex = null;

  function displaySpeakers() {
    speakersContainer.innerHTML = "";
    speakersData.forEach((speaker, index) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4", "col-sm-6", "mb-4", "speaker-card");
      col.innerHTML = `
        <div class="speaker-card p-3 border rounded shadow-sm">
          <img src="${speaker.image}" class="team-img img-fluid mb-2" alt="person">
          <h6 class="fw-bold">${speaker.name}</h6>
          <p class="text-muted mb-2">${speaker.role}</p>
          <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">
            <i class="bi bi-pencil"></i> 
          </button>
          <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">
            <i class="bi bi-trash"></i> 
          </button>
        </div>
      `;
      speakersContainer.appendChild(col);
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem("speakerData", JSON.stringify(speakersData));
  }

  addSpeakerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("speakerName").value;
    const role = document.getElementById("speakerRole").value;
    const fileInput = document.getElementById("speakerImage");

    function saveSpeaker(name, role, image) {
      if (editIndex !== null) {
        // تعديل (Update)
        speakersData[editIndex] = { name, role, image };
        editIndex = null;
      } else {
        // إضافة (Add)
        speakersData.push({ name, role, image });
      }
      saveToLocalStorage();
      displaySpeakers();

      addSpeakerForm.reset();
      bootstrap.Modal.getInstance(document.getElementById("addSpeakerModal")).hide();
    }

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        saveSpeaker(name, role, e.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      const oldImage = editIndex !== null ? speakersData[editIndex].image : "";
      saveSpeaker(name, role, oldImage);
    }
  });

  speakersContainer.addEventListener("click", function (e) {
    if (e.target.closest(".remove-btn")) {
      const index = e.target.closest(".remove-btn").dataset.index;
      speakersData.splice(index, 1);
      saveToLocalStorage();
      displaySpeakers();
    } else if (e.target.closest(".edit-btn")) {
      editIndex = e.target.closest(".edit-btn").dataset.index;
      const speaker = speakersData[editIndex];

      document.getElementById("speakerName").value = speaker.name;
      document.getElementById("speakerRole").value = speaker.role;
      document.getElementById("speakerImage").value = "";    
      new bootstrap.Modal(document.getElementById("addSpeakerModal")).show();
    }
  });

  displaySpeakers();
});
