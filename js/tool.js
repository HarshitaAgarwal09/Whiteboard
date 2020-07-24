//connect to socket server
// const socket = io.connect("http://localhost:3000/");

//*********************Basic SETUP ********************//

//HTML 
//board = canvas
const board = document.querySelector(".board");

document.querySelector("body").height = window.innerHeight
document.querySelector("body").width = window.innerWidth;
//canvas dimension = window dimension
board.height = window.innerHeight;
board.width = window.innerWidth;

console.log(window.innerHeight + " " + window.innerWidth);
//canvas Rendering context 2d => tool
const ctx = board.getContext("2d");
//pencil color
ctx.strokeStyle = "blue";

//drawing dont pixelate on zoomin
ctx.imageSmoothingEnabled = true;

//The meeting point of two lines will me round
ctx.lineJoin = "round";

//line with rounded end caps
ctx.lineCap = "round";

//sets maximum miter length. => The miter length => the distance between the inner corner and the outer corner where two lines meet.
ctx.miterLimit = 1;

//smooths images on scalling
ctx.imageSmoothingQuality = "high";

// width of pencil
ctx.lineWidth = 3;



//************************* Change Tool **************************/
function handleLocalToolChange(tool) {
    handleToolChange(tool);
}


//****************************** Color change************************/
function handleColorChange(color) {
    ctx.strokeStyle = color;
}


//****************************** size change************************ */
function handleSizeChange(value) {
    ctx.lineWidth = value;
}

//******************** Menu Icon manage ********************** */
const menuIcon = document.querySelector(".menu-icon");
const toolPanel = document.querySelector(".tool-panel");

menuIcon.addEventListener("click", function () {
    handleMenuIcon();
})

