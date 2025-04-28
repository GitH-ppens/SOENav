// Load saved events on page load
window.addEventListener('load', async function() {
    try {
        const userData = JSON.parse(localStorage.getItem("soenav_userData")); // FIXED KEY ✅
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

// Add event form submit
document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDay = document.getElementById('eventDay').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    createEventBlock(eventName, eventDay, startTime, endTime);

    // Save to backend
    try {
        const userData = JSON.parse(localStorage.getItem("soenav_userData")); // FIXED KEY ✅
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

// Helper function to create event block
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


