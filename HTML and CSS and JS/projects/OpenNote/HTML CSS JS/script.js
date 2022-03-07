const canvas = document.querySelector("canvas")
const colors = document.querySelectorAll(".colors>*")
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");
const pencilSizeElem = document.querySelector(".pencil .size-bar input")
const eraserSizeElem = document.querySelector(".eraser input")
const toggleCont = document.querySelector(".toggle-cont");
const actions = document.querySelectorAll("img");
const github = document.querySelector(".github");
const body = document.querySelector("body");


canvas.width = window.innerWidth
canvas.height = window.innerHeight
let mouseMove = false;
let penColor = "red"
colors[0].style.border = "solid 3px gray";
const eraserColor ="white"
let pencilSize = pencilSizeElem.value;
let eraserSize = eraserSizeElem.value;
let UndoRedoTracker = []
let track = 0
let eraserMenu = true;
let toggleMenu = false;
let pencilMenu = true;
const tool = canvas.getContext("2d")
tool.strokeStyle = penColor;
tool.lineWidth = pencilSize;

UndoRedoTracker.push(canvas.toDataURL())
track = UndoRedoTracker.length - 1

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



// Pencil fuctions toggling
actions[0].addEventListener("click", (e) => {
  tool.strokeStyle = penColor;
  tool.lineWidth = pencilSize;
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


// eraser fuctions toggling
actions[1].addEventListener("click", (e) => {
  if (eraserMenu) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserSize;
    console.log(tool.strokeStyle);
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




function beginPath(strokeObj) {
    tool.beginPath()
    tool.moveTo(strokeObj.X, strokeObj.Y)
    tool.stroke()
}
function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color
    tool.lineWidth = strokeObj.width
    tool.lineTo(strokeObj.X, strokeObj.Y)
    tool.stroke()
}



canvas.ontouchstart = (e) => {
  mouseMove = true
  const data ={
      X: e.clientX,
      Y: e.clientY
  }
    socket.emit("beginPath",data)
}
canvas.ontouchmove = (e) => {
  if (mouseMove) {
      const data = {
          X: e.clientX,
          Y: e.clientY,
          color : !eraserMenu ? eraserColor: penColor,
          width : !eraserMenu ? eraserSize: pencilSize
      }
      socket.emit("drawStroke",data)
  }
}
canvas.ontouchend = (e) => {
  mouseMove = false;
  UndoRedoTracker.push(canvas.toDataURL())
  track = UndoRedoTracker.length - 1
}

canvas.onmousedown = (e) => {
    mouseMove = true
    const data ={
        X: e.clientX,
        Y: e.clientY
    }
      socket.emit("beginPath",data)
}
canvas.onmousemove = (e) => {
    if (mouseMove) {
        const data = {
            X: e.clientX,
            Y: e.clientY,
            color : !eraserMenu ? eraserColor: penColor,
            width : !eraserMenu ? eraserSize: pencilSize
        }
        socket.emit("drawStroke",data)
    }
}
canvas.onmouseup = (e) => {
    mouseMove = false;
    UndoRedoTracker.push(canvas.toDataURL())
    track = UndoRedoTracker.length - 1
}



colors.forEach(color => {
  color.onclick = (e) => {
    tool.strokeStyle = color.classList[0]
    colors.forEach(color => {
      color.style.border = ""
    })
    color.style.border = "solid 3px gray";
    penColor = color.classList[0]
    tool.strokeStyle = penColor
  }
});
pencilSizeElem.onchange = (e) => {
    pencilSize =pencilSizeElem.value
    tool.lineWidth = pencilSize
  }
eraserSizeElem.onchange = (e) => {
    eraserSize = eraserSizeElem.value;
    tool.lineWidth = eraserSize
}

actions[2].onclick = (e) => {
    const imageURL = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = imageURL;
    a.download = "image.jpg";
    a.click();  
  }


  
actions[6].onclick = (e) => {
    if (track > 0) {
      track--;
      const data = {
        trackValue: track,
        UndoRedoTracker1 : UndoRedoTracker
      }
      // socket.emit("ru",data)
      UndoRedoCanvas(data)
    }
  }
  actions[5].onclick = (e) => {
    if (track < UndoRedoTracker.length-1) {
      track++;
      const data = {
        trackValue: track,
        UndoRedoTracker1 : UndoRedoTracker
      }
      // socket.emit("ru",data)
      UndoRedoCanvas(data)
    }
  }
  function UndoRedoCanvas(trackObj) {

    track = trackObj.trackValue
    UndoRedoTracker = trackObj.UndoRedoTracker1;
    
    const url = UndoRedoTracker[track];
    const img = new Image()
    img.src = url
    img.onload = (e) => {
      tool.drawImage(img, 0, 0, canvas.innerWidth, canvas.innerHeight);
      tool.drawImage(img, 0, 0, canvas.innerWidth, canvas.innerHeight)
    }
  }

  function clear(){
    tool.fillStyle = 'white';
    tool.fillRect(0, 0, canvas.width, canvas.height);
  }

  actions[7].onclick=(e)=>{
    clear();
    UndoRedoTracker.push(canvas.toDataURL())
    track = UndoRedoTracker.length - 1
    socket.emit("clear")
  }

  socket.on("beginPath",(data)=>{
    beginPath(data)
  })
  socket.on("drawStroke",(data)=>{
    drawStroke(data);
  })
  socket.on("ru",(data)=>{
    UndoRedoCanvas(data)
  })
  socket.on("clear",()=>{
    clear();
  })