(function ($) {
    "use strict";

    // ---------------------------
    // 1. jQuery Tabs Widget
    // ---------------------------
    function setupTabs() {
        $(".tabs").tabs();
    }

    // ---------------------------
    // 2. Slideshow/Carousel
    // ---------------------------
    function setupSlideshow() {
        $(".slideshow").slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2500
        });
    }

    // ---------------------------
    // 3. Dog API - Ajax Call
    // ---------------------------
    function fetchDogs() {
        const apiKey = "live_e2F6AK3uHfyffqzrlObLPsW7RpmEQCDTU3HbOnITD9XOdv1LoXI9lfiB28ZRPG1m"; // your real key
        $.ajax({
            url: "https://api.thedogapi.com/v1/images/search?limit=6",
            method: "GET",
            headers: {
                "x-api-key": apiKey
            },
            dataType: "json"
        }).done(function (data) {
            let output = "<div class='dog-gallery'>";
            data.forEach(function (dog) {
                output += `<img src="${dog.url}" alt="Adoptable puppy" class="dog-photo">`;
            });
            output += "</div>";
            $("#dogDisplay").html(output);
        }).fail(function () {
            $("#dogDisplay").html("<p>Could not load adorable puppies. Try again later.</p>");
        });
    }

    // ---------------------------
    // 4. Product Display Buttons
    // ---------------------------
    function setupProductSwitching() {
        $(".product-controls button").click(function () {
            $(".product").addClass("hide");
            const productID = $(this).attr("data-product");
            $("#" + productID).removeClass("hide");
        });
    }

    // ---------------------------
    // 5. Form Validation & Web Storage
    // ---------------------------
    function setupFormValidation() {
        const form = document.getElementById("fullForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            validateForm();
        });
    }

    function validateForm() {
        const firstName = $("#firstName").val().trim();
        const lastName = $("#lastName").val().trim();
        const email = $("#email").val().trim();
        const comments = $("#comments").val().trim();
        const errorList = $("#errorList");

        errorList.empty().addClass("hide");

        let errors = [];

        if (firstName === "") errors.push("First name is required.");
        if (lastName === "") errors.push("Last name is required.");
        if (comments === "") errors.push("Comments are required.");

        if (!$("#selectedPhone").is(":checked") && !$("#selectedEmail").is(":checked")) {
            errors.push("Select a preferred contact method.");
        }

        if ($("#selectedEmail").is(":checked") && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.push("Invalid email format.");
        }

        if (errors.length > 0) {
            errors.forEach(function (err) {
                errorList.append(`<p>${err}</p>`);
            });
            errorList.removeClass("hide");
        } else {
            const userInfo = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                comments: comments
            };

            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            errorList.removeClass("hide").html(`<p class="success-message">Thank you, ${firstName} ${lastName}! Form submitted successfully.</p>`);
        }
    }

    // ---------------------------
    // 6. Light/Dark Mode Toggle
    // ---------------------------
    function toggleThemeButton() {
        $("#clickme").click(function () {
            $("body").toggleClass("light-mode dark-mode");
            toggleImage();
        });
    }

    function toggleImage() {
        const img = $("#image");
        if (img.attr("src").includes("sunny")) {
            img.attr("src", "crecent moon.png");
        } else {
            img.attr("src", "sunnynew.png");
        }
    }

    // ---------------------------
    // 7. Discount Generator (Number Guessing Game)
    // ---------------------------
    $("#guessingGame").on("submit", function (event) {
        event.preventDefault();
        const randomNum = Math.floor(Math.random() * 10) + 1;
        const userGuess = parseInt($("#userDisplay").val());
        const message = $("#message");

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            message.text("Please enter a number between 1 and 10.");
        } else if (userGuess === randomNum) {
            message.text(`Congratulations! You won a $${userGuess} discount!`);
        } else {
            message.text("Sorry, no discount. Try again!");
        }
    });

    // ---------------------------
    // Document Ready (Initialize Everything)
    // ---------------------------
    $(function () {
        setupTabs();
        setupProductSwitching();
        setupSlideshow();
        fetchDogs();
        setupFormValidation();
        toggleThemeButton();

        $("#loadMoreDogs").click(function () {
            fetchDogs();
        });
    });

})(jQuery);
