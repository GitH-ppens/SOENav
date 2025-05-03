let  sched = {};//Schedule initiliazed
const creditLimit = 21;
// Load saved events on page load
window.addEventListener('load', async function() {
    try {
        const userData = JSON.parse(localStorage.getItem("soenav_userData")); 
        if (!userData) {
            console.error("No user data found. Please log in again.");
            return;
        }
        const netID = userData.netID;

        const response = await fetch('http://localhost:3000/getEvents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ netID })
        });

        const events = await response.json();

        for (let ev of events) {
            sched[ev.eventName] = { day: ev.eventDay, start: ev.startTime, end: ev.endTime};
            createEventBlock(ev.eventName, ev.eventDay, ev.startTime, ev.endTime);
        }
    } catch (err) {
        console.error("Error loading events:", err);
    }
});

// Show user name in the navbar
window.addEventListener('load', function() {
    const userData = JSON.parse(localStorage.getItem("soenav_userData"));
    if (userData && userData.name) {
        const userNameElement = document.querySelector('.user-name');
        userNameElement.textContent = userData.name;
    }
});
    
// Logout button functionality
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("soenav_userData"); // Clear session
    window.location.href = "../../index.html"; // Redirect to login
});


document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDay = document.getElementById('eventDay').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    createEventBlock(eventName, eventDay, startTime, endTime);

    // Save to backend
    try {
        const userData = JSON.parse(localStorage.getItem("soenav_userData")); 
        if (!userData) {
            console.error("No user data found. Please log in again.");
            return;
        }
        const netID = userData.netID;

        const response = await fetch('http://localhost:3000/saveEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventName, eventDay, startTime, endTime, netID })
        });

        const data = await response.json();
        if (!data.success) {
            console.error("Failed to save event:", data.message);
        }
    } catch (err) {
        console.error("Error saving event:", err);
    }

    document.getElementById('eventForm').reset();
});

document.getElementById("recon").addEventListener("click", async ()=>{
    let creditCount = 0;
    //alert('getting schedule');
    //Keeping the recommendation algorithm simple except you wanna improve it.
    //You keep a credit count, and the first 20 or max credit in the list of uncompleted gets recommended no matter the semester or year.
    for(const course of JSON.parse(localStorage.getItem("missingCourses"))){
        const result = await getCourseSchedule(course);
        //console.log(result);//debugging
        if(result){
            let nonConflicts = getNonConflictingOpenSections(result.sections, sched);
            console.log(`${nonConflicts.length} out of ${result.openSections} open sections`);
            if(nonConflicts.length>0){
                let gotoryuji = nonConflicts.length > 0 ? nonConflicts[0] : nonConflicts;//Don't touch my varible names!!!
                creditCount += result.credits;
                if(creditCount>=creditLimit){
                    alert(`Done recommending. Found a total of ${creditCount} credits`);
                    break;
                }
                gotoryuji.meetingTimes.forEach(meeting => {  
                    const startTime = formatTime(meeting.startTime);
                    const endTime = formatTime(meeting.endTime);
        
                    // Add to schedule
                    sched[gotoryuji.index] = {
                        day: shortToLongDay(meeting.meetingDay),
                        start: startTime,
                        end: endTime,
                    };
        
                    // Create event block for each meeting time
                    createEventBlock(gotoryuji.index,shortToLongDay(meeting.meetingDay),startTime,endTime);
                });
            }
        }
        // We wait 5 secs since we are using a proxy to bypass CORS
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
})

// function to create event block
function createEventBlock(eventName, eventDay, startTime, endTime) {
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);

    const startPosition = (startHour * 60 + startMinute) / 60 * 50;
    const endPosition = (endHour * 60 + endMinute) / 60 * 50;
    const height = endPosition - startPosition;
    const width = document.getElementById(eventDay).getBoundingClientRect().width - 15;

    const eventBlock = document.createElement('div');
    eventBlock.className = 'event-block';
    eventBlock.style.top = `${startPosition}px`;
    eventBlock.style.height = `${height}px`;
    eventBlock.style.width = `${width}px`;
    eventBlock.innerHTML = `
        ${eventName}
        <span class="close-btn">x</span>
    `;

    document.getElementById(eventDay).appendChild(eventBlock);

    // Attach click event to the X
    const closeButton = eventBlock.querySelector('.close-btn');
    closeButton.addEventListener('click', async function(event) {
        event.stopPropagation(); // Stop event bubbling, just in case

        const userData = JSON.parse(localStorage.getItem("soenav_userData"));
        const netID = userData.netID;

        try {
            const response = await fetch('http://localhost:3000/deleteEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventName, eventDay, startTime, endTime, netID })
            });

            const data = await response.json();
            if (data.success) {
                eventBlock.remove(); // Only remove from screen if deleted successfully
            } else {
                console.error("Failed to delete event:", data.message);
            }
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    });
}
let ruSoc = 'https://api.allorigins.win/raw?url=';//This is the proxy or we can forward to out backend which calls the api and returns to us...
const baseUrl = "http://sis.rutgers.edu/oldsoc/courses.json?semester=92025&campus=NB&level=UG&subject=";

