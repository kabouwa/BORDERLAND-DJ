"use strict";

var search = document.getElementById("search");
var table = document.querySelector("tbody");
var alerts = document.querySelector('.alerts');
var founded = document.querySelector('.founded'); //Used Var :

var name = document.getElementById("name");
var category = document.getElementById("category");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var total = document.getElementById("total");
var quantity = document.getElementById("quantity");
var sells = document.getElementById("sells");
var description = document.getElementById("description"); //Show founded product

function showPro(products) {
  var row = "";

  if (products.length == 0) {
    row = "<tr><td colspan=\"11\" class=\"text-center py-5\" style=\"color: var(--text-3);\"><i class=\"fa-solid fa-box-open fa-2x mb-3 d-block\"></i>No products created yet.</td></tr>";
    table.innerHTML = row;
  } else {
    for (var i = 0; i < products.length; i++) {
      row += "<tr class='load-anim'>\n                    <td>".concat(i + 1, "</td>\n                    <td><strong>").concat(products[i].name, "</strong></td>\n                    <td>").concat(products[i].price, "</td>\n                    <td>").concat(products[i].taxes, "</td>\n                    <td>").concat(products[i].ads, "</td>\n                    <td><strong style=\"color: var(--success)\">").concat((+products[i].price + +products[i].taxes + +products[i].ads).toFixed(2), "</strong></td>\n                    <td>").concat(products[i].quantity, "</td>\n                    <td>").concat(products[i].sells, "</td>\n                    <td><span style=\"background:var(--primary-light);color:var(--primary);padding:3px 10px;border-radius:20px;font-size:0.78rem;font-weight:600\">").concat(products[i].category, "</span></td>\n                    <td>\n                        <button type=\"button\" class=\"btn btn-warning btn-sm update-btn\" data-product-id=\"").concat(products[i].id, "\"><i class=\"fa-solid fa-pen-to-square\"></i></button>\n                    </td>\n                    <td>\n                        <button type=\"button\" class=\"btn btn-danger btn-sm delete-btn\" data-product-id=\"").concat(products[i].id, "\"><i class=\"fa-solid fa-trash\"></i></button>\n                    </td>\n              </tr>");
    }

    table.innerHTML = row;
  }
}