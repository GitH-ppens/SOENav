// Redirect to login if not authenticated
let user = localStorage.getItem("userData");
console.log("User in home.js:", user);

if (!user) {
    window.location.href = "../Login/login.html";
}

const userData = JSON.parse(user);
console.log("✅ Home loaded, userData:", userData);

// ✅ Fill user details in DOM
if (userData) {
    document.querySelectorAll(".user-name").forEach(el => {
        el.innerHTML = `<strong>Name:</strong> ${userData.name}`;
    });

    document.getElementById("user-netid").innerHTML = `<strong>NetID:</strong> ${userData.netID}`;
    document.getElementById("user-grad").innerHTML = `<strong>Year Of Graduation:</strong> ${userData.expectedGradDate}`;
    document.getElementById("user-gradm").innerHTML = `<strong>Month Of Graduation:</strong> May`;
    document.getElementById("user-school").innerHTML = `<strong>School Code:</strong> 14 (School of Engineering)`;
}

// 🧠 Your course parsing logic
let a = document.getElementById('courseDataParent');
let y = [];

if (a) {
    let i = 0;
    Array.from(a.children).forEach(child => {
        if (child.id) {
            let uv = `${child.id.substring(12,22)}.${i}.courseMetadata.title`;
            let diva = document.getElementById(uv) ? document.getElementById(uv).textContent : '';
            y.push(child.id.substring(12,22) + " : " + diva);
            i++;
        }
    });
}

let s = '';
for (let i of y) {
    s += `\n<option> ${i} </option>`;
}
console.log("Parsed courses:\n", s);
