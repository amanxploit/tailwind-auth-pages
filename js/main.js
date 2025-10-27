document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const loginButton = document.getElementById("loginButton");
  const togglePassword = document.getElementById("togglePassword");
  const forgotPassword = document.getElementById("forgotPassword");
  const signupLink = document.getElementById("signupLink");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });

  // Email validation
  emailInput.addEventListener("blur", function () {
    if (!validateEmail(this.value)) {
      emailError.classList.remove("hidden");
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 500);
    } else {
      emailError.classList.add("hidden");
    }
  });

  // Password validation
  passwordInput.addEventListener("blur", function () {
    if (this.value.length < 6) {
      passwordError.classList.remove("hidden");
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 500);
    } else {
      passwordError.classList.add("hidden");
    }
  });

  // Form submission
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const remember = document.getElementById("remember").checked;

    // Validate form
    let isValid = true;

    if (!validateEmail(email)) {
      emailError.classList.remove("hidden");
      emailInput.classList.add("shake");
      setTimeout(() => emailInput.classList.remove("shake"), 500);
      isValid = false;
    }

    if (password.length < 6) {
      passwordError.classList.remove("hidden");
      passwordInput.classList.add("shake");
      setTimeout(() => passwordInput.classList.remove("shake"), 500);
      isValid = false;
    }

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors in the form",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "OK",
        customClass: {
          popup: "text-sm",
        },
      });
      return;
    }

    // Simulate login process
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i> Signing In...';
    loginButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Check for demo credentials
      if (email === "admin@example.com" && password === "password") {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to your dashboard...",
          confirmButtonColor: "#2563eb",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "text-sm",
          },
        }).then(() => {
          // Redirect to dashboard
          window.location.href = "dashboard.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Try: admin@example.com / password",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "text-sm",
          },
        });
      }

      loginButton.innerHTML = originalText;
      loginButton.disabled = false;
    }, 1500);
  });

  // Forgot password
  forgotPassword.addEventListener("click", function (e) {
    e.preventDefault();

    Swal.fire({
      title: "Reset Password",
      html: `
                        <input type="email" id="resetEmail" class="swal2-input text-sm" placeholder="Your email address">
                        <p class="text-xs text-gray-500 mt-2">We'll send a reset link to your email</p>
                    `,
      confirmButtonText: "Send Reset Link",
      confirmButtonColor: "#2563eb",
      showCancelButton: true,
      customClass: {
        popup: "text-sm",
      },
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#resetEmail").value;
        if (!validateEmail(email)) {
          Swal.showValidationMessage("Please enter a valid email address");
          return false;
        }
        return { email: email };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Reset Link Sent!",
          text: "Check your email for the password reset link",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "text-sm",
          },
        });
      }
    });
  });

  // Sign up link
  signupLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "signup.html";
  });

  // Helper function to validate email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

//SignUp Page JS

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const termsError = document.getElementById("termsError");
  const signupButton = document.getElementById("signupButton");
  const togglePassword = document.getElementById("togglePassword");
  const passwordStrength = document.getElementById("passwordStrength");
  const strengthText = document.getElementById("strengthText");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });

  // Password strength indicator
  passwordInput.addEventListener("input", function () {
    const password = this.value;
    let strength = 0;

    // Length check
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    // Update strength meter
    passwordStrength.className = "password-strength";

    if (strength <= 25) {
      passwordStrength.classList.add("strength-weak");
      passwordStrength.style.width = "25%";
      strengthText.textContent = "Weak";
      strengthText.className = "text-2xs font-medium text-red-500";
    } else if (strength <= 50) {
      passwordStrength.classList.add("strength-fair");
      passwordStrength.style.width = "50%";
      strengthText.textContent = "Fair";
      strengthText.className = "text-2xs font-medium text-yellow-500";
    } else if (strength <= 75) {
      passwordStrength.classList.add("strength-good");
      passwordStrength.style.width = "75%";
      strengthText.textContent = "Good";
      strengthText.className = "text-2xs font-medium text-blue-500";
    } else {
      passwordStrength.classList.add("strength-strong");
      passwordStrength.style.width = "100%";
      strengthText.textContent = "Strong";
      strengthText.className = "text-2xs font-medium text-green-500";
    }
  });

  // Name validation
  fullNameInput.addEventListener("blur", function () {
    if (this.value.trim().length < 2) {
      nameError.classList.remove("hidden");
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 300);
    } else {
      nameError.classList.add("hidden");
    }
  });

  // Email validation
  emailInput.addEventListener("blur", function () {
    if (!validateEmail(this.value)) {
      emailError.classList.remove("hidden");
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 300);
    } else {
      emailError.classList.add("hidden");
    }
  });

  // Password validation
  passwordInput.addEventListener("blur", function () {
    if (this.value.length < 6) {
      passwordError.classList.remove("hidden");
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 300);
    } else {
      passwordError.classList.add("hidden");
    }
  });

  // Confirm password validation
  confirmPasswordInput.addEventListener("blur", function () {
    if (this.value !== passwordInput.value) {
      confirmPasswordError.classList.remove("hidden");
      this.classList.add("shake");
      setTimeout(() => this.classList.remove("shake"), 300);
    } else {
      confirmPasswordError.classList.add("hidden");
    }
  });

  // Form submission
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const terms = document.getElementById("terms").checked;

    // Validate form
    let isValid = true;

    if (fullName.trim().length < 2) {
      nameError.classList.remove("hidden");
      fullNameInput.classList.add("shake");
      setTimeout(() => fullNameInput.classList.remove("shake"), 300);
      isValid = false;
    }

    if (!validateEmail(email)) {
      emailError.classList.remove("hidden");
      emailInput.classList.add("shake");
      setTimeout(() => emailInput.classList.remove("shake"), 300);
      isValid = false;
    }

    if (password.length < 6) {
      passwordError.classList.remove("hidden");
      passwordInput.classList.add("shake");
      setTimeout(() => passwordInput.classList.remove("shake"), 300);
      isValid = false;
    }

    if (password !== confirmPassword) {
      confirmPasswordError.classList.remove("hidden");
      confirmPasswordInput.classList.add("shake");
      setTimeout(() => confirmPasswordInput.classList.remove("shake"), 300);
      isValid = false;
    }

    if (!terms) {
      termsError.classList.remove("hidden");
      isValid = false;
    } else {
      termsError.classList.add("hidden");
    }

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Please check the form",
        text: "Some fields need attention",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "OK",
        customClass: {
          popup: "text-sm",
          title: "text-sm",
          htmlContainer: "text-xs",
        },
      });
      return;
    }

    // Simulate signup process
    const originalText = signupButton.innerHTML;
    signupButton.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-1"></i> Creating...';
    signupButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to our platform",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "text-sm",
          title: "text-sm",
          htmlContainer: "text-xs",
        },
      }).then(() => {
        // Redirect to login page
        window.location.href = "index.html";
      });

      signupButton.innerHTML = originalText;
      signupButton.disabled = false;
    }, 1500);
  });

  // Helper function to validate email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
