/* Taste Buds Catering interactions */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
  }

  // Enquiry tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (tabButtons.length && tabPanels.length) {
    const activateTab = (tabName) => {
      tabButtons.forEach(button => {
        const selected = button.dataset.tab === tabName;
        button.setAttribute("aria-selected", String(selected));
        button.setAttribute("tabindex", selected ? "0" : "-1");
      });

      tabPanels.forEach(panel => {
        const active = panel.id === tabName;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    };

    tabButtons.forEach(button => {
      button.addEventListener("click", () => activateTab(button.dataset.tab));

      button.addEventListener("keydown", event => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();

        const current = [...tabButtons].indexOf(button);
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (current + direction + tabButtons.length) % tabButtons.length;

        tabButtons[next].focus();
        activateTab(tabButtons[next].dataset.tab);
      });
    });

    // Allow links such as enquiries.html#vendor to open the correct tab.
    const hash = window.location.hash.replace("#", "");
    if (hash === "vendor" || hash === "event") activateTab(hash);
    else activateTab("event");
  }

  // Demo form handling (frontend only)
  document.querySelectorAll("form[data-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const message = form.querySelector(".form-msg");
      if (!message) return;

      if (!form.checkValidity()) {
        message.textContent = "Please complete all required fields before sending.";
        message.className = "form-msg error";
        form.reportValidity();
        return;
      }

      message.textContent =
        "Thanks! Your enquiry has been received. This demo form is frontend-only, so no data is actually sent.";
      message.className = "form-msg success";
      form.reset();
    });
  });

  // Prevent past dates for event bookings.
  const eventDate = document.querySelector("#ev-date");
  if (eventDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    eventDate.min = `${yyyy}-${mm}-${dd}`;
  }
});
