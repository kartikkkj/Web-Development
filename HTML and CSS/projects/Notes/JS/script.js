// Global selected Elements

const addBtn = document.querySelector(".add-btn");
const modalcont = document.querySelector(".modal-cont");
const maincont = document.querySelector(".main-cont");
const textArea = document.querySelector("textarea");
const removebtn = document.querySelector(".remove-btn");
const deletebtn = document.querySelector("note-lock .fa-trash");
const filter = document.querySelectorAll(".color");
const allPriorityColor = document.querySelectorAll(".priority-color");
const saveButton = document.querySelector(".save-btn");

// Global variables

let lockCalls = "fa-lock";
let unlockCalls = "fa-lock-open";
let addFlag = false;
let pushflag = true;
let noteArr = [];
let removeflag = false;
let colTof = undefined;
const color = ["color-red", "color-orange", "color-green", "color-grey"];
let modalPriorityColor = color[color.length - 1];

if (localStorage.getItem("Note")) {
  noteArr = JSON.parse(localStorage.getItem("Note")) ;
  noteArr.forEach((note) => {
    pushflag = false;
    createNote(note.noteCol, note.noteId, note.notetask);
  });
  pushflag = true;
}
// model color selection work

allPriorityColor.forEach((colorEl, idx) => {
  colorEl.addEventListener("click", (e) => {
    allPriorityColor.forEach((colorElemnt) => {
      colorElemnt.classList.remove("border");
    });
    colorEl.classList.add("border");
    modalPriorityColor = colorEl.classList[1];
  });
});

// add btn work

addBtn.addEventListener("click", (e) => {
  addFlag = !addFlag;
  if (addFlag) {
    modalcont.style.display = "flex";
  } else {
    modalcont.style.display = "none";
  }
});

// save btn work

saveButton.addEventListener("click", (e) => {
  if (textArea.value) {
    createNote(modalPriorityColor, shortid(), textArea.value);
    modalcont.style.display = "none";
    addFlag = false;
    textArea.value = "";
  }
});

//create note function

function createNote(noteCol, noteId, notetask) {

  if (colTof == undefined || colTof == noteCol) {
    const noteCont = document.createElement("div");
    noteCont.setAttribute("class", "note-cont");
    noteCont.innerHTML = `
    <div class="note-color ${noteCol}"></div>
    <div class="note-id">ID = ${noteId}</div>
    <div class="note-area"><p>${notetask}</p></div>
    <div class="note-lock">
        <i class="fa-solid fa-trash hide"></i>
        <i class="fa-solid fa-lock"></i>
    </div>
    `;

    if (pushflag) {
      noteArr.push({ noteCol, noteId, notetask });
      localStorage.setItem("Note", JSON.stringify(noteArr));
    }

    maincont.appendChild(noteCont);
    handaleRemover(noteCont, noteId);
    handalelock(noteCont, noteId);
    handalTag(noteCont, noteId);
    if (removeflag) {
      deleIconToggle();
    }
    defaultPriorityColor();
  } else {
    if (pushflag) {
      noteArr.push({ noteCol, noteId, notetask });
      localStorage.setItem("Note", JSON.stringify(noteArr));
    }
  }
}

// remove work

removebtn.addEventListener("click", () => {
  removeflag = !removeflag;
  deleIconToggle();
});

function deleIconToggle() {
  const dele = document.querySelectorAll(".note-lock");
  dele.forEach((dele) => {
    const de = dele.children[0];
    if (removeflag) {
      de.classList.remove("hide");
    } else {
      de.classList.add("hide");
    }
  });
}

function handaleRemover(note, id) {
  const dele = note.querySelector(".note-lock");
  const de = dele.children[0];
  de.addEventListener("click", () => {
    if (removeflag) {
      const myidx = getNoteidx(id);
      noteArr.splice(myidx, 1);
      localStorage.setItem("Note", JSON.stringify(noteArr));
      note.remove();
    }
  });
}

//lock work
function handalelock(noteCont, id) {
  const lockEle = noteCont.querySelector(".note-lock");
  const lock = lockEle.children[1];
  const contentArea = noteCont.querySelector(".note-area");
  lock.addEventListener("click", () => {
    if (lock.classList.contains(lockCalls)) {
      lock.classList.remove(lockCalls);
      lock.classList.add(unlockCalls);
      contentArea.setAttribute("contenteditable", "true");
    } else {
      const data = contentArea.innerText;
      const myidx = getNoteidx(id);
      noteArr[myidx].notetask = data;
      localStorage.setItem("Note", JSON.stringify(noteArr));
      lock.classList.remove(unlockCalls);
      lock.classList.add(lockCalls);
      contentArea.setAttribute("contenteditable", "false");
    }
  });
}

// tag changing in notes
function handalTag(note, id) {
  const curnote = note.querySelector(".note-color");
  curnote.addEventListener("click", () => {
    const myidx = getNoteidx(id);
    const curColor = curnote.classList[1];
    let idx = color.indexOf(curColor);
    idx++;
    curnote.classList.remove(curColor);
    curnote.classList.add(color[idx % color.length]);
    noteArr[myidx].noteCol = color[idx % color.length];
    localStorage.setItem("Note", JSON.stringify(noteArr));
  });
}

function getNoteidx(id) {
  return noteArr.findIndex((nodes) => {
    return nodes.noteId == id;
  });
}

// filtering work
filter.forEach((mycolor) => {
  mycolor.addEventListener("click", () => {
    colTof = mycolor.classList[1];
    const data = noteArr.filter((obj) => colTof === obj.noteCol);
    const allnotes = document.querySelectorAll(".note-cont");
    allnotes.forEach((note) => {
      note.remove();
    });
    data.forEach((note) => {
      pushflag = false;
      createNote(note.noteCol, note.noteId, note.notetask);
    });
    pushflag = true;
  });
});
// unfiltering
filter.forEach((mycolor) => {
  mycolor.addEventListener("dblclick", () => {
    colTof = undefined;
    const allnotes = document.querySelectorAll(".note-cont");
    allnotes.forEach((note) => {
      note.remove();
    });
    noteArr.forEach((note) => {
      pushflag = false;
      createNote(note.noteCol, note.noteId, note.notetask);
    });
    pushflag = true;
  });
});

// default priority color setting

function defaultPriorityColor() {
  allPriorityColor.forEach((colorElemnt) => {
    colorElemnt.classList.remove("border");
  });
  allPriorityColor[allPriorityColor.length - 1].classList.add("border");
  modalPriorityColor = color[color.length - 1];
}
