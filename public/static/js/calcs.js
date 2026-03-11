// Calculate total:
document.querySelectorAll(".financial-inputs").forEach((element) => {
  element.addEventListener("input", () => {
    if (price.value > 0) {
      let result = +price.value + +taxes.value + +ads.value;
      total.value = result;
      total.classList.add("border-success");
      total.classList.add("bg-success");
      total.classList.remove("border-danger");
      total.classList.remove("bg-danger");
    } else {
      total.value = 0;
      total.classList.add("border-danger");
      total.classList.add("bg-danger");
      total.classList.remove("border-success");
      total.classList.remove("bg-success");
    }
  });
});

//Clear Inputs :
document.getElementById("clear-btn").addEventListener("click", () => {
  name.value = "";
  price.value = 0;
  taxes.value = 0;
  ads.value = 0;
  total.value = 0;
  total.quantity = 0;
  sells.value = 0;
  category.value = "";
  description.value = "No information";
});
