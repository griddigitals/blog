const SUGGEST_API_URL =
  "https://script.google.com/macros/s/AKfycbyHsBg3LhErNMCgZYs2LhpXzO4VN-fn0v9dp88CKZIS6gKuG3jg0VO69qnGz30pL4rY/exec";

function getUserId() {
  let userId = localStorage.getItem("gd_topic_uid");
  if (!userId) {
    userId = "gd_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    localStorage.setItem("gd_topic_uid", userId);
  }
  return userId;
}

document.getElementById("suggestForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const input = document.getElementById("topicInput");
  const responseEl = document.getElementById("suggestResponse");
  const topic = input.value.trim();

  if (!topic) return;

  responseEl.textContent = "Sending...";
  responseEl.style.color = "#555";

  const formData = new FormData();
  formData.append("userId", getUserId());
  formData.append("topic", topic);
  formData.append("source", "Homepage");

  try {
    const res = await fetch(SUGGEST_API_URL, {
      method: "POST",
      body: formData
    });

    const data = JSON.parse(await res.text());

    responseEl.textContent = data.message;

    if (data.status === "success") {
      responseEl.style.color = "green";
      input.value = "";
    } else if (data.status === "blocked") {
      responseEl.style.color = "orange";
    } else {
      responseEl.style.color = "red";
    }

  } catch (err) {
    responseEl.textContent = "Network error. Please try again later.";
    responseEl.style.color = "red";
  }
});

