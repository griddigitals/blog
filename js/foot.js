// Footer newsletter subscription
(() => {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const emailInput = document.getElementById("email-input");
  const message = document.getElementById("newsletter-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset message
    message.style.display = "none";
    message.textContent = "";

    // EMPTY FIELD
    if (!email) {
      message.style.color = "orange";
      message.style.display = "block";
      message.textContent = "Please enter your email to subscribe.";
      setTimeout(() => {
        message.style.display = "none";
      }, 4000);
      return;
    }

    // INVALID EMAIL
    if (!emailRegex.test(email)) {
      message.style.color = "red";
      message.style.display = "block";
      message.textContent =
        "Oops! Please make sure your email is correct and try again.";
      setTimeout(() => {
        message.style.display = "none";
      }, 4000);
      return;
    }

    // SEND TO BREVO / SUCCESS
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    })
      .then(() => {
        message.style.color = "green";
        message.style.display = "block";
        message.textContent =
          "Thanks for subscribing! You’re now part of Grid Digitals.";
        form.reset();
        setTimeout(() => {
          message.style.display = "none";
        }, 4000);
      })
      .catch(() => {
        message.style.color = "red";
        message.style.display = "block";
        message.textContent =
          "Something went wrong. Please try again.";
        setTimeout(() => {
          message.style.display = "none";
        }, 4000);
      });
  });
})();
