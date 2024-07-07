let addNoteBtn = document.querySelector(".addNoteBtn");
let notesCon = document.querySelector(".notes");
let noteTitle = document.querySelector(".noteTitle");
let noteContent = document.querySelector(".noteDes");
let searchTerm = document.querySelector("#searchTerm");

addNoteBtn.addEventListener("click", addNote);
searchTerm.addEventListener("input", filterNotes);

function addNote() {
  if (noteTitle.value === "") {
    alert("Enter a note Title!");
  } else if (noteContent.value === "") {
    alert("Enter a note Description!");
  } else {
    let noteHTML = `
     <div class="card note" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${noteTitle.value}</h5>
          <p class="card-text">${noteContent.value}</p>
          <a href="#" class="btn btn-danger">Delete Note</a>
        </div>
      </div>
    `;

    notesCon.innerHTML += noteHTML;
    noteTitle.value = "";
    noteContent.value = "";
    saveNotes();
    addEventListeners(); // Reattach event listeners after adding new note
    document.querySelector(".btn-close").click();
  }
}

function addEventListeners() {
  let deleteNoteBtns = document.querySelectorAll(".btn-danger");
  deleteNoteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.parentElement.remove();
      saveNotes();
    });
  });
}

function saveNotes() {
  localStorage.setItem("notes", notesCon.innerHTML);
}

function getNotes() {
  let savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notesCon.innerHTML = savedNotes;
  }
  addEventListeners(); // Reattach event listeners after loading notes from localStorage
  filterNotes(); // Apply filtering initially
}

function filterNotes() {
  let searchValue = searchTerm.value.toLowerCase();
  let notes = notesCon.querySelectorAll(".note");

  notes.forEach((note) => {
    let title = note.querySelector(".card-title").innerText.toLowerCase();
    let content = note.querySelector(".card-text").innerText.toLowerCase();

    if (title.includes(searchValue) || content.includes(searchValue)) {
      note.style.display = "block"; // Show matching notes
    } else {
      note.style.display = "none"; // Hide non-matching notes
    }
  });
}

window.addEventListener("load", () => {
  getNotes();
});
