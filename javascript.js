"use strict";

// Verify form
const form = document.getElementById("fullForm");

// Function to validate the form
function isFormValid(event) {
    event.preventDefault(); // Prevent the default form submission

    // Form inputs
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const phone = document.querySelector("#phone");
    const email = document.querySelector("#email");
    const comments = document.querySelector("#comments");
    const errorList = document.getElementById("errorList");

    // Radio buttons for contact method
    const radioPhone = document.getElementById("selectedPhone");
    const radioEmail = document.getElementById("selectedEmail");

    // Initialize errors array
    let errors = [];
    errorList.classList.add("hide");
    clearErrors([firstName, lastName, email, phone, comments, radioPhone, radioEmail]);

    // Regex patterns
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

    // Check first name and last name
    if (!firstName.value.match(nameRegex)) {
        setError(firstName, "Please provide a valid first name (letters only).");
        errors.push("Invalid first name.");
    }

    if (!lastName.value.match(nameRegex)) {
        setError(lastName, "Please provide a valid last name (letters only).");
        errors.push("Invalid last name.");
    }

    // Check comments
    if (comments.value.trim() === "") {
        setError(comments, "Comments cannot be empty.");
        errors.push("Comments cannot be empty.");
    }

    // Check if the radio button for preferred method is selected
    if (!radioPhone.checked && !radioEmail.checked) {
        setError(radioPhone, "Please select a preferred method of contact.");
        errors.push("Please select a preferred contact method.");
    }

    // Check phone number only if Phone is selected
    if (radioPhone.checked && !phone.value.match(phoneRegex)) {
        setError(phone, "Please provide a valid phone number.");
        errors.push("Invalid phone number.");
    }

    // Check email only if Email is selected
    if (radioEmail.checked && (!email.value.match(regexEmail) || email.value === "")) {
        setError(email, "Please provide a valid email address.");
        errors.push("Invalid email address.");
    }

    // If there are errors, show the error container and stop the function
    if (errors.length > 0) {
        errorList.classList.remove("hide");
        return;
    }

    // If no errors, display the thank you message
    displayThankYouMessage(firstName.value, lastName.value);
}

// Function to display the thank you message
function displayThankYouMessage(firstName, lastName) {
    const errorList = document.getElementById("errorList");

    // Create a thank you message
    const successMessage = document.createElement("p");
    successMessage.innerHTML = `Thank you, ${firstName} ${lastName}! Your form was successfully submitted.`;
    successMessage.classList.add("success-message");

    errorList.innerHTML = ""; // Clear any existing errors
    errorList.appendChild(successMessage);
    errorList.classList.remove("hide");
}

// Function to clear previous error highlights and messages
function clearErrors(elements) {
    elements.forEach((element) => {
        element.classList.remove("error");
        if (element.nextElementSibling && element.nextElementSibling.classList.contains("error-msg")) {
            element.nextElementSibling.textContent = ""; // Clear the error message text
        }
    });
}

// Function to set errors and display next to inputs
function setError(element, message) {
    element.classList.add("error");
    if (element.nextElementSibling && element.nextElementSibling.classList.contains("error-msg")) {
        element.nextElementSibling.textContent = message;
    }
}

// Event listener for form submission
form.addEventListener("submit", isFormValid);


// Toggle Light/Dark Mode
function toggleImage() {
    let img = document.getElementById("image");
    if (img.src.includes("sunny")) {
        img.src = "crecent moon.png";
    } else {
        img.src = "sunnynew.png";
    }
}

function toggleMode() {
    let body = document.body;
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }
}

// Product Display Toggle
const products = document.querySelectorAll(".product");
const productButtons = document.querySelectorAll(".product-controls button");

function showProduct(event) {
    // Hide all products
    products.forEach((product) => product.classList.add("hide"));

    // Show the selected product
    const productID = event.target.getAttribute("data-product");
    document.getElementById(productID).classList.remove("hide");
}

// Add event listeners to product buttons
productButtons.forEach((button) => button.addEventListener("click", showProduct));

// Display the first product by default
document.getElementById("product1").classList.remove("hide");

// Discount generator
function randomNum(event) {
    event.preventDefault(); // Prevent default form submission
    let randNum = Math.floor(Math.random() * 10) + 1;
    let numInput = document.getElementById("userDisplay");
    let userInput = Number(numInput.value);
    let output = document.getElementById("message");

    if (userInput < 1 || userInput > 10 || isNaN(userInput)) {
        output.innerHTML = "Please enter a number between 1 and 10.";
    } else if (randNum === userInput) {
        output.innerHTML = `You've won a $${userInput} discount!`;
    } else {
        output.innerHTML = `Sorry, no discounts for you. Try again!`;
    }
}

// Event listener for random number generator
document.getElementById("submitButton").addEventListener("click", randomNum);
