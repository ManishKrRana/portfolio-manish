const form = document.getElementById("form");
const result = document.getElementById("result");
const success = document.getElementById("success");
const req_message = document.querySelectorAll(".error");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);
	result.innerHTML = "Please wait...";
	result.style.background = "transparent";
	result.style.border = "1px solid var(--success-color)";
	result.style.color = "var(--success-color)";

	let isValid = true;

	req_message.forEach((span) => (span.style.display = "none"));

	// First name validation
	const firstName = document.getElementById("first-name").value;
	if (firstName == "") {
		document.getElementById("firstError").style.display = "inline";
		result.style.border = "1px solid var(--required-color)";
		result.innerHTML = "Send message";
		result.style.color = "var(--required-color)";
		isValid = false;
	}

	// Last name validation
	const lastName = document.getElementById("last-name").value;
	if (lastName == "") {
		document.getElementById("lastError").style.display = "inline";
		result.style.border = "1px solid var(--required-color)";
		result.innerHTML = "Send message";
		result.style.color = "var(--required-color)";
		isValid = false;
	}

	// Email validation
	const email = document.getElementById("email").value;
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		document.getElementById("emailError").style.display = "inline";
		result.style.border = "1px solid var(--required-color)";
		result.innerHTML = "Send message";
		result.style.color = "var(--required-color)";
		isValid = false;
	}

	// Phone number validation
	const phoneNo = document.getElementById("phone-no").value;
	const phonePattern = /^[0-9]{10}$/;
	if (!phonePattern.test(phoneNo)) {
		document.getElementById("phoneError").style.display = "inline";
		result.style.border = "1px solid var(--required-color)";
		result.innerHTML = "Send message";
		result.style.color = "var(--required-color)";
		isValid = false;
	}

	// Subject validation
	const subject = document.getElementById("subject").value;
	if (subject == "" || subject.length < 10) {
		document.getElementById("subjectError").style.display = "inline";
		result.style.border = "1px solid var(--required-color)";
		result.innerHTML = "Send message";
		result.style.color = "var(--required-color)";
		isValid = false;
	}

	// Message validation
	const message = document.getElementById("message").value;
	if (message == "" || message.length < 30) {
		document.getElementById("messageError").style.display = "inline";
		result.style.border = "1px solid var(--required-color)";
		result.innerHTML = "Send message";
		result.style.color = "var(--required-color)";
		isValid = false;
	}

	if (isValid) {
		fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: json,
		})
			.then(async (response) => {
				let json = await response.json();
				if (response.status == 200) {
					form.style.display = "none";
					success.style.display = "block";
				} else {
					console.log(response);
					result.innerHTML = json.message;
				}
			})
			.catch((error) => {
				console.log(error);
				result.innerHTML = "Something went wrong!";
			})
			.then(function () {
				form.reset();
				setTimeout(() => {
					result.innerHTML = "Send message";
					result.style.background =
						"linear-gradient(90deg, var(--theme-primary), var(--theme-accent-2))";
					result.style.border = "none";
					result.style.color = "var(--off-white)";
					success.style.display = "none";
					form.style.display = "grid";
				}, 4000);
			});
	}
});
