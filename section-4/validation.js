document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let isValid = true;
    // Validate name (should not be empty)
    if (name === "" || name === null) {
      alert("Name is required.");
      isValid = false;
    }

    // Validate email (should match email pattern)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      isValid = false;
    }

    // Validate password (must be at least 8 characters)
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
