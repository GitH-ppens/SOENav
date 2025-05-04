let user = localStorage.getItem("soenav_userData");
let totalCourseGroups = 0;//All required courseGroups for major
let completed = 0;//completed courses of requirements

// Redirect to login if not authenticated
if (!user) {
    window.location.href = "../Login/login.html";
}

const userData = JSON.parse(user);

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
        if(i.match(/^([\d:]+)\s*:\s*(.*)$/))i=i.match(/^([\d:]+)\s*:\s*(.*)$/)[1].trim();//TechnicalElectives edge case(No courseNum)
        else{
            continue;
        }
        const res = await fetch("http://localhost:3000/courseInfo", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body:  i,
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
  
let missingCourses = []//Creating a list for course planner
async function getMajorRequirements(){
    const res = await fetch("http://localhost:3000/requirement", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: userData.major,
    });

    const data = await res.json();
    const REQS = JSON.parse(data.requirements);//REQS is an array of object(requirements)
    //Sort the Requirements into R1,R2,R3...Sort by reqID
    REQS.sort((a, b) => {
        // Extract numbers from IDs (assuming format "R##")
        const numA = parseInt(a.reqID.substring(1));
        const numB = parseInt(b.reqID.substring(1));
        return numA - numB;
      });
    //Then Calculate progresscompletion here. Set the style.--progress to this value(This is a percentage).
    for (let requirement of REQS) {//(i.e object of list)You can add the req blocks here too
        let Rcontent = `<h4>${requirement.reqTitle}</h4>`;
        for (let courseGroup of requirement.courses) {
            totalCourseGroups++;
        
            // Extract all course numbers from {course1,alt1,alt2,...}
            const courseNumbers = courseGroup.slice(1, -1).split(',').map(c => c.trim());
           
            // Check if any course in this group is taken
            const hasTaken = userData.coursesTaken.some(takenCourse => {
                const takenNumber = takenCourse.split(' : ')[0].trim();
                return courseNumbers.includes(takenNumber);
            });
        
            if (hasTaken){//Taken course
                completed++;
                Rcontent += `\n<span class='green'>✔</span> ${courseGroup}<br>`;
            }
            else{//Not taken coourse
                Rcontent += `\n<span class='red'>✖</span> ${courseGroup}<br>`;
                missingCourses.push(courseNumbers[0]);
            }
        }
        document.getElementById('progress').insertAdjacentHTML("beforeend", `<div id=${requirement.reqID} class="semester-block ${requirement.reqID}">
            ${Rcontent}
          </div>`);
    }
    localStorage.setItem("missingCourses", JSON.stringify(missingCourses));
    document.getElementById("remaining_courses").textContent = totalCourseGroups - completed;
    document.querySelector(".progress-bar").style.setProperty('--progress', `${((completed*100)/totalCourseGroups).toFixed(2)}%`)
    //Then manipulate the dom to display the degree requirements...Follow or improve on the example below.
    //for each i in REQS..add a div block
    /**
     *  <div class="semester-block firstSemester">
        <h4>Freshman Year- Fall{This is the Req Title}</h4>

        <div class = firstSemester courseReqs>
        Fill in the courses here and display the legend if the user has completed it, or not
        </div>
      </div>
     */
}
