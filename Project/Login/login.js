console.log("✅ login.js loaded");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const netid = document.getElementById("netid").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ netid, password }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("✅ Logged in:", data);
      localStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "../Home/home.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("❌ Login error:", err);
  }
});
