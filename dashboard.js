// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Setup navigation
    setupNavigation();
    
    // Setup quick actions
    setupQuickActions();
    
    // Setup progress animation
    animateProgress();
    
    // Setup toast notifications
    setupToast();
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Dashboard initialized');
    
    // Load user data (simulated)
    loadUserData();
    
    // Update stats periodically
    setInterval(updateStats, 30000); // Update every 30 seconds
}

// Load user data
function loadUserData() {
    // Simulate loading user data
    const userData = {
        name: 'John Doe',
        itemsRecycled: 127,
        pointsEarned: 450,
        daysStreak: 12,
        monthlyGoal: 200,
        monthlyProgress: 127
    };
    
    updateUserInterface(userData);
}

// Update user interface with data
function updateUserInterface(data) {
    // Update welcome message
    const userName = document.querySelector('.user-name');
    if (userName) {
        userName.textContent = `Welcome, ${data.name}!`;
    }
    
    // Update stats
    updateStatCards(data);
    
    // Update progress
    updateProgress(data);
}

// Update stat cards
function updateStatCards(data) {
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards[0]) {
        statCards[0].querySelector('h3').textContent = data.itemsRecycled;
    }
    if (statCards[1]) {
        statCards[1].querySelector('h3').textContent = data.pointsEarned;
    }
    if (statCards[2]) {
        statCards[2].querySelector('h3').textContent = data.daysStreak;
    }
}

// Update progress
function updateProgress(data) {
    const percentage = Math.round((data.monthlyProgress / data.monthlyGoal) * 100);
    const progressRing = document.querySelector('.progress-ring');
    const percentageText = document.querySelector('.percentage');
    
    if (progressRing) {
        const circumference = 2 * Math.PI * 50; // r=50
        const offset = circumference - (percentage / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
    
    if (percentageText) {
        percentageText.textContent = `${percentage}%`;
    }
    
    // Update progress stats
    const progressStats = document.querySelectorAll('.progress-stat .stat-value');
    if (progressStats[0]) progressStats[0].textContent = `${data.monthlyProgress} items`;
    if (progressStats[1]) progressStats[1].textContent = `${data.monthlyGoal} items`;
    if (progressStats[2]) progressStats[2].textContent = `${data.monthlyGoal - data.monthlyProgress} items`;
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an external link (not starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Handle navigation (simulated)
                const section = href.substring(1);
                handleNavigation(section);
            }
            // For external links (like recycling-guide.html), let the default behavior happen
        });
    });
}

// Handle navigation
function handleNavigation(section) {
    console.log(`Navigating to: ${section}`);
    
    // Simulate page change
    showToast(`Navigating to ${section} section...`);
    
    // Here you would typically load different content or navigate to different pages
    switch(section) {
        case 'dashboard':
            // Already on dashboard
            break;
        case 'recycling':
            showToast('Recycling section coming soon!');
            break;
        case 'schedule':
            showToast('Schedule section coming soon!');
            break;
        case 'rewards':
            showToast('Rewards section coming soon!');
            break;
        case 'profile':
            showToast('Profile section coming soon!');
            break;
    }
}

// Setup quick actions
function setupQuickActions() {
    // Quick action buttons are already set up with onclick handlers
    // This function can be used for additional setup if needed
}

// Quick action functions
function schedulePickup() {
    showToast('Redirecting to schedule page...');
    setTimeout(() => {
        window.location.href = 'schedule.html';
    }, 1000);
}

function findRecyclingCenter() {
    showToast('Opening recycling guide...');
    setTimeout(() => {
        window.location.href = 'recycling-guide.html';
    }, 1000);
}

function scanItem() {
    showToast('Opening camera for item scanning...');
    // Simulate scanning
    setTimeout(() => {
        showToast('Item scanned: Plastic bottle - +5 points earned!');
        updateStats();
    }, 2000);
}

