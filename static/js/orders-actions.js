// ===== DELETE =====
const deleteModal = document.getElementById("delete-modal");
let orderToDelete = null;

document.querySelectorAll(".delete-order-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    orderToDelete = btn.dataset.orderId;
    deleteModal.style.cssText = "display:flex;";
  });
});

document.getElementById("cancel-delete").addEventListener("click", () => {
  deleteModal.style.cssText = "display:none;";
});

document
  .getElementById("confirm-delete")
  .addEventListener("click", async () => {
    deleteModal.style.cssText = "display:none;";
    try {
      const response = await fetch(`/api/deleteOrder/?idel=${orderToDelete}`);
      const data = await response.json();
      if (data.deleted) {
        location.href = "/kabouwa/orders/?statut=deleted";
      }
    } catch (e) {
      console.error("Delete failed:", e);
    }
  });


function status(){
  //Show menu
  document.querySelectorAll(".status-toggler").forEach((toggler) => {
    toggler.addEventListener("click", () => {
      status_menu = document.querySelector(`.${toggler.dataset.target}`);
      status_menu.style.display == "none"
        ? (status_menu.style.display = "block")
        : (status_menu.style.display = "none");
    });
  });

  //Change status :

  document.querySelectorAll(".status-switcher").forEach((btn) => {
    btn.addEventListener("click", async () => {
      new_statut = btn.dataset.orderStatut;
      up_order = btn.dataset.orderId;

      const response = await fetch(
        `/api/updateStatus/?idup=${up_order}&statutup=${new_statut}`,
      );
      const data = await response.json();
      if (data.updated) {
        location.href = "/kabouwa/orders/?statut=updated";
      }
    });
  });
};status();



