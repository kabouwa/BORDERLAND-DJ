
// Form Validation
document.getElementById("signup-form").addEventListener("submit", async (e) => {
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
      const response = await fetch("/api/cleanUser/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      });

      const data = await response.json();
      // console.log('Received ==>>',data);
      //After Backend Talk
      if (data["submit"]) {
        // document.getElementById("signup-form").submit();
        let email = document.getElementById("email").value.trim().toLowerCase();
        document.getElementById("otpEmail").innerText = email;
        sentOTP(email);
        document.getElementById("otpModal").style.display = 'block';
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

document.getElementById("otpResend").addEventListener('click',()=>{
    sentOTP(document.getElementById("email").value.trim().toLowerCase());
    alertMesssage("Verification code sent successfuly again", "success", "Done");
})
