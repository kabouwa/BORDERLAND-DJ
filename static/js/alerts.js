function alertMesssage(message,type='danger',accent='Stop') {
  if (type != "danger" && type != "warning" && type != "success") {
    console.error(
      `type argument ${type} isn't valid in alertMesssage function, type can be : danger/warning/success`,
    );
    return;
  }
  let alert = document.createElement("div");
  alert.classList = `alert alert-${type} alert-dismissible fade show`;
  alert.innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button><strong>${accent}!</strong> ${message}`;
  alerts.append(alert);

  //Alert remove their self after 5.7s
  setTimeout(() => {
    alert.classList.add("toremove");
  }, 5000);
  setTimeout(() => {
    alert.classList.add("hidden");
  }, 5700);

  //If Alerts bulk more than 5 the oldest will removed
  const alertsblocks = document.querySelectorAll(".alert");
  const excess = alertsblocks.length - 5;
  if (excess >= 0) {
    Array.from(alertsblocks)
      .slice(0, excess)
      .forEach((alert, index) => {
        setTimeout(() => {
          alert.style.opacity = "0";
          alert.style.transform = "translateY(-30px)";
          setTimeout(() => alert.remove(), 250);
        }, index * 100);
      });
  }
};