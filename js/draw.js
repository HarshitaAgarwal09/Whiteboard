let isMouseDown = false;

let undoStack = [];
let redoStack = [];

//when we start to draw on canvas board;
board.addEventListener("mousedown", function (e) {
    isMouseDown = true;
    //Start Draw;
    ctx.beginPath();
    let top = getLocation();

    //moves to a location without drawing ;
    ctx.moveTo(e.clientX, e.clientY - top);
    let point = {
        x: e.clientX,
        y: e.clientY - top,
        identifier: "mousedown",
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        globalCompositeOperation: ctx.globalCompositeOperation
    }

    undoStack.push(point);
});

//when we are draw on canvas board;
board.addEventListener("mousemove", function (e) {
    if (isMouseDown == true) {
        let top = getLocation();
        ctx.lineTo(e.clientX, e.clientY - top);
        ctx.stroke();
        let point = {
            x: e.clientX,
            y: e.clientY - top,
            identifier: "mousemove",
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
            globalCompositeOperation: ctx.globalCompositeOperation
        }
        if (redoStack.length > 0) redoStack = [];
        undoStack.push(point);
        redraw();
    }
});

//when we are done drawing on canvas board;
board.addEventListener("mouseup", function (e) {
    isMouseDown = false;
})

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
    return top; s
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

undo.addEventListener("mousedown", function () {
    // continously fires a function
    interval = setInterval(function () {
        undoMarker();
    }, 50);
})

undo.addEventListener("mouseup", function () {
    clearInterval(interval);
})

redo.addEventListener("mousedown", function () {
    // continously fires a function
    interval = setInterval(function () {
        redoMarker();
    }, 50);
})

redo.addEventListener("mouseup", function () {
    clearInterval(interval);
})