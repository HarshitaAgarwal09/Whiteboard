let isMouseDown = false;

let undoStack = [];
let redoStack = [];



//when we start to draw on canvas board;
const boardMouseDownHandler = function (e) {
    isMouseDown = true;
    //Start Draw;
    ctx.beginPath();
    let top = getLocation();

    let positionX = e.targetTouches ? e.touches[0].clientX : e.clientX;
    let positionY = e.targetTouches ? e.touches[0].clientY : e.clientY;

    //moves to a location without drawing ;
    ctx.moveTo(positionX, positionY - top);
    let point = {
        x: positionX,
        y: positionY - top,
        identifier: "mousedown",
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        globalCompositeOperation: ctx.globalCompositeOperation
    }

    undoStack.push(point);
};

board.addEventListener("mousedown", boardMouseDownHandler);
board.addEventListener("touchstart", boardMouseDownHandler);



//when we are draw on canvas board;
const boardMouseMoveHandler = function (e) {
    if (isMouseDown == true) {
        let top = getLocation();

        let positionX = e.targetTouches ? e.touches[0].clientX : e.clientX;
        let positionY = e.targetTouches ? e.touches[0].clientY : e.clientY;

        ctx.lineTo(positionX, positionY - top);
        ctx.stroke();
        let point = {
            x: positionX,
            y: positionY - top,
            identifier: "mousemove",
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
            globalCompositeOperation: ctx.globalCompositeOperation
        }
        if (redoStack.length > 0) redoStack = [];
        undoStack.push(point);
        redraw();
    }
}

board.addEventListener("mousemove", boardMouseMoveHandler);
board.addEventListener("touchmove", boardMouseMoveHandler);



//when we are done drawing on canvas board;
const boardMouseUpHandler = function (e) {
    isMouseDown = false;
}

board.addEventListener("mouseup", boardMouseUpHandler);
board.addEventListener("touchend", boardMouseUpHandler);



function redraw() {
    ctx.clearRect(0, 0, board.width, board.height);

    for (let i = 0; i < undoStack.length; i++) {
        let { x, y, identifier, color, width, globalCompositeOperation } = undoStack[i];

        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.globalCompositeOperation = globalCompositeOperation;

        if (identifier == "mousedown") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else if (identifier == "mousemove") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    if (ActiveTool == "pencil") {
        ctx.globalCompositeOperation = "source-over";
    }
    else if (ActiveTool == "eraser") {
        ctx.globalCompositeOperation = "destination-out";
    }
}

function getLocation() {
    // console.log(board.getBoundingClientRect());
    const { top } = board.getBoundingClientRect();
    return top;
}


const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
let interval = null;

function undoMarker() {
    if (undoStack.length > 0) {
        //remove most recent changes
        redoStack.push(undoStack.pop());
        redraw();
        return true;
    }
    return false;
}

function redoMarker() {
    if (redoStack.length > 0) {
        //remove most recent changes
        undoStack.push(redoStack.pop());
        redraw();
        return true;
    }
    return false;
}


const undoMouseDownHandler = function () {
    // continously fires a function
    interval = setInterval(function () {
        undoMarker();
    }, 50);
}
undo.addEventListener("mousedown", undoMouseDownHandler)
undo.addEventListener("touchstart", undoMouseDownHandler)



const undoMouseUpHandler = function () {
    clearInterval(interval);
}
undo.addEventListener("mouseup", undoMouseUpHandler)
undo.addEventListener("touchend", undoMouseUpHandler)



const redoMouseDownHandler = function () {
    // continously fires a function
    interval = setInterval(function () {
        redoMarker();
    }, 50);
}
redo.addEventListener("mousedown", redoMouseDownHandler)
redo.addEventListener("touchstart", redoMouseDownHandler)



const redoMouseUpHandler = function () {
    clearInterval(interval);
}

redo.addEventListener("mouseup", redoMouseUpHandler)
redo.addEventListener("touchend", redoMouseUpHandler)
