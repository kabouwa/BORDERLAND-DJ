// Form Validation
document.getElementById("update-form").addEventListener("submit", async (e) => {
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
    const response = await fetch("/api/cleanData/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    });

    const data = await response.json();
    // console.log('Received ==>>',data);
    //After Backend Talk
    if (data["log"]) {
      console.error(data["log"]);
      return;
    }
    if (data["submit"]) {
      document.getElementById("update-form").submit();
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