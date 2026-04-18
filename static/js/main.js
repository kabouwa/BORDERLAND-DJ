let search = document.getElementById("search");
let table = document.querySelector("tbody");
let alerts = document.querySelector('.alerts');
let founded = document.querySelector('.founded');

//Used Var :
let name = document.getElementById("name");
let category = document.getElementById("category");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity");
let sells = document.getElementById("sells");
let description = document.getElementById("description");

//Show founded product
function showPro(products) {
  let row = "";
  if (products.length == 0) {
    row = `<tr><td colspan="11" class="text-center py-5" style="color: var(--text-3);"><i class="fa-solid fa-box-open fa-2x mb-3 d-block"></i>No products created yet.</td></tr>`;
    table.innerHTML = row;
  } else {
    for (let i = 0; i < products.length; i++) {
      row += `<tr class='load-anim'>
                    <td>${i + 1}</td>
                    <td><strong>${products[i].name}</strong></td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td><strong style="color: var(--success)">${(+products[i].price + +products[i].taxes + +products[i].ads).toFixed(2)}</strong></td>
                    <td>${products[i].quantity}</td>
                    <td>${products[i].sells}</td>
                    <td><span style="background:var(--primary-light);color:var(--primary);padding:3px 10px;border-radius:20px;font-size:0.78rem;font-weight:600">${products[i].category}</span></td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm update-btn" data-product-id="${products[i].id}"><i class="fa-solid fa-pen-to-square"></i></button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm delete-btn" data-product-id="${products[i].id}"><i class="fa-solid fa-trash"></i></button>
                    </td>
              </tr>`;
    }
    table.innerHTML = row;
  }
}