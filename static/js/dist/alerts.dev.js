"use strict";

function alertMesssage(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'danger';
  var accent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Stop';

  if (type != "danger" && type != "warning" && type != "success") {
    console.error("type argument ".concat(type, " isn't valid in alertMesssage function, type can be : danger/warning/success"));
    return;
  }

  var alert = document.createElement("div");
  alert.classList = "alert alert-".concat(type, " alert-dismissible fade show");
  alert.innerHTML = "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button><strong>".concat(accent, "!</strong> ").concat(message);
  alerts.append(alert); //Alert remove their self after 5.7s

  setTimeout(function () {
    alert.classList.add("toremove");
  }, 5000);
  setTimeout(function () {
    alert.classList.add("hidden");
  }, 5700); //If Alerts bulk more than 5 the oldest will removed

  var alertsblocks = document.querySelectorAll(".alert");
  var excess = alertsblocks.length - 5;

  if (excess >= 0) {
    Array.from(alertsblocks).slice(0, excess).forEach(function (alert, index) {
      setTimeout(function () {
        alert.style.opacity = "0";
        alert.style.transform = "translateY(-30px)";
        setTimeout(function () {
          return alert.remove();
        }, 250);
      }, index * 100);
    });
  }
}

;