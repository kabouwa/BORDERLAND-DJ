"use strict";

// Calculate total:
document.querySelectorAll(".financial-inputs").forEach(function (element) {
  element.addEventListener("input", function () {
    if (price.value > 0) {
      var result = +price.value + +taxes.value + +ads.value;
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
}); //Clear Inputs :

document.getElementById("clear-btn").addEventListener("click", function () {
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