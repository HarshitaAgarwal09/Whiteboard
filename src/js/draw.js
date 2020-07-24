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
        width: ctx.lineWidth
    }

    undoStack.push(point);
});

//when we are draw on canvas board;
board.addEventListener("mousemove", function (e) {
    if (isMouseDown == true && ActiveTool == "pencil") {
        let top = getLocation();
        ctx.lineTo(e.clientX, e.clientY - top);
        ctx.stroke();
        let point = {
            x: e.clientX,
            y: e.clientY - top,
            identifier: "mousemove",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoStack.push(point);
        redraw();
    }

});

//when we are done drawing on canvas board;
board.addEventListener("mouseup", function (e) {
    // let point = {
    //     x: e.clientX,
    //     y: e.clientY - top,
    //     identifier: "mousemove",
    //     color: ctx.strokeStyle,
    //     width: ctx.lineWidth
    // }
    // undoStack.push(point);
    isMouseDown = false;
})

function redraw() {
    ctx.clearRect(0, 0, board.width, board.height);

    for (let i = 0; i < undoStack.length; i++) {
        let { x, y, identifier, color, width } = undoStack[i];

        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        if (identifier == "mousedown") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else if (identifier == "mousemove") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
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