// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("old JS imported successfully!");
});

const deleteBtns = document.querySelectorAll(".btn-delete");
const cancelBtns = document.querySelectorAll(".cancel-btn");

deleteBtns?.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    console.log("click");
    const parentTD = btn.closest("td");
    parentTD.querySelector("form").classList.remove("hidden");
    btn.classList.add("hidden");
  });
});

cancelBtns?.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const parentTD = btn.closest("td");

    parentTD.querySelector("form").classList.add("hidden");
    parentTD.querySelector(".btn-delete").classList.remove("hidden");
  });
});

document.querySelector("#tag")?.addEventListener("click", async (event) => {
  const tag = document.querySelector("#tag").value;
  document.querySelector("tbody").innerHTML = "";
  // console.log(http://127.0.0.1:3000);
  const respond = await axios.post(`http://127.0.0.1:3000/main/expense`, {
    tag,
  });
  let index = 0;
  let sum = 0;
  for (let i = 0; i < respond.data.length; i++) {
    sum += respond.data[i].price;
  }
  console.log(sum);
  respond.data.forEach((el) => {
    const clone = document
      .querySelector("#my-template")
      .content.cloneNode(true);
    document.querySelector("tbody").append(clone);
    document.querySelector("#tr").setAttribute("id", index);
    document.querySelector("#date").textContent = new Date(
      el.date
    ).toLocaleDateString();
    document.querySelector("#date").setAttribute("id", el.date);
    document.querySelector("#price").textContent = el.price;
    document.querySelector("#price").setAttribute("id", el.price);
    document.querySelector("#tagName").textContent = el.tag.name;
    document.querySelector("#tagName").setAttribute("id", el.tag.name);
    document.querySelector("#category").textContent = el.category;
    document.querySelector("#category").setAttribute("id", el.category);
    document.querySelector("#link").href = "/main/filter/tag" + el._id;
    document.querySelector("#link").setAttribute("id", el._id);
    document.querySelector("#totalPrice").innerHTML = sum;
    console.log("ok");
    index++;
  });
});

// create a template

// const template = Handlebars.compile(source);
