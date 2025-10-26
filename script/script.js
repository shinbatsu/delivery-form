var validName = false;
var validPhone = false;
var validDate = false;
// Name
function hasValidNameSize(name) {
	return /^[а-яёА-ЯЁ]{2}[а-яёА-ЯЁ -]{0,23}$/.test(name);
}

function hasEnoughRussianLetters(name) {
	return name.match(/[а-яёА-ЯЁ]/g)?.length >= 2;
}

function hasValidNameCharacters(name) {
	return /^[а-яёА-ЯЁ\s-]+$/.test(name);
}

function validateName(name) {
	const hint = document.querySelector('#name-hint');
	hint.textContent = '';
	if (!name) return false;
	name = name.replace(/^\s+|\s+$/g, '').replace(/[-\s]+/g, ' ');
	if (!hasEnoughRussianLetters(name)) {
		hint.textContent = 'Указан некорректный формат';
		return false;
	}

	if (!hasValidNameCharacters(name)) {
		hint.textContent = 'Указан некорректный формат';
		return false;
	}

	if (!hasValidNameSize(name)) {
		hint.textContent = 'Указана некорректная длина';
		return false;
	}

	return true;
}

// Phone
function hasValidPhoneSize(phone) {
	return /^(\+7|8)\d{10}$/.test(phone);
}

function isFromRussian(phone) {
	return /^(\+7|8)/g.test(phone);
}

function hasValidPhoneCharacters(phone) {
	return /^((8|\+7)[- ]?)(\(?\d{3}\)?[-\s]?)\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(phone);
}

function validatePhone(phone) {
	const hint = document.querySelector('#tel-hint');
	hint.textContent = '';
	if (!phone) return false;
	if (!isFromRussian(phone)) {
		hint.textContent = 'Недопустимый код страны';
		return false;
	} else if (!hasValidPhoneSize(phone)) {
		hint.textContent = 'Указан некорректный формат';
		return false;
	} else if (!hasValidPhoneCharacters(phone)) {
		hint.textContent = 'Указан некорретный формат';
		return false;
	}

	return true;
}
function summaryFields() {
	const btn = document.querySelector('#submit_order_btn');
	if (validName && validPhone && validDate) {
		btn.disabled = false;
		btn.classList.add('btn-active');
	} else {
		btn.disabled = true;
		btn.classList.remove('btn-active');
	}
}
// Date
function isValidFutureDate(date) {
	const [day, month, year] = date.split('.').map(Number);

	// Проверяем, является ли введённая дата корректной
	const isValidDate = (day, month, year) => {
		const date = new Date(year, month - 1, day);
		return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
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
function hasValidDateCharacters(date) {
	return /^[\.\d]+$/.test(date);
}
function validateDate(date) {
	const hint = document.querySelector('#date-hint');
	hint.textContent = '';
	if (!date) return false;
	if (!hasValidDateFormat(date)) {
		hint.textContent = 'Указан некорретный формат';
		return false;
	} else if (!isValidFutureDate(date)) {
		hint.textContent = 'Введена некорретная дата доставки';
		return false;
	} else if (!hasValidDateCharacters(date)) {
		hint.textContent = 'Указан некорретный формат';
		return false;
	}

	return true;
}
function validateInputs() {
	const nameInput = document.getElementById('name-input');
	const telInput = document.getElementById('tel-input');
	const dateInput = document.getElementById('date-input');

	nameInput.addEventListener('blur', function () {
		validName = validateName(this.value);
		summaryFields();
	});
	telInput.addEventListener('blur', function () {
		validPhone = validatePhone(this.value);
		summaryFields();
	});
	dateInput.addEventListener('blur', function () {
		validDate = validateDate(this.value);
		summaryFields();
	});
}

validateInputs();
document.addEventListener('DOMContentLoaded', function () {
	const closeButton = document.querySelector('#close-form-button');
	const formItems = [...document.querySelectorAll('.order__form__item')];

	closeButton.addEventListener('click', function () {
		formItems.map((item) => item.classList.toggle('collapsed'));
	});
});
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('order-form');
	const modal = document.getElementById('submit-modal');
	const closeButton = document.querySelector('#close-modal-button');

	form.addEventListener('submit', function (event) {
		event.preventDefault(); // Предотвращаем отправку формы

		// Показываем модальное окно
		modal.style.display = 'block';
	});

	closeButton.addEventListener('click', function () {
		modal.style.display = 'none';
	});

	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	});
});
