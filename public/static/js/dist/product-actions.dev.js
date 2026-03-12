"use strict";

//Deleted product via api : 
function deletePro(id) {
  var response, data;
  return regeneratorRuntime.async(function deletePro$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/del-product/?idel=".concat(id)));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;

          if (data['deleted'] == true) {
            location.href = "/kabouwa/products/?statut=delete";
          }

          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("deleting failed :", _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

var confirmModal = document.querySelector(".confirm-modal");
var product_del_id = null; //Confirm deleting : 

document.querySelectorAll(".delete-btn").forEach(function (button) {
  button.addEventListener('click', function () {
    product_del_id = button.getAttribute("data-product-id");
    confirmModal.setAttribute('style', 'display:grid');
  });
}); //Cancel deleting:

confirmModal.addEventListener("click", function () {
  confirmModal.setAttribute("style", "display:hidden");
}); //Confirm deleting

document.getElementById("confirm-deleting").addEventListener('click', function () {
  deletePro(product_del_id);
}); //Start Update:

function toggleUpdate() {
  document.querySelectorAll(".update-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      var product_up_id = button.getAttribute("data-product-id");
      location.pathname = "/kabouwa/update-product/".concat(product_up_id);
    });
  });
}

;
toggleUpdate();