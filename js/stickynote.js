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

    close.addEventListener("click", function () {
        stickyPad.remove();
    })

    let isMinimized = false;
    minimize.addEventListener("click", function () {
        isMinimized == false
            ? writingPad.style.display = "none"
            : writingPad.style.display = "block";
        isMinimized = !isMinimized;
    });

    let initialX = null;
    let initialY = null;
    let isStickyDown = false;

    navBar.addEventListener("mousedown", function (e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })

    navBar.addEventListener("mousemove", function (e) {
        if (isStickyDown == true) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            let diffX = finalX - initialX;
            let diffY = finalY - initialY;

            let { top, left } = stickyPad.getBoundingClientRect();

            stickyPad.style.top = top + diffY + "px";
            stickyPad.style.left = left + diffX + "px";

            initialX = finalX;
            initialY = finalY;
        }
    })

    navBar.addEventListener("mouseup", function () {
        isStickyDown = false;
    })


    navBar.addEventListener("mouseleave", function () {
        isStickyDown = false;
    })


    document.body.appendChild(stickyPad);
    return writingPad;

}