const zoomin = document.querySelector(".zoom-in");
const zoomout = document.querySelector(".zoom-out");

zoomin.addEventListener("click", function (e) {
    // console.log("zoom-in");
    ctx.scale(1.1, 1.1);
    // ctx.translate(0, 0);
    redraw();
})

zoomout.addEventListener("click", function () {

    ctx.scale(0.9, 0.9);
    // ctx.translate(0, 0);
    redraw();
})

