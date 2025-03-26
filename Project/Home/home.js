//todo: I feel we need a unique identifier...not 'userData' since there can be conflict
let user = localStorage.getItem("soenav_userData");

// Redirect to login if not authenticated
if (!user) {
    window.location.href = "../Login/login.html";
}

const userData = JSON.parse(user);
console.log(" Home loaded, soenav_userData:", userData);

// Fill user details in DOM
if (userData) {
    document.querySelectorAll(".user-name").forEach(el => {
        el.innerHTML = `<strong>Name:</strong> ${userData.name}`;
    });

    document.getElementById("user-netid").innerHTML = `<strong>NetID:</strong> ${userData.netID}`;
    document.getElementById("user-grad").innerHTML = `<strong>Year Of Graduation:</strong> ${userData.expectedGradDate}`;
    document.getElementById("user-gradm").innerHTML = `<strong>Month Of Graduation:</strong> May`;
    document.getElementById("user-school").innerHTML = `<strong>School Code:</strong> 14 (School of Engineering)`;
    document.getElementById("user-major").innerHTML = `<strong>Declared major: </strong>${userData.major}`;
}

//CourseList and course Progress
let listContent = '';
getCourseInfoFromServer();//Populate courselist
getMajorRequirements();//populate the requirement progress

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("soenav_userData"); // Clear session
    window.location.href = "../index.html"; // Redirect to login
});

async function getCourseInfoFromServer(){
    for(let i of userData.coursesTaken){
        const res = await fetch("http://localhost:3000/courseInfo", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: i.match(/^([\d:]+)\s*:\s*(.*)$/)[1].trim(),
        });
    
        const data = await res.json();
        
        //reformat the pre-reqs
        let prereqs = data.prereqs;
        content = "";
        if (!prereqs || prereqs.length === 0) {
            content =  "None";
        }
        else{
            content = prereqs.map(group => `(${group.join(" or ")})`);content = content.join(" & ");
        }
        
        listContent += `<tr><td>${data.courseName}</td><td>${data.coursenum}</td><td>${"Fall"}</td><td>${content}</td><td>${"PrereqFor"}</td><td>${data.credits}</td></tr>\n`
    }
    document.getElementById("course-list-table").innerHTML = listContent;
}
  
async function getMajorRequirements(){
    const res = await fetch("http://localhost:3000/requirements", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: userData.major,
    });

    const data = await res.json();

}

