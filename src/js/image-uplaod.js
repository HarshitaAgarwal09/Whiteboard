const uploadImg = document.querySelector(".upload-img");
const FileInput = document.querySelector(".input-img");
uploadImg.addEventListener("click", function (e) {
    e.preventDefault();
    FileInput.click();
})