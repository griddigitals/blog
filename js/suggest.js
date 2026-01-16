(() => {
  const API_URL =
    "https://script.google.com/macros/s/AKfycbyYeev7Iq89apahPfMCeBY6Cj1tuqYfTmZ_RSQo-RPBCJyYgUlJ0nmM7xh9RBrgyYuy/exec";

  const form = document.getElementById("suggestForm");
  if (!form) return;

  const input = document.getElementById("topicInput");
  const responseEl = document.getElementById("suggestResponse");

  function getUserId() {
    let userId = localStorage.getItem("gd_topic_uid");
    if (!userId) {
      userId = `gd_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      localStorage.setItem("gd_topic_uid", userId);
    }
    return userId;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const topic = input.value.trim();
    if (!topic) return;

    responseEl.textContent = "Sending...";
    responseEl.style.color = "#555";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getUserId(),
          topic,
          source: "Homepage"
        })
      });

      const data = await res.json();
      responseEl.textContent = data.message;

      if (data.status === "success") {
        responseEl.style.color = "green";
        input.value = "";
      } else if (data.status === "blocked") {
        responseEl.style.color = "orange";
      } else {
        responseEl.style.color = "red";
      }
    } catch {
      responseEl.textContent =
        "Network error. Please try again later.";
      responseEl.style.color = "red";
    }
  });
})();
