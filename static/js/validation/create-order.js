quantityOrder.addEventListener('input', () => {
        if (quantityOrder.value > quantityPro) {
          quantityOrder.value = quantityPro;
        } else if (quantityOrder.value <= 0) {
          quantityOrder.value = 1;
        }

        const q = parseInt(quantityOrder.value) || 1;
        document.getElementById('total-display').textContent = (q * unitPrice).toFixed(2);  
});



// Form Validation
document.getElementById("order-form").addEventListener("submit", async (e) => {
  //Stiop default submit action
  e.preventDefault();

  // Get Csrf token from cookies
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  //Take data from form
  const formData = new FormData(e.target);

  // Send data to backend
  try {
    const response = await fetch("/api/cleanOrder/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    });

    const data = await response.json();

    //After Backend Talk
    if (data["log"]) {
      console.error(data["log"]);
      return;
    }
    if (data["submit"]) {
      document.getElementById("order-form").submit();
      return;
    }

    //Show errors in Ui
    data["errors"].forEach((error) => {
      alertMesssage(error, "danger");
    });
  } catch (err) {
    console.error("Validation failed ", err);
  }
});