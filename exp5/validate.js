const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Reusable validator functions
function isEmpty(value) {
    return value.trim() === "";
}

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isStrongPassword(pw) {
    return pw.length >= 8;
}

// Display error message
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Clear all error messages
function clearErrors() {
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passError").textContent = "";
}

// Main validation function
function validateForm() {
    let valid = true;
    clearErrors();

    // Name validation
    if (isEmpty(nameInput.value)) {
        showError("nameError", "Name is required");
        valid = false;
    } else if (nameInput.value.trim().length < 3) {
        showError("nameError", "Use at least 3 characters");
        valid = false;
    }

    // Email validation
    if (isEmpty(emailInput.value)) {
        showError("emailError", "Email is required");
        valid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError("emailError", "Enter a valid email");
        valid = false;
    }

    // Password validation
    if (isEmpty(passwordInput.value)) {
        showError("passError", "Password is required");
        valid = false;
    } else if (!isStrongPassword(passwordInput.value)) {
        showError("passError", "Minimum 8 characters");
        valid = false;
    }

    return valid;
}

// Handle form submit
form.addEventListener("submit", (e) => {
    if (!validateForm()) {
        e.preventDefault(); // Stay on page if invalid
    } else {
        alert("Signup successful!");
    }
});
