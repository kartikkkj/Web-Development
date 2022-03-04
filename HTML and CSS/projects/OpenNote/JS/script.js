const toggleCont = document.querySelector(".toggle-cont");
const pencil = document.querySelector(".pencil");

const eraser = document.querySelector(".eraser");
toggleCont.innerHTML = `<span class="material-icons md"> close </span>`;
let toggleMenu = false;
toggleCont.addEventListener("click", (e) => {
  const actions = document.querySelector(".actions");
  if (toggleMenu) {
    toggleCont.innerHTML = `<span class="material-icons md"> close </span>`;
    actions.style.animationName = "";
    actions.style.animationName = "showActions";
    actions.style.display = "flex";
    toggleMenu = false;
  } else {
    toggleCont.innerHTML = `<span class="material-icons md"> menu </span>`;
    actions.style.animationName = "";
    setTimeout(() => {
      setTimeout(() => {
        actions.style.display = "none";
        toggleMenu = true;
      }, 280);
      actions.style.animationName = "hideActions";
      pencil.style.display = "none";
      eraser.style.display = "none";
      eraserMenu = true;
      pencilMenu = true;
    }, 100);

    pencil.style.animationName = "hidePencil";
    eraser.style.animationName = "hideEraser";
  }
});

const actions = document.querySelectorAll("img");
let pencilMenu = true;
actions[0].addEventListener("click", (e) => {
  if (pencilMenu) {
    setTimeout(() => {
      eraser.style.display = "none";
      eraserMenu = true;
    }, 100);
    eraser.style.animationName = "hideEraser";
    pencil.style.animationName = "";
    pencil.style.animationName = "showPencil";
    pencil.style.display = "block";
    pencilMenu = false;
  } else {
    setTimeout(() => {
      pencil.style.display = "none";
      pencilMenu = true;
    }, 280);
    pencil.style.animationName = "";
    pencil.style.animationName = "hidePencil";
  }
});
let eraserMenu = true;
actions[1].addEventListener("click", (e) => {
  const eraser = document.querySelector(".eraser");
  if (eraserMenu) {
    setTimeout(() => {
      pencil.style.display = "none";
      pencilMenu = true;
    }, 100);
    pencil.style.animationName = "hidePencil";
    eraser.style.animationName = "";
    eraser.style.animationName = "showEraser";
    eraser.style.display = "block";
    eraserMenu = false;
  } else {
    setTimeout(() => {
      eraser.style.display = "none";
      eraserMenu = true;
    }, 280);
    eraser.style.animationName = "";
    eraser.style.animationName = "hideEraser";
  }
});
const github = document.querySelector(".github");
github.addEventListener("click", (e) => {
  const a = document.createElement("a");
  a.href = "https://github.com/AbhyArya";
  a.target = "blank";
  a.click();
});
function minimizeHandeling(stickyNote) {
  const minimize = stickyNote.querySelector(".minimize");
  let minimizeMenu = true;
  minimize.addEventListener("click", (e) => {
    const note = stickyNote.querySelector(".note");
    // const thisstickyNote = stickyNote.querySelector(".sticky-note")
    if (minimizeMenu) {
      stickyNote.style.animationName = "hideNote";
      setTimeout(() => {
        stickyNote.style.height = "4rem";
        minimizeMenu = false;
      }, 280);
      note.style.display = "none";
    } else {
      stickyNote.style.animationName = "showNote";
      setTimeout(() => {
        stickyNote.style.height = "16rem";
        note.style.display = "block";
        minimizeMenu = true;
      }, 280);
    }
  });
}
function removeHandlin(stickyNote) {
  const remove = stickyNote.querySelector(".remove");
  remove.addEventListener("click", (e) => {
    stickyNote.remove();
  });
}

function dragAndDrop(ball) {
    ball.onmousedown = function(event) {
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
      
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          ball.style.left = pageX - shiftX + 'px';
          ball.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        ball.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };
      
      };
      
      ball.ondragstart = function() {
        return false;
      };
}

const body = document.querySelector("body");
actions[4].addEventListener("click", (e) => {
  const stickyNote = document.createElement("div");
  stickyNote.setAttribute("class", "sticky-note");
  stickyNote.innerHTML = `<div class="note-action">
                                <div class="minimize"></div>
                                <div class="remove"></div>
                            </div>
                            <div contenteditable="true" spellcheck="false" class="note"></div>`;
  body.appendChild(stickyNote);
  minimizeHandeling(stickyNote);
  removeHandlin(stickyNote);
  dragAndDrop(stickyNote);
});

actions[3].addEventListener("click",(e)=>{
  const input = document.createElement("input")
  input.setAttribute("type", "file")
  input.click()
  input.addEventListener("change", (e)=>{
    const file =input.files[0];
      const url = URL.createObjectURL(file)
      const stickyNote = document.createElement("div");
      stickyNote.setAttribute("class", "sticky-note");
      stickyNote.innerHTML = `<div class="note-action">
                                    <div class="minimize"></div>
                                    <div class="remove"></div>
                                </div>
                                <div contenteditable="true" spellcheck="false" class="note">
                                  <img src="${url}">
                                </div>
                                  `;
      body.appendChild(stickyNote);
      minimizeHandeling(stickyNote);
      removeHandlin(stickyNote);
      dragAndDrop(stickyNote);
  })
  
})

