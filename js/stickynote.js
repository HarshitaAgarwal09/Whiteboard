const body = document.querySelector("body");

function createSticky() {
    const writingPad = createBox();
    const textarea = document.createElement("textarea");
    textarea.style.resize = "none";
    writingPad.appendChild(textarea);
}

//utility function
function createBox() {

    //created sticky pad
    const stickyPad = document.createElement("div");
    const navBar = document.createElement("div");
    const writingPad = document.createElement("div");
    const minimize = document.createElement("div");
    const close = document.createElement("div");

    stickyPad.setAttribute("class", "sticky-pad");
    navBar.setAttribute("class", "nav");
    writingPad.setAttribute("class", "writing-pad");
    minimize.setAttribute("class", "minimize");
    close.setAttribute("class", "close");

    navBar.appendChild(minimize);
    navBar.appendChild(close);
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(writingPad);
    board.appendChild(stickyPad);


    const closeClickHandler = function () {
        stickyPad.remove();
    };

    close.addEventListener("click", closeClickHandler);


    let isMinimized = false;
    const minimizeHandler = function () {
        isMinimized == false
            ? writingPad.style.display = "none"
            : writingPad.style.display = "block";
        isMinimized = !isMinimized;
    }

    minimize.addEventListener("click", minimizeHandler);


    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    const navbarmMouseDownHandler = function (e) {
        initialX = e.targetTouches ? e.touches[0].clientX : e.clientX;
        initialY = e.targetTouches ? e.touches[0].clientY : e.clientY;
        isStickyDown = true;
    };

    navBar.addEventListener("mousedown", navbarmMouseDownHandler)
    navBar.addEventListener("touchstart", navbarmMouseDownHandler)


    const navbarMouseMoveHandler = function (e) {
        if (isStickyDown == true) {

            let finalX = e.targetTouches ? e.touches[0].clientX : e.clientX;
            let finalY = e.targetTouches ? e.touches[0].clientY : e.clientY;

            let diffX = finalX - initialX;
            let diffY = finalY - initialY;

            let { top, left } = stickyPad.getBoundingClientRect();

            stickyPad.style.top = top + diffY + "px";
            stickyPad.style.left = left + diffX + "px";

            initialX = finalX;
            initialY = finalY;
        }
    };

    navBar.addEventListener("mousemove", navbarMouseMoveHandler);
    navBar.addEventListener("touchmove", navbarMouseMoveHandler);


    const navbarMouseUpHadler = function () {
        isStickyDown = false;
    }
    navBar.addEventListener("mouseup", navbarMouseUpHadler)
    navBar.addEventListener("touchend", navbarMouseUpHadler)

    const navbarMouseLeave = function () {
        isStickyDown = false;
    }

    navBar.addEventListener("mouseleave", navbarMouseLeave);
    navBar.addEventListener("touchleave", navbarMouseLeave);

    document.body.appendChild(stickyPad);
    return writingPad;

}


// document.querySelector(".container").addEventListener("click", function () {
//     console.log("click")
// })

// document.querySelector(".container").addEventListener("touchstart", function () {
//     console.log("touchstart")
// })
// document.querySelector(".container").addEventListener("touchmove", function () {
//     console.log("touchmove")
// })
// document.querySelector(".container").addEventListener("touchend", function () {
//     console.log("touchend")
// })
// document.querySelector(".container").addEventListener("touchenter", function () {
//     console.log("touchenter")
// })
// document.querySelector(".container").addEventListener("touchleave", function () {
//     console.log("touchleave")
// })
// document.querySelector(".container").addEventListener("touchcancel", function () {
//     console.log("touchcancel")
// })