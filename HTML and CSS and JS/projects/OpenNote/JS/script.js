
const pencilSize = document.querySelector(".pencil .size-bar input")
const eraserSize = document.querySelector(".eraser input")
pencilSize.value = 3
eraserSize.value = 12
const toggleCont = document.querySelector(".toggle-cont");
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");
toggleCont.innerHTML = `<span class="material-icons md"> close </span>`;
let toggleMenu = false;
let UndoRedoTracker = []
let track = 0
// Menu toggling
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
// Pencil fuctions toggling
actions[0].addEventListener("click", (e) => {
  if (pencilMenu) {
    tool.lineWidth = pencilSize.value
    tool.strokeStyle = prevCol
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

// Pencil fuctions toggling
actions[1].addEventListener("click", (e) => {
  const eraser = document.querySelector(".eraser");
  if (eraserMenu) {
    tool.strokeStyle = 'white'
    tool.lineWidth = eraserSize.value;
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
    tool.strokeStyle = prevCol;
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
  ball.onmousedown = function (event) {
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
    ball.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };

  };

  ball.ondragstart = function () {
    return false;
  };
}

const body = document.querySelector("body");
// Sticky note Working
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
actions[3].addEventListener("click", (e) => {
  const input = document.createElement("input")
  input.setAttribute("type", "file")
  input.click()
  input.addEventListener("change", (e) => {
    const file = input.files[0];
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
actions[2].onclick = (e) => {
  const imageURL = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = imageURL;
  a.download = "image.jpg";
  a.click();
}



const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const tool = canvas.getContext("2d")
tool.strokeStyle = "red"
tool.lineWidth = pencilSize.value;
let mouseMove = false;
canvas.onmousedown = (e) => {
  mouseMove = true
  tool.beginPath()
  tool.moveTo(e.clientX, e.clientY)
  tool.stroke()
}
canvas.onmousemove = (e) => {
  if (mouseMove) {
    tool.stroke()
    tool.lineTo(e.clientX, e.clientY)
    tool.stroke()
  }
}
canvas.onmouseup = (e) => {
  mouseMove = false;
  UndoRedoTracker.push(canvas.toDataURL())
  track = UndoRedoTracker.length - 1
}
const colors = document.querySelectorAll(".colors>*")
colors[0].style.border = "solid 3px gray";
colors.forEach(color => {
  color.onclick = (e) => {
    tool.strokeStyle = color.classList[0]
    colors.forEach(color => {
      color.style.border = ""
    })
    color.style.border = "solid 3px gray";
    prevCol = color.classList[0]
  }
});
let prevCol = "red"
pencilSize.onchange = (e) => {
  tool.lineWidth = pencilSize.value
}
eraserSize.onchange = (e) => {
  tool.lineWidth = eraserSize.value;
}


actions[6].onclick = (e) => {
  if (track > 0) {
    track--;
    const trackObj = {
      trackValue: track,
      UndoRedoTracker
    }
    UndoRedoCanvas(trackObj)
  }
}
actions[5].onclick = (e) => {
  if (track < UndoRedoTracker.length - 1) {

    track++;
    const trackObj = {
      trackValue: track,
      UndoRedoTracker
    }
    UndoRedoCanvas(trackObj)
  }
}

function UndoRedoCanvas(trackObj) {
  track = trackObj.trackValue
  UndoRedoTracker = trackObj.UndoRedoTracker;
  const url = UndoRedoTracker[track]
  const img = new Image();
  img.src = url
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
}