function redeemRewards() {
    showToast('Redirecting to rewards page...');
    setTimeout(() => {
        window.location.href = 'rewards.html';
    }, 1000);
}

// Animate progress
function animateProgress() {
    const progressRing = document.querySelector('.progress-ring');
    if (progressRing) {
        // Animate the progress ring on load
        setTimeout(() => {
            progressRing.style.transition = 'stroke-dashoffset 1s ease-in-out';
        }, 500);
    }
}

// Update stats (simulated real-time updates)
function updateStats() {
    // Simulate real-time updates
    const statCards = document.querySelectorAll('.stat-card h3');
    
    statCards.forEach(card => {
        const currentValue = parseInt(card.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 3);
        card.textContent = newValue;
        
        // Add a subtle animation
        card.style.transform = 'scale(1.1)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

// Setup toast notifications
function setupToast() {
    // Toast functionality is already implemented in the HTML
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

// Logout function
function logout() {
    showToast('Logging out...');
    
    // Simulate logout process
    setTimeout(() => {
        // Redirect to login page
        window.location.href = 'index.html';
    }, 1000);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityName = this.querySelector('h4').textContent;
            showToast(`Viewing details for: ${activityName}`);
        });
    });
    
    // Add click effects to category items
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h4').textContent;
            showToast(`Viewing ${categoryName} recycling history`);
        });
    });
    
    // Add click effects to pickup items
    const pickupItems = document.querySelectorAll('.pickup-item');
    pickupItems.forEach(item => {
        item.addEventListener('click', function() {
            const pickupName = this.querySelector('h4').textContent;
            showToast(`Viewing pickup details: ${pickupName}`);
        });
    });
    
    // Add click effects to impact items
    const impactItems = document.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
        item.addEventListener('click', function() {
            const impactTitle = this.querySelector('h4').textContent;
            showToast(`Learn more about: ${impactTitle}`);
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open quick actions
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showToast('Quick actions menu opened!');
    }
    
    // Escape to close any modals (if implemented)
    if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        showToast('Closed active dialog');
    }
});

// Add some fun animations
function addRandomAnimations() {
    // Occasionally add some random animations to make the dashboard feel alive
    setInterval(() => {
        const randomCard = document.querySelectorAll('.dashboard-card')[Math.floor(Math.random() * 6)];
        if (randomCard) {
            randomCard.style.transform = 'translateY(-10px) scale(1.02)';
            setTimeout(() => {
                randomCard.style.transform = 'translateY(0) scale(1)';
            }, 300);
        }
    }, 10000); // Every 10 seconds
}

// Initialize random animations
setTimeout(addRandomAnimations, 5000);

// Add loading states for actions
function addLoadingState(element) {
    element.classList.add('loading');
    element.style.position = 'relative';
}

function removeLoadingState(element) {
    element.classList.remove('loading');
}

// Enhanced quick actions with loading states
function enhancedSchedulePickup() {
    const btn = document.querySelector('.action-btn');
    addLoadingState(btn);
    
    setTimeout(() => {
        removeLoadingState(btn);
        showToast('Pickup scheduled successfully!');
    }, 2000);
}

// Add some data visualization (if charts are needed)
function initializeCharts() {
    // This would be where you'd initialize charts if using a library like Chart.js
    console.log('Charts initialized');
}

// Export functions for global access
window.schedulePickup = schedulePickup;
window.findRecyclingCenter = findRecyclingCenter;
window.scanItem = scanItem;
window.redeemRewards = redeemRewards;
window.logout = logout;

// Additional functions for dashboard buttons
function viewAllActivity() {
    showToast('Opening full activity history...');
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}

function scheduleNewPickup() {
    showToast('Redirecting to schedule page...');
    setTimeout(() => {
        window.location.href = 'schedule.html';
    }, 1000);
}

// Export additional functions
window.viewAllActivity = viewAllActivity;
window.scheduleNewPickup = scheduleNewPickup;
