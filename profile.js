// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the profile page
    initializeProfile();
    
    // Setup tab navigation
    setupTabNavigation();
    
    // Setup interactive features
    setupInteractiveFeatures();
});

// Initialize profile page
function initializeProfile() {
    console.log('Profile page initialized');
    
    // Load user data (simulated)
    loadUserData();
    
    // Setup animations
    setupAnimations();
}

// Load user data
function loadUserData() {
    // Simulate loading user data
    const userData = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        itemsRecycled: 156,
        pointsEarned: 450,
        rewardsRedeemed: 12,
        co2Saved: '23.4 kg',
        treesPlanted: 3
    };
    
    updateUserInterface(userData);
}

// Update user interface
function updateUserInterface(data) {
    // Update profile header
    const profileName = document.querySelector('.profile-info h1');
    if (profileName) {
        profileName.textContent = data.name;
    }
    
    // Update stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = data.itemsRecycled;
        statNumbers[1].textContent = data.pointsEarned;
        statNumbers[2].textContent = data.rewardsRedeemed;
    }
    
    // Update username in nav
    const userName = document.querySelector('.user-name');
    if (userName) {
        userName.textContent = `Welcome, ${data.name}!`;
    }
}

// Setup tab navigation
function setupTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target tab pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
            
            // Show toast notification
            const tabName = this.textContent.trim();
            showToast(`Switched to ${tabName} tab`);
        });
    });
}

// Setup interactive features
function setupInteractiveFeatures() {
    // Add hover effects to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('locked')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to setting items
    const settingItems = document.querySelectorAll('.setting-item');
    settingItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Setup animations
function setupAnimations() {
    // Animate info cards on load
    const infoCards = document.querySelectorAll('.info-card, .stats-card, .activity-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + index * 150);
    });
    
    // Animate setting cards
    const settingCards = document.querySelectorAll('.settings-card');
    settingCards.forEach((card, index) => {
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

// Edit field function
function editField(fieldName) {
    const fieldMap = {
        'name': 'Full Name',
        'email': 'Email',
        'phone': 'Phone'
    };
    
    const fieldLabel = fieldMap[fieldName];
    showToast(`Editing ${fieldLabel}...`);
    
    // Simulate editing process
    setTimeout(() => {
        showToast(`${fieldLabel} updated successfully!`);
    }, 2000);
}

// Edit avatar function
function editAvatar() {
    showToast('Opening avatar editor...');
    setTimeout(() => {
        showToast('Avatar updated successfully!');
    }, 2000);
}

// Change password function
function changePassword() {
    showToast('Opening password change form...');
    setTimeout(() => {
        showToast('Password changed successfully!');
    }, 2000);
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
        // Number keys 1-3 to switch tabs
        if (e.key >= '1' && e.key <= '3') {
            const navTabs = document.querySelectorAll('.nav-tab');
            const index = parseInt(e.key) - 1;
            if (navTabs[index]) {
                navTabs[index].click();
            }
        }
        
        // Ctrl/Cmd + E to edit profile
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            editField('name');
        }
    });
    
    // Add some helpful tooltips
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.title = 'Click to edit this field';
    });
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        if (card.classList.contains('unlocked')) {
            card.title = 'Achievement unlocked!';
        } else {
            card.title = 'Achievement locked - keep recycling to unlock!';
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
    
    .info-card, .stats-card, .activity-card {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .achievement-card {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .settings-card {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .achievement-card.unlocked {
        animation: fadeInUp 0.6s ease forwards, glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from {
            box-shadow: 0 0 5px rgba(74, 151, 130, 0.3);
        }
        to {
            box-shadow: 0 0 20px rgba(74, 151, 130, 0.6);
        }
    }
`;
document.head.appendChild(style);

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add fun features
    addFunFeatures();
    
    // Add some helpful shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save changes
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            showToast('Changes saved successfully!');
        }
        
        // Escape to close any modals
        if (e.key === 'Escape') {
            showToast('Closed active dialog');
        }
    });
});

// Export functions for global access
window.editField = editField;
window.editAvatar = editAvatar;
window.changePassword = changePassword;
window.logout = logout;
