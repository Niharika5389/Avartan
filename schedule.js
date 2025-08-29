// Schedule page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the schedule page
    initializeSchedule();
    
    // Setup calendar
    setupCalendar();
    
    // Setup interactive features
    setupInteractiveFeatures();
});

// Initialize schedule page
function initializeSchedule() {
    console.log('Schedule page initialized');
    
    // Load user data (simulated)
    loadUserData();
    
    // Setup animations
    setupAnimations();
}

// Load user data
function loadUserData() {
    // Simulate loading user data
    const userData = {
        upcomingPickups: 3,
        hoursNotice: 24,
        availableSlots: 5,
        username: 'John Doe'
    };
    
    updateUserInterface(userData);
}

// Update user interface
function updateUserInterface(data) {
    // Update username
    const userName = document.querySelector('.user-name');
    if (userName) {
        userName.textContent = `Welcome, ${data.username}!`;
    }
}

// Setup calendar
function setupCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Generate calendar for current month
    generateCalendar(currentMonth, currentYear);
    
    // Add pickup dates
    addPickupDates();
}

// Generate calendar
function generateCalendar(month, year) {
    const calendarDays = document.querySelector('.calendar-days');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Update month header
    const monthHeader = document.querySelector('.calendar-header h2');
    if (monthHeader) {
        monthHeader.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Clear existing days
    calendarDays.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generate calendar grid
    for (let i = 0; i < 42; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        dayElement.textContent = currentDate.getDate();
        
        // Check if it's today
        const today = new Date();
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Check if it's current month
        if (currentDate.getMonth() !== month) {
            dayElement.classList.add('other-month');
        }
        
        // Add click event
        dayElement.addEventListener('click', function() {
            selectDate(currentDate);
        });
        
        calendarDays.appendChild(dayElement);
    }
}

// Add pickup dates to calendar
function addPickupDates() {
    const pickupDates = [15, 22, 29]; // December 2024
    
    pickupDates.forEach(date => {
        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach(element => {
            if (parseInt(element.textContent) === date && !element.classList.contains('other-month')) {
                element.classList.add('has-pickup');
            }
        });
    });
}

// Select date
function selectDate(date) {
    // Remove previous selection
    const selectedElements = document.querySelectorAll('.calendar-day.selected');
    selectedElements.forEach(el => el.classList.remove('selected'));
    
    // Add selection to clicked date
    const dayElements = document.querySelectorAll('.calendar-day');
    dayElements.forEach(element => {
        if (parseInt(element.textContent) === date.getDate() && !element.classList.contains('other-month')) {
            element.classList.add('selected');
        }
    });
    
    // Show date info
    const dateString = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    showToast(`Selected: ${dateString}`);
}

// Setup interactive features
function setupInteractiveFeatures() {
    // Add hover effects to pickup items
    const pickupItems = document.querySelectorAll('.pickup-item');
    pickupItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to time slots
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('mouseenter', function() {
            if (!this.classList.contains('booked')) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        slot.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Setup animations
function setupAnimations() {
    // Animate pickup items on load
    const pickupItems = document.querySelectorAll('.pickup-item');
    pickupItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate time slots
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach((slot, index) => {
        slot.style.opacity = '0';
        slot.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            slot.style.transition = 'all 0.5s ease';
            slot.style.opacity = '1';
            slot.style.transform = 'translateY(0)';
        }, 600 + index * 150);
    });
    
    // Animate guideline cards
    const guidelineCards = document.querySelectorAll('.guideline-card');
    guidelineCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + index * 100);
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Action button functions
function scheduleNewPickup() {
    showToast('Opening pickup scheduler...');
    setTimeout(() => {
        showToast('Select a date and time slot to schedule your pickup!');
    }, 1000);
}

function viewCalendar() {
    showToast('Calendar view activated');
    // Scroll to calendar section
    document.querySelector('.calendar-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function manageAppointments() {
    showToast('Opening appointment manager...');
    setTimeout(() => {
        showToast('You can edit or cancel your scheduled pickups here!');
    }, 1000);
}

// Pickup management functions
function reschedulePickup(pickupId) {
    showToast(`Rescheduling pickup #${pickupId}...`);
    setTimeout(() => {
        showToast('Pickup rescheduled successfully!');
    }, 2000);
}

function cancelPickup(pickupId) {
    if (confirm('Are you sure you want to cancel this pickup?')) {
        showToast(`Cancelling pickup #${pickupId}...`);
        setTimeout(() => {
            showToast('Pickup cancelled successfully!');
            // Remove pickup item from DOM
            const pickupItems = document.querySelectorAll('.pickup-item');
            if (pickupItems[pickupId - 1]) {
                pickupItems[pickupId - 1].style.opacity = '0';
                pickupItems[pickupId - 1].style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    pickupItems[pickupId - 1].remove();
                }, 300);
            }
        }, 2000);
    }
}

// Time slot booking
function bookSlot(timeSlot) {
    showToast(`Booking time slot: ${timeSlot}...`);
    setTimeout(() => {
        showToast(`Successfully booked ${timeSlot}!`);
        
        // Update slot status
        const slotElements = document.querySelectorAll('.time-slot');
        slotElements.forEach(slot => {
            const slotTime = slot.querySelector('.slot-time span');
            if (slotTime && slotTime.textContent === timeSlot) {
                slot.classList.remove('available');
                slot.classList.add('booked');
                slot.querySelector('.slot-status').textContent = 'Booked';
                slot.querySelector('.book-btn').textContent = 'Unavailable';
                slot.querySelector('.book-btn').classList.add('disabled');
                slot.querySelector('.book-btn').disabled = true;
            }
        });
    }, 2000);
}

// Calendar navigation
function previousMonth() {
    const currentHeader = document.querySelector('.calendar-header h2');
    const currentText = currentHeader.textContent;
    const [month, year] = currentText.split(' ');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let currentMonthIndex = monthNames.indexOf(month);
    let currentYearNum = parseInt(year);
    
    if (currentMonthIndex === 0) {
        currentMonthIndex = 11;
        currentYearNum--;
    } else {
        currentMonthIndex--;
    }
    
    generateCalendar(currentMonthIndex, currentYearNum);
    addPickupDates();
    showToast(`Navigated to ${monthNames[currentMonthIndex]} ${currentYearNum}`);
}

function nextMonth() {
    const currentHeader = document.querySelector('.calendar-header h2');
    const currentText = currentHeader.textContent;
    const [month, year] = currentText.split(' ');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let currentMonthIndex = monthNames.indexOf(month);
    let currentYearNum = parseInt(year);
    
    if (currentMonthIndex === 11) {
        currentMonthIndex = 0;
        currentYearNum++;
    } else {
        currentMonthIndex++;
    }
    
    generateCalendar(currentMonthIndex, currentYearNum);
    addPickupDates();
    showToast(`Navigated to ${monthNames[currentMonthIndex]} ${currentYearNum}`);
}

// Logout function
function logout() {
    showToast('Logging out...');
    
    // Simulate logout process
    setTimeout(() => {
        // Redirect to login page
        window.location.href = 'index.html';
    }, 1000);
}

// Add some fun features
function addFunFeatures() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Left arrow for previous month
        if (e.key === 'ArrowLeft') {
            previousMonth();
        }
        
        // Right arrow for next month
        if (e.key === 'ArrowRight') {
            nextMonth();
        }
        
        // Space to schedule new pickup
        if (e.key === ' ') {
            e.preventDefault();
            scheduleNewPickup();
        }
    });
    
    // Add some helpful tooltips
    const pickupItems = document.querySelectorAll('.pickup-item');
    pickupItems.forEach(item => {
        item.title = 'Click to view details';
    });
    
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        if (slot.classList.contains('available')) {
            slot.title = 'Click to book this time slot';
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .calendar-day.selected {
        background: rgba(0, 64, 48, 0.2);
        font-weight: 600;
        color: #004030;
    }
    
    .pickup-item {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .time-slot {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .guideline-card {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add fun features
    addFunFeatures();
    
    // Add some helpful shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + N for new pickup
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            scheduleNewPickup();
        }
        
        // Ctrl/Cmd + C for calendar view
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            viewCalendar();
        }
    });
});

// Export functions for global access
window.scheduleNewPickup = scheduleNewPickup;
window.viewCalendar = viewCalendar;
window.manageAppointments = manageAppointments;
window.reschedulePickup = reschedulePickup;
window.cancelPickup = cancelPickup;
window.bookSlot = bookSlot;
window.previousMonth = previousMonth;
window.nextMonth = nextMonth;
window.logout = logout;
