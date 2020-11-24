showNotes();

// If user adds a note, add it to the localStorage
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = ""; //to clear value after entering the note
  addTitle.value = "";
  showNotes();
});

// function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
  });
  let notesEle = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesEle.innerHTML = html;
  } else {
    notesEle.innerHTML = `<h5>Nothing to show, please 'add a note' first!</h5>`;
  }
}

// function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// function for search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let noteTxt = element.getElementsByTagName("p")[0].innerText;
    let titleTxt = element.getElementsByTagName("h5")[0].innerText;
    let cardTxt = noteTxt + titleTxt;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
