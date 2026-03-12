"use strict";

// ===== DELETE =====
var deleteModal = document.getElementById("delete-modal");
var orderToDelete = null;
document.querySelectorAll(".delete-order-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    orderToDelete = btn.dataset.orderId;
    deleteModal.style.cssText = "display:flex;";
  });
});
document.getElementById("cancel-delete").addEventListener("click", function () {
  deleteModal.style.cssText = "display:none;";
});
document.getElementById("confirm-delete").addEventListener("click", function _callee() {
  var response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          deleteModal.style.cssText = "display:none;";
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/deleteOrder/?idel=".concat(orderToDelete)));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;

          if (data.deleted) {
            location.href = "/kabouwa/orders/?statut=deleted";
          }

          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          console.error("Delete failed:", _context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
});

function status() {
  //Show menu
  document.querySelectorAll(".status-toggler").forEach(function (toggler) {
    toggler.addEventListener("click", function () {
      status_menu = document.querySelector(".".concat(toggler.dataset.target));
      status_menu.style.display == "none" ? status_menu.style.display = "block" : status_menu.style.display = "none";
    });
  }); //Change status :

  document.querySelectorAll(".status-switcher").forEach(function (btn) {
    btn.addEventListener("click", function _callee2() {
      var response, data;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              new_statut = btn.dataset.orderStatut;
              up_order = btn.dataset.orderId;
              _context2.next = 4;
              return regeneratorRuntime.awrap(fetch("/api/updateStatus/?idup=".concat(up_order, "&statutup=").concat(new_statut)));

            case 4:
              response = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(response.json());

            case 7:
              data = _context2.sent;

              if (data.updated) {
                location.href = "/kabouwa/orders/?statut=updated";
              }

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
}

;
status();