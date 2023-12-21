var validName = false;
var validPhone = false;
var validDate = false;
// Name
function hasValidNameSize(name) {
  return /^[а-яёА-ЯЁ -]{2,25}$/.test(name);
}

function hasEnoughRussianLetters(name) {
  return name.match(/[а-яёА-ЯЁ]/g)?.length >= 2;
}

function hasValidNameCharacters(name) {
  return /^[а-яёА-ЯЁ\s-]+$/.test(name);
}

function validateName(name) {
  const hint = document.querySelector("#name-hint");
  hint.textContent = "";
  if (!name) return false;
  if (!hasEnoughRussianLetters(name)) {
    hint.textContent = "Имя должно содержать хотя бы 2 буквы русского алфавита";
    return false;
  }

  if (!hasValidNameCharacters(name)) {
    hint.textContent =
      "Имя может содержать только буквы русского алфавита, дефисы и пробелы";
    return false;
  }

  if (!hasValidNameSize(name)) {
    hint.textContent = "Длина имени должна быть в диапазоне [2, 25]";
    return false;
  }

  return true;
}

// Phone
function hasValidPhoneSize(name) {
  return /^(\+7|8)\d{10}$/.test(name);
}

function isFromRussian(name) {
  return /^(\+7|8)/.test(name);
}

function hasValidPhoneCharacters(name) {
  return /^\+?\d{10,12}$/.test(name);
}

function validatePhone(phone) {
  const hint = document.querySelector("#tel-hint");
  hint.textContent = "";
  if (!phone) return false;
  if (!isFromRussian(phone)) {
    hint.textContent = "Недопустимый код страны";
    return false;
  } else if (!hasValidPhoneSize(phone)) {
    hint.textContent = "Неверный формат номера";
    return false;
  } else if (!hasValidPhoneCharacters(phone)) {
    hint.textContent = "Специальные символы не допускаются";
    return false;
  }

  return true;
}
function summaryFields() {
  const btn = document.querySelector("#submit_order_btn");
  const btn_form = document.querySelector("#submit-form-btn");
  if (validName && validPhone && validDate) {
    btn.disabled = false;
    btn_form.classList.add("btn-active");
  } else {
    btn.disabled = true;
    btn_form.classList.remove("btn-active");
  }
}
// Date
function isValidFutureDate(date) {
  const [day, month, year] = date.split(".").map(Number);

  // Проверяем, является ли введённая дата корректной
  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  if (!isValidDate(day, month, year)) {
    return false;
  }
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day);

  return inputDate > currentDate;
}
function hasValidDateFormat(date) {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(date);
}
function hasValidDateCharacters(name) {
  return /^[\.\d]+$/.test(name);
}
function validateDate(date) {
  const hint = document.querySelector("#date-hint");
  hint.textContent = "";
  if (!date) return false;
  if (!hasValidDateFormat(date)) {
    hint.textContent = "Дата должна быть в формате ДД.ММ.ГГГГ";
    return false;
  } else if (!isValidFutureDate(date)) {
    hint.textContent = "Введена некорретная дата доставки";
    return false;
  } else if (!hasValidDateCharacters(date)) {
    hint.textContent = "Дата может содержать только цифры и точки";
    return false;
  }

  return true;
}
function validateInputs() {
  const nameInput = document.getElementById("name-input");
  const telInput = document.getElementById("tel-input");
  const dateInput = document.getElementById("date-input");

  nameInput.addEventListener("blur", function () {
    validName = validateName(this.value);
    summaryFields();
  });
  telInput.addEventListener("blur", function () {
    validPhone = validatePhone(this.value);
    summaryFields();
  });
  dateInput.addEventListener("blur", function () {
    validDate = validateDate(this.value);
    summaryFields();
  });
}

validateInputs();
