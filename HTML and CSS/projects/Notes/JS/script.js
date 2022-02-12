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

let addFlag = false;
let pushflag = true;
const noteArr = [];
let removeflag = false;
let colTof= undefined;
let modalPriorityColor = color[color.length - 1];
const color = ["color-red", "color-orange", "color-green", "color-grey"];





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
  }

  maincont.appendChild(noteCont);
  handaleRemover(noteCont);
  handalelock(noteCont);
  handalTag(noteCont);
  if (removeflag) {
    deleIconToggle();
  }
  defaultPriorityColor();
}





// remove and lock btn  and tags work

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
let lockCalls = "fa-lock";
let unlockCalls = "fa-lock-open";
function handalelock(noteCont) {
  const lockEle = noteCont.querySelector(".note-lock");
  const lock = lockEle.children[1];
  const constentArea = noteCont.querySelector(".note-area");
  lock.addEventListener("click", () => {
    if (lock.classList.contains(lockCalls)) {
      lock.classList.remove(lockCalls);
      lock.classList.add(unlockCalls);
      constentArea.setAttribute("contenteditable", "true");
    } else {
      lock.classList.remove(unlockCalls);
      lock.classList.add(lockCalls);
      constentArea.setAttribute("contenteditable", "false");
    }
  });
}

function handaleRemover(note) {
  const dele = note.querySelector(".note-lock");
  const de = dele.children[0];
  de.addEventListener("click", () => {
    if (removeflag) {
      note.remove();
    }
  });
}





// tag changing in notes
function handalTag(note) {
  const curnote = note.querySelector(".note-color");
  curnote.addEventListener("click", () => {
    const curColor = curnote.classList[1];
    let idx = color.indexOf(curColor);
    idx++;
    curnote.classList.remove(curColor);
    curnote.classList.add(color[idx % color.length]);
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
