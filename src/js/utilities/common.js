//**********************On click Menu Icon*********************/
let isActive = true;
function handleMenuIcon() {
    if (isActive == true) {
        menuIcon.classList.remove("is-active");
        toolPanel.classList.remove("add-animation");
    }
    else {
        menuIcon.classList.add("is-active");
        toolPanel.classList.add("add-animation");
    }
    isActive = !isActive;
}

///**************** handling on click tools**********************/
let ActiveTool = "pencil";
let isActivePenOp = true;
let isActiveErsOp = false;

const toolManager = [
    {
        tool: "pencil",
        index: 0,
        cursor: "pencil-cursor",
        options: {
        }
    },
    {
        tool: "eraser",
        index: 1,
        cursor: "eraser-cursor"
    },
    {
        tool: "sticky-note",
        index: 3,
        cursor: "cell"
    },
    {
        tool: "zoom-in",
        index: 4,
        cursor: "zoom-in-cursor"
    },
    {
        tool: "zoom-out",
        index: 5,
        cursor: "zoom-out-cursor"
    }
]

const tools = document.querySelectorAll(".tool");
const pencilOptions = document.querySelector(".tool-options.pencil");
const eraserOptions = document.querySelector(".tool-options.eraser");
const inputs = document.querySelectorAll("input[type=range]");

function handleToolChange(tool) {

    if (tool == "pencil") {
        console.log(inputs);
        if (ActiveTool == "pencil") {//toggle show option
            isActivePenOp = !isActivePenOp;
        }
        else {// remove other options // set yourself active // change style
            isActivePenOp = false;
            eraserOptions.classList.remove("show")
            ctx.strokeStyle = "blue";
            ctx.lineWidth = inputs[0].value;
            ctx.globalCompositeOperation = "source-over"; //dentifying which of the compositing or blending mode operations to use.
        }

        //decide to show options or not
        if (isActivePenOp) pencilOptions.classList.remove("show");
        else pencilOptions.classList.add("show");
    }
    else if (tool == "eraser") {
        if (ActiveTool == "eraser") {
            isActiveErsOp = !isActiveErsOp;
        }
        else {
            isActiveErsOp = false;
            pencilOptions.classList.remove("show")
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = inputs[1].value;
        }

        if (isActiveErsOp) eraserOptions.classList.remove("show");
        else eraserOptions.classList.add("show");
    }
    else if (tool == "sticky-note") {
        createSticky();
    }
    else {
        pencilOptions.classList.remove("show");
        eraserOptions.classList.remove("show");
    }
    ActiveTool = tool;

    //setting cursor and apply active style
    for (let i = 0; i < toolManager.length; i++) {
        let idx = toolManager[i].index;
        let cursorClass = toolManager[i].cursor;

        if (tool == toolManager[i].tool) {
            tools[idx].classList.add("active");
            board.classList.add(cursorClass);
        }
        else {
            tools[idx].classList.remove("active");
            board.classList.remove(cursorClass);
        }
    }
}
