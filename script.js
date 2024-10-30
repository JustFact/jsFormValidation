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

/* ====================================================== */

const country = document.querySelector("#countrySelect");
const postalCode = document.querySelector("#postalcode");
const postalError = document.querySelector("#postalcode + .errorMessage");

function checkPostalCode() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };
  const constraint = new RegExp(constraints[country.value][0], "");

  if (constraint.test(postalCode.value)) {
    postalError.textContent = "";
    postalCode.classList.remove("error");
  } else {
    postalError.textContent = constraints[country.value][1];
    postalCode.classList.add("error");

    //Adding pattern attribute to trigger correct :valid :invalid pseudo selector
    postalCode.setAttribute("pattern", constraints[country.value][0]);
  }
}

country.addEventListener("change", checkPostalCode);
postalCode.addEventListener("input", checkPostalCode);
postalCode.addEventListener("blur", () => {
  if (postalCode.validity.valueMissing) {
    postalError.textContent = "Value Missing";
    postalCode.classList.add("error");
  }
});

/* ====================================================== */
const pwd = document.querySelector("#password");
const pwdError = document.querySelector("#password + .errorMessage");
const cnfPwd = document.querySelector("#confirmPassword");
const cnfPwdError = document.querySelector("#confirmPassword + .errorMessage");

const confirmPassword = () => {
  if (!pwd.validity.valid) {
    cnfPwdError.textContent = "Please correct the password as per requirement";
    cnfPwd.classList.add("error");
  } else if (cnfPwd.validity.valueMissing) {
    cnfPwdError.textContent = "Value required";
    cnfPwd.classList.add("error");
  } else if (!cnfPwd.value.includes(pwd.value)) {
    cnfPwdError.textContent = "Password mismatch";
    cnfPwd.classList.add("error");
  } else {
    cnfPwdError.textContent = "";
    cnfPwd.classList.remove("error");
  }
};

pwd.addEventListener("input", () => {
  if (pwd.validity.patternMismatch) {
    pwdError.textContent =
      "Password must be 8 character long and must have at least 1 lowercase, 1 uppercase, 1 special character and 1 number";
    pwd.classList.add("error");
  } else if (pwd.validity.valueMissing) {
    pwdError.textContent = "Password is required";
    pwd.classList.add("error");
  } else {
    pwdError.textContent = "";
    pwd.classList.remove("error");
  }

  if (cnfPwd.value !== "") {
    confirmPassword();
  }
});

pwd.addEventListener("blur", () => {
  if (pwd.validity.valueMissing) {
    pwdError.textContent = "Password is required";
    pwd.classList.add("error");
  }
});

cnfPwd.addEventListener("input", confirmPassword);

cnfPwd.addEventListener("blur", () => {
  if (cnfPwd.validity.valueMissing) {
    cnfPwdError.textContent = "Value Required";
    cnfPwd.classList.add("error");
  }
});
