// const form = document.querySelector("#updateForm")
//     form.addEventListener("change", function () {
//       const updateBtn = document.querySelector("button")
//       updateBtn.removeAttribute("disabled")
//     })


const form = document.querySelector("#updateForm");
const submitBtn = document.querySelector("input[type='submit']");

form.addEventListener("change", function () {
    submitBtn.removeAttribute("disabled");
});