async function getCourseSchedule(course) {
    try {
        let list = course.split(":");
        const subj = list[1];
        const courseNum = list[2]
        const response = await fetch(`${ruSoc}${encodeURIComponent(baseUrl)}${subj}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': 'http://127.0.0.1:5500'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const courses = await response.json();
        let courseData = courses.find(course => course.courseNumber == courseNum);//could be undefined
        let secAvail = courseData ? courseData.openSections : null;
        courseData = secAvail > 0 ? courseData : null;
        return courseData;//only return those with opnesections
    } catch (error) {
        console.error(`Error with subject:`, error.message);
    }
    return null;
}
//Fast way to convert shorthand days to longhand...lol
const DAYS_SHORT = ['M', 'T', 'W', 'TH', 'F', 'SA', 'SU'];
const DAYS_LONG = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Convert short code to long day name
function shortToLongDay(shortDay) {
    const index = DAYS_SHORT.findIndex(d => d === shortDay.toUpperCase());
    return index >= 0 ? DAYS_LONG[index] : shortDay.toLowerCase();
}

// Convert long day name to short code
function longToShortDay(longDay) {
    const index = DAYS_LONG.findIndex(d => d === longDay.toLowerCase());
    return index >= 0 ? DAYS_SHORT[index] : longDay.toUpperCase();
}
 
function convertToMilitaryTime(timeStr) {
    return timeStr.split(':').slice(0, 2).join('');
}

// Convert military time to HH:MM:SS format (e.g., "1430" to "14:30:00")
function formatTime(militaryTime){
    return `${militaryTime.substring(0, 2)}:${militaryTime.substring(2)}:00`;
};

//Converts military time ('1445') to minutes since midnight (885)
function timeToMinutes(militaryTime) {
    const hours = parseInt(militaryTime.substring(0, 2));
    const minutes = parseInt(militaryTime.substring(2));
    return hours * 60 + minutes;
}

function getNonConflictingOpenSections(sections, schedule) {
    // First filter only open sections
    const openSections = sections.filter(section => section.openStatus === true);
    
    // Convert schedule to conflict checking 
    const scheduleEntries = Object.values(schedule).map(item => ({
      day: longToShortDay(item.day),  // 'monday' to 'M'
      start: convertToMilitaryTime(item.start),  // '14:45:00' to '1445'
      end: convertToMilitaryTime(item.end)
    }));
  
    // Check each open section for conflicts
    return openSections.filter(section => {
      return !hasAnyConflict(section.meetingTimes, scheduleEntries);
    });
}

function hasAnyConflict(meetingTimes, scheduleEntries) {
    return meetingTimes.some(meeting => {
      return scheduleEntries.some(scheduledItem => {
        // Check if same day
        if (meeting.meetingDay !== scheduledItem.day) return false;
        
        // Check time overlap
        return timeRangesOverlap(
          [meeting.startTime, meeting.endTime],
          [scheduledItem.start, scheduledItem.end]
        );
      });
    });
}

function timeRangesOverlap(range1, range2, buffer = 15) {
    const [start1, end1] = range1.map(timeToMinutes);
    const [start2, end2] = range2.map(timeToMinutes);
    return (start1 - buffer) < (end2 + buffer) && 
           (start2 - buffer) < (end1 + buffer);
}
