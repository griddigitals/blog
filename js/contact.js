document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const button = form.querySelector("button");
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = "Sending...";
    status.classList.remove("show");
    status.textContent = "";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        status.textContent = "✅ Message sent successfully. We’ll get back to you soon.";
        status.style.color = "green";
      } else {
        status.textContent = "❌ Something went wrong. Please try again.";
        status.style.color = "red";
      }

    } catch (error) {
      status.textContent = "❌ Network error. Please check your connection.";
      status.style.color = "red";
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";

      // Show the status message
      status.classList.add("show");

      // Fade out after 5 seconds
      setTimeout(() => {
        status.classList.remove("show");
      }, 5000);
    }
  });
});
