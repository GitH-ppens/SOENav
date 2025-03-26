document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDay = document.getElementById('eventDay').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);

    const startPosition = (startHour * 60 + startMinute) / 60 * 50;
    const endPosition = (endHour * 60 + endMinute) / 60 * 50;
    const height = endPosition - startPosition;
    console.log(height);
    const width = document.getElementById(eventDay).getBoundingClientRect().width-15;console.log(width);

    const eventBlock = document.createElement('div');
    eventBlock.className = 'event-block';
    eventBlock.style.top = `${startPosition}px`;
    eventBlock.style.height = `${height}px`;
    eventBlock.style.width = `${width}px`;
    eventBlock.innerHTML = `
        ${eventName}
        <span class="close-btn" onclick="this.parentElement.remove()">x</span>
    `;

    document.getElementById(eventDay).appendChild(eventBlock);

    document.getElementById('eventForm').reset();
});