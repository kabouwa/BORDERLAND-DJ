//Sent otp mail:
async function sentOTP(user_email) {
  // Get Csrf token from cookies
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  const response = await fetch("/api/sentOTP/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": csrfToken,
    },
    body: new URLSearchParams({ email: user_email }),
  });

  const data = await response.json();
  if (data["success"]) {
    alertMesssage("Verification code sent successfuly", "success", "Done");
  }
}


//OTP verification code 
document.getElementById("otpVerifyBtn").addEventListener("click", async () => {
  let inputs = document.querySelectorAll(".otp-box")
  user_code = "";
  inputs.forEach((input) => {user_code += input.value;});
  const response = await fetch(`/api/validateOTP/?oc=${user_code}`);
  const data = await response.json()
  if(data['submit']){
  document.getElementById("signup-form").submit();
  }else{
    alertMesssage("otp code, Try agian", "danger", "False");
    inputs.forEach((input) => {
      input.value = '';
      input.classList.add('border-danger')
    });
  }
});



//OTP inputs event 
document.querySelectorAll(".otp-box").forEach((input) => {
  input.addEventListener('input',()=>{
    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    reset = true;
    for(let i=0 ; i<numbers.length; i++){
      if(numbers[i] == Number(input.value)){
        reset = false
      }
    }
    if(reset == true){
      input.value = ''
    }
  })
});