// Theme Manager
class ThemeManager {
  constructor() {
    this.themes = {
      default: {
        name: "Default Purple",
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#f093fb",
        background: "#f8f9fa",
        text: "#2c3e50",
      },
      ocean: {
        name: "Ocean Blue",
        primary: "#4facfe",
        secondary: "#00f2fe",
        accent: "#43e97b",
        background: "#f0f8ff",
        text: "#1e3a8a",
      },
      sunset: {
        name: "Sunset Orange",
        primary: "#ff9a9e",
        secondary: "#fecfef",
        accent: "#ffecd2",
        background: "#fff5f5",
        text: "#7c2d12",
      },
      forest: {
        name: "Forest Green",
        primary: "#11998e",
        secondary: "#38ef7d",
        accent: "#4facfe",
        background: "#f0fff4",
        text: "#14532d",
      },
      dark: {
        name: "Dark Mode",
        primary: "#818cf8",
        secondary: "#a78bfa",
        accent: "#22d3ee",
        background: "#111827",
        text: "#f9fafb",
      },
    };

    this.currentTheme = localStorage.getItem("selectedTheme") || "default";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeSelector();
  }
  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-secondary", theme.secondary);
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--theme-background", theme.background);
    root.style.setProperty("--theme-text", theme.text);

    // Dark mode specific contrast adjustments
    if (themeName === "dark") {
      root.style.setProperty("--theme-card-bg", "#1f2937");
      root.style.setProperty("--theme-card-border", "#374151");
      root.style.setProperty("--theme-hover-bg", "#374151");
      root.style.setProperty("--theme-shadow", "rgba(0, 0, 0, 0.5)");
      root.style.setProperty("--theme-input-bg", "#374151");
      root.style.setProperty("--theme-input-border", "#4b5563");
      root.style.setProperty("--theme-nav-text", "#e5e7eb");
      document.body.setAttribute("data-theme", "dark");
    } else {
      root.style.setProperty("--theme-card-bg", "#ffffff");
      root.style.setProperty("--theme-card-border", "#e5e7eb");
      root.style.setProperty("--theme-hover-bg", "#f3f4f6");
      root.style.setProperty("--theme-shadow", "rgba(102, 126, 234, 0.4)");
      root.style.setProperty("--theme-input-bg", "#ffffff");
      root.style.setProperty("--theme-input-border", "#d1d5db");
      root.style.setProperty("--theme-nav-text", "#ffffff");
      document.body.removeAttribute("data-theme");
    }

    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;

    this.currentTheme = themeName;
    localStorage.setItem("selectedTheme", themeName);
  }
  createThemeSelector() {
    // Check if theme selector already exists in HTML
    const existingSelector = document.querySelector(
      ".theme-selector-container"
    );
    if (existingSelector) {
      this.bindThemeEvents();
      return;
    }

    // If no HTML selector exists, create one dynamically (fallback)
    const currentTheme = this.themes[this.currentTheme];

    const themeContainer = document.createElement("div");
    themeContainer.className = "theme-selector-container";
    themeContainer.innerHTML = `
            <button class="theme-toggle-btn" id="themeToggleBtn">
                <div class="theme-color-dots">
                    <div class="color-dot default-dot"></div>
                    <div class="color-dot ocean-dot"></div>
                    <div class="color-dot sunset-dot"></div>
                    <div class="color-dot forest-dot"></div>
                    <div class="color-dot dark-dot"></div>
                </div>
            </button>
            <div class="theme-dropdown" id="themeDropdown">
                ${Object.entries(this.themes)
                  .map(
                    ([key, theme]) => `
                    <div class="theme-option ${
                      key === this.currentTheme ? "active" : ""
                    }" 
                         data-theme="${key}">
                        ${theme.name}
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    document.body.appendChild(themeContainer);
    this.bindThemeEvents();
  }

  bindThemeEvents() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    const dropdown = document.getElementById("themeDropdown");
    const options = document.querySelectorAll(".theme-option");

    if (toggleBtn && dropdown) {
      // Toggle dropdown on button click
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove("show");
        }
      });

      // Handle theme selection
      options.forEach((option) => {
        option.addEventListener("click", (e) => {
          const themeName = e.target.dataset.theme;
          this.selectTheme(themeName);
          dropdown.classList.remove("show");
        });
      });
    }
  }
  selectTheme(themeName) {
    this.applyTheme(themeName);

    // Update active state
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.remove("active");
    });
    const selectedOption = document.querySelector(
      `[data-theme="${themeName}"]`
    );
    if (selectedOption) {
      selectedOption.classList.add("active");
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.themeManager = new ThemeManager();
});
