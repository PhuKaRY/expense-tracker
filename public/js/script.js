// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("old JS imported successfully!");
});

const deleteBtns = document.querySelectorAll(".delete-btn");
const cancelBtns = document.querySelectorAll(".cancel-btn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const parentTD = btn.closest("td");
    parentTD.querySelector("form").classList.remove("hidden");
    btn.classList.add("hidden");
  });
});

cancelBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const parentTD = btn.closest("td");

    parentTD.querySelector("form").classList.add("hidden");
    parentTD.querySelector(".delete-btn").classList.remove("hidden");
  });
});
