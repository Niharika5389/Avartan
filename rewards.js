// Rewards page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the rewards page
    initializeRewards();
    
    // Setup category filtering
    setupCategoryFiltering();
    
    // Setup interactive features
    setupInteractiveFeatures();
});

// Initialize rewards page
function initializeRewards() {
    console.log('Rewards page initialized');
    
    // Load user data (simulated)
    loadUserData();
    
    // Setup animations
    setupAnimations();
}

// Load user data
function loadUserData() {
    // Simulate loading user data
    const userData = {
        points: 450,
        redeemedCount: 12,
        username: 'John Doe'
    };
    
    updateUserInterface(userData);
}

// Update user interface
function updateUserInterface(data) {
    // Update points display
    const pointsDisplay = document.querySelector('.points-info h2');
    if (pointsDisplay) {
        pointsDisplay.textContent = data.points;
    }
    
    // Update redeemed count
    const redeemedDisplay = document.querySelector('.points-info h3');
    if (redeemedDisplay) {
        redeemedDisplay.textContent = data.redeemedCount;
    }
    
    // Update username
    const userName = document.querySelector('.user-name');
    if (userName) {
        userName.textContent = `Welcome, ${data.username}!`;
    }
}

// Setup category filtering
function setupCategoryFiltering() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const rewardCards = document.querySelectorAll('.reward-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter reward cards
            rewardCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show toast notification
            const categoryName = this.textContent.trim();
            showToast(`Showing ${categoryName}`);
        });
    });
}

// Setup interactive features
function setupInteractiveFeatures() {
    // Add hover effects to reward cards
    const rewardCards = document.querySelectorAll('.reward-card');
    rewardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
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
}

// Setup animations
function setupAnimations() {
    // Animate reward cards on load
    const rewardCards = document.querySelectorAll('.reward-card');
    rewardCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate earn cards
    const earnCards = document.querySelectorAll('.earn-card');
    earnCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + index * 100);
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

// Redeem reward function
function redeemReward(rewardName, pointsRequired) {
    const currentPoints = parseInt(document.querySelector('.points-info h2').textContent);
    
    if (currentPoints >= pointsRequired) {
        // Simulate redemption process
        showToast(`Processing redemption for ${rewardName}...`);
        
        setTimeout(() => {
            // Update points
            const newPoints = currentPoints - pointsRequired;
            document.querySelector('.points-info h2').textContent = newPoints;
            
            // Update redeemed count
            const redeemedCount = parseInt(document.querySelector('.points-info h3').textContent);
            document.querySelector('.points-info h3').textContent = redeemedCount + 1;
            
            showToast(`Successfully redeemed ${rewardName}!`);
            
            // Add to recent redemptions
            addToRecentRedemptions(rewardName);
            
        }, 2000);
    } else {
        showToast(`Insufficient points. You need ${pointsRequired - currentPoints} more points.`);
    }
}

// Add to recent redemptions
function addToRecentRedemptions(rewardName) {
    const redemptionList = document.querySelector('.redemption-list');
    const newRedemption = document.createElement('div');
    newRedemption.className = 'redemption-item';
    newRedemption.innerHTML = `
        <div class="redemption-icon">
            <i class="fas fa-gift"></i>
        </div>
        <div class="redemption-details">
            <h4>${rewardName}</h4>
            <p>Redeemed just now</p>
            <span class="redemption-status processing">Processing</span>
        </div>
    `;
    
    // Add to the beginning of the list
    redemptionList.insertBefore(newRedemption, redemptionList.firstChild);
    
    // Remove oldest redemption if more than 3
    const redemptions = redemptionList.querySelectorAll('.redemption-item');
    if (redemptions.length > 3) {
        redemptionList.removeChild(redemptions[redemptions.length - 1]);
    }
}

// Action button functions
function showHistory() {
    showToast('Opening redemption history...');
    setTimeout(() => {
        showToast('Redemption history loaded!');
    }, 1000);
}

function showLeaderboard() {
    showToast('Loading leaderboard...');
    setTimeout(() => {
        showToast('You are ranked #15 out of 1,247 users!');
    }, 1500);
}

function showEarnMore() {
    showToast('Showing ways to earn more points...');
    setTimeout(() => {
        showToast('Check out the "How to Earn" section below!');
    }, 1000);
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
    // Add confetti effect for successful redemptions
    const redeemButtons = document.querySelectorAll('.redeem-btn');
    redeemButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add a subtle animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to earn cards
    const earnCards = document.querySelectorAll('.earn-card');
    earnCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + R to refresh rewards
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        showToast('Refreshing rewards...');
        setTimeout(() => {
            showToast('Rewards refreshed!');
        }, 1000);
    }
    
    // Escape to close any modals
    if (e.key === 'Escape') {
        showToast('Closed active dialog');
    }
});

// Add some gamification features
function addGamification() {
    // Check for achievements
    const currentPoints = parseInt(document.querySelector('.points-info h2').textContent);
    const redeemedCount = parseInt(document.querySelector('.points-info h3').textContent);
    
    // Achievement notifications
    if (currentPoints >= 500 && !localStorage.getItem('achievement_500_points')) {
        showToast('🎉 Achievement Unlocked: 500 Points Collector!');
        localStorage.setItem('achievement_500_points', 'true');
    }
    
    if (redeemedCount >= 10 && !localStorage.getItem('achievement_10_redeemed')) {
        showToast('🏆 Achievement Unlocked: Reward Master!');
        localStorage.setItem('achievement_10_redeemed', 'true');
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add fun features
    addFunFeatures();
    
    // Add gamification
    addGamification();
    
    // Add some helpful shortcuts
    document.addEventListener('keydown', function(e) {
        // Number keys 1-5 to filter categories
        if (e.key >= '1' && e.key <= '5') {
            const categoryTabs = document.querySelectorAll('.category-tab');
            const index = parseInt(e.key) - 1;
            if (categoryTabs[index]) {
                categoryTabs[index].click();
            }
        }
    });
});

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
    
    .redemption-status.processing {
        background: rgba(255, 152, 0, 0.1);
        color: #FF9800;
    }
    
    .reward-card {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.redeemReward = redeemReward;
window.showHistory = showHistory;
window.showLeaderboard = showLeaderboard;
window.showEarnMore = showEarnMore;
window.logout = logout;
