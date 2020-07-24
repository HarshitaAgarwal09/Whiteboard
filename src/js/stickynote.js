const body = document.querySelector("body");

function createSticky() {
    const writingPad = createBox();
    const textarea = document.createElement("textarea");
    textarea.style.resize = "none";
    writingPad.appendChild(textarea);


    // textarea.addEventListener("mousemove", function (e) {
    //     let { width, height } = textarea.getBoundingClientRect();
    //     document.querySelector(".sticky-pad").style.height = height;
    //     document.querySelector(".sticky-pad").style.width = width;
    //     document.querySelector(".nav").style.width = width;
    //     console.log(width + " " + height);
    // })
}

createSticky();
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
    body.appendChild(stickyPad);

    close.addEventListener("click", function () {
        stickyPad.remove();
    })

    let isMinimized = false;
    minimize.addEventListener("click", function () {
        isMinimized == false
            ? writingPad.style.display = "node"
            : writingPad.style.display = "block";
        isMinimized = !isMinimized;
    });

    let initialX = null;
    let initialY = null;
    let isStickyDown = false;

    navBar.addEventListener("mousedown", function (e) {
        console.log("mousedown")
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })

    navBar.addEventListener("mousemove", function (e) {
        console.log("mousemove");
        if (isStickyDown == true) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            let diffX = finalX - initialX;
            let diffY = finalY - initialY;

            let { top, left } = stickyPad.getBoundingClientRect();

            stickyPad.style.top = top + diffY + "px";
            stickyPad.style.left = left + diffX + "px";

            // console.log("initial" + initialX + " " + initialY);
            // console.log("final" + finalX + " " + finalY);
            // console.log("topleft" + top + " " + left);

            // console.log("diffY" + diffX + " " + diffY);
            // console.log("style" + stickyPad.style.top + " " + stickyPad.style.left);

            initialX = finalX;
            initialY = finalY;
        }
    })

    navBar.addEventListener("mouseup", function () {
        console.log("mouseup")

        isStickyDown = false;
    })


    navBar.addEventListener("mouseleave", function () {
        isStickyDown = false;
    })


    document.body.appendChild(stickyPad);
    return writingPad;

}