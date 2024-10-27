const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + .errorMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(email.validity.valueMissing);
});

email.addEventListener("input", (e) => {
  //   console.log(e.currentTarget);
  if (e.currentTarget.validity.valueMissing) {
    emailError.textContent = "Value missing.";
    email.classList.add("error");
  } else if (!e.currentTarget.validity.valid) {
    emailError.textContent =
      "Value should be a correct email: <userId>@<domain>";
    email.classList.add("error");
  } else {
    emailError.textContent = "";
    email.classList.remove("error");
  }
});

email.addEventListener("blur", () => {
  if (email.validity.valueMissing) {
    emailError.textContent = "Value missing.";
    email.classList.add("error");
  }
});
