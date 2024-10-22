let notes = {};
let currentUser = localStorage.getItem('currentUser');
let currentDate = new Date();
let selectedDate = null;

function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    notes = storedNotes[currentUser] || {};
}

function saveNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    storedNotes[currentUser] = notes;
    localStorage.setItem('notes', JSON.stringify(storedNotes));
}

function generateCalendar() {
    loadNotes();
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    const weekdays = document.getElementById('weekdays');

    calendar.innerHTML = '';
    weekdays.innerHTML = '';

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthYear.innerText = `${month + 1}/${year}`;

    const weekdayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    weekdayNames.forEach(day => {
        const weekdayElement = document.createElement('div');
        weekdayElement.className = 'weekday';
        weekdayElement.innerText = day;
        weekdays.appendChild(weekdayElement);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyElement = document.createElement('div');
        calendar.appendChild(emptyElement);
    }

    for (let date = 1; date <= lastDate; date++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerText = date;

        const noteKey = `${year}-${month + 1}-${date}`;
        if (notes[noteKey]) {
            const noteContent = document.createElement('div');
            noteContent.className = 'note';
            noteContent.innerText = notes[noteKey].slice(0, 30) + (notes[noteKey].length > 30 ? '...' : '');
            dayElement.appendChild(noteContent);
        }

        const today = new Date();
        const isToday = today.getDate() === date && today.getMonth() === month && today.getFullYear() === year;
        const isSelectedDate = selectedDate && selectedDate.getDate() === date && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

        if (isToday) {
            dayElement.style.backgroundColor = '#ffd700'; // Màu cho ngày hiện tại
        } else if (isSelectedDate) {
            dayElement.style.border = '2px solid #007BFF'; // Viền cho ngày đã chọn
        }

        dayElement.onclick = () => {
            selectedDate = new Date(year, month, date);
            updateEventDetails(noteKey);
            document.getElementById('modalDate').innerText = noteKey;
            document.getElementById('noteText').value = notes[noteKey] || '';
            openModal();
            generateCalendar(); 
        };

        calendar.appendChild(dayElement);
    }
}

function updateEventDetails(noteKey) {
    const eventContent = document.getElementById('eventContent');
    eventContent.innerText = notes[noteKey] || 'Không có sự kiện';
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar();
}

function goToCurrentMonth() {
    currentDate = new Date(); 
    selectedDate = null; 
    generateCalendar(); 
}

function addNote() {
    document.getElementById('noteModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('noteModal').style.display = 'none';
}

function saveNote() {
    const date = document.getElementById('modalDate').innerText;
    const noteText = document.getElementById('noteText').value;
    const dateParts = date.split('-');

    const noteKey = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
    notes[noteKey] = noteText;
    saveNotes(); 
    updateEventDetails(noteKey);
    closeModal();
    generateCalendar();
}

function toggleLogout() {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = (logoutMenu.style.display === 'block') ? 'none' : 'block'; 
}

function displayCurrentUser() {
    const userDisplay = document.getElementById('currentUserDisplay');
    userDisplay.innerText = currentUser || 'Khách';
}

function logout(event) {
    event.stopPropagation();
    localStorage.removeItem('currentUser'); 
    window.location.href = 'https://phanhoailinh1603.github.io/calendar-login/'; 
}

function checkLogin() {
    if (!currentUser) {
        alert('Bạn cần đăng nhập để xem lịch!'); 
        window.location.href = 'https://phanhoailinh1603.github.io/calendar-login/'; 
    }
}

window.onload = function() {
    checkLogin(); 
    displayCurrentUser(); 
    generateCalendar(); 
};
