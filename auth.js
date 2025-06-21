// Authentication functionality
class Auth {
  constructor() {
    this.isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
    this.username = localStorage.getItem("username") || "";
    this.init();
  }

  init() {
    // Update navigation based on authentication status
    this.updateNavigation();
    // Update page-specific elements
    this.updatePageElements();
  }

  login(username) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    this.isAuthenticated = true;
    this.username = username;
    this.updateNavigation();
    // Redirect to homepage after login
    window.location.href = "index.html";
  }

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    this.isAuthenticated = false;
    this.username = "";
    this.updateNavigation();
    // Redirect to homepage after logout
    window.location.href = "index.html";
  }
  updateNavigation() {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    if (this.isAuthenticated) {
      // Show authenticated navigation
      navLinks.innerHTML = `
                <li><a href="index.html" ${
                  currentPage === "index.html" ? 'class="active"' : ""
                }>Home</a></li>
                <li><a href="about.html" ${
                  currentPage === "about.html" ? 'class="active"' : ""
                }>About</a></li>
                <li><a href="typing-test.html" ${
                  currentPage === "typing-test.html" ? 'class="active"' : ""
                }>Typing Test</a></li>
                <li><a href="results.html" ${
                  currentPage === "results.html" ? 'class="active"' : ""
                }>View Results</a></li>
                <li><a href="#" onclick="auth.logout()" class="logout-btn">Logout</a></li>
            `;
    } else {
      // Show unauthenticated navigation (no Typing Test access)
      navLinks.innerHTML = `
                <li><a href="index.html" ${
                  currentPage === "index.html" ? 'class="active"' : ""
                }>Home</a></li>
                <li><a href="about.html" ${
                  currentPage === "about.html" ? 'class="active"' : ""
                }>About</a></li>
                <li><a href="login.html" ${
                  currentPage === "login.html" ? 'class="active"' : ""
                }>Login</a></li>
                <li><a href="register.html" ${
                  currentPage === "register.html" ? 'class="active"' : ""
                }>Register</a></li>
            `;
    }
  }

  updatePageElements() {
    // Update homepage elements
    if (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/"
    ) {
      this.updateHomepage();
    }
  }
  updateHomepage() {
    const heroButtons =
      document.querySelector(".hero-buttons") ||
      document.getElementById("heroButtons");
    if (!heroButtons) return;

    // Also update hero content based on authentication
    const heroContent = document.querySelector(".hero-content h1");
    const heroDescription = document.querySelector(".hero-content p");

    if (this.isAuthenticated) {
      // Show typing test and results buttons for authenticated users
      heroButtons.innerHTML = `
                <a href="typing-test.html" class="btn btn-primary">Start Typing Test</a>
                <a href="results.html" class="btn btn-secondary">View Results</a>
            `;

      // Update content for authenticated users
      if (heroContent) {
        heroContent.textContent = `Welcome , ${this.username}!`;
      }
      if (heroDescription) {
        heroDescription.textContent =
          "Ready to continue improving your typing skills?";
      }
    } else {
      // Only show registration and login options for unauthenticated users
      heroButtons.innerHTML = `
                <a href="register.html" class="btn btn-primary">Sign Up to Start</a>
                <a href="login.html" class="btn btn-secondary">Login</a>
            `;

      // Update content for unauthenticated users
      if (heroContent) {
        heroContent.textContent = "Master Your Typing Skills";
      }
      if (heroDescription) {
        heroDescription.textContent =
          "Sign up or login to access our typing tests and track your progress!";
      }
    }
  }

  // Handle login form submission
  handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple validation (in real app, this would be server-side)
    if (username && password) {
      this.login(username);
    } else {
      alert("Please enter both username and password");
    }
  }

  // Handle registration form submission
  handleRegister(event) {
    event.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Simple validation
    if (!fullname || !email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // In a real app, this would create the account on the server
    // For demo purposes, we'll just log them in
    this.login(username);
  }
}
