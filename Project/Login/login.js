console.log(" login.js loaded");

const user = localStorage.getItem("soenav_userData");

if(user){//No-need to login if you didn't log-out
  window.location.href = "../Home/home.html";
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  document.getElementById("errMsg").style.display = "none";
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
      console.log(" Logged in:", data);
      localStorage.setItem("soenav_userData", JSON.stringify(data));
      window.location.href = "../Home/home.html";
    } else {
      document.getElementById("errMsg").style.display = "block";
      document.getElementById("errMsg").innerText = (data.message || "Login failed");//Instead of alert show errmessage in DOM
    }
  } catch (err) {
    console.error(" Login error:", err);
  }
});
