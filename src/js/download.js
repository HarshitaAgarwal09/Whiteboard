const downloadTool = document.querySelector(".download")
const container = document.querySelector(".container");

downloadTool.addEventListener("click", function (e) {
    const a = document.createElement("a");
    a.download = `${Date.now()}.png`

    a.href = board.toDataURL("image/png")
    a.click();
    a.remove();


}) 