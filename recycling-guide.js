// Recycling Guide functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the guide
    initializeGuide();
    
    // Setup tab navigation
    setupTabNavigation();
    
    // Setup interactive features
    setupInteractiveFeatures();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
});

// Initialize the guide
function initializeGuide() {
    console.log('Recycling Guide initialized');
    
    // Add loading animation to content sections
    animateContentSections();
    
    // Setup search functionality (if needed)
    setupSearch();
}

// Setup tab navigation
function setupTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    // Scroll to section smoothly
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            
            // Show toast notification
            const sectionName = this.textContent.trim();
            showToast(`Switched to ${sectionName} guide`);
        });
    });
}

// Setup interactive features
function setupInteractiveFeatures() {
    // Add click effects to guide cards
    const guideCards = document.querySelectorAll('.guide-card');
    guideCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animate content sections
function animateContentSections() {
    const sections = document.querySelectorAll('.content-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Setup search functionality
function setupSearch() {
    // This could be expanded to include a search feature
    console.log('Search functionality ready');
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

// Contact functions
function findRecyclingCenter() {
    showToast('Finding nearby recycling centers...');
    
    // Simulate finding centers
    setTimeout(() => {
        showToast('Found 5 recycling centers within 10 miles of your location!');
    }, 1500);
}

function schedulePickup() {
    showToast('Opening pickup scheduler...');
    
    // Simulate scheduling
    setTimeout(() => {
        showToast('Pickup scheduler opened! Select your preferred date and time.');
    }, 1000);
}

function contactSupport() {
    showToast('Opening support chat...');
    
    // Simulate opening support
    setTimeout(() => {
        showToast('Support team is ready to help! How can we assist you?');
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

// Add some educational features
function addEducationalFeatures() {
    // Add tooltips to recycling codes
    const codeItems = document.querySelectorAll('.code-item');
    codeItems.forEach(item => {
        item.addEventListener('click', function() {
            const codeNumber = this.querySelector('.code-number').textContent;
            const codeName = this.querySelector('.code-name').textContent;
            
            showToast(`Code ${codeNumber}: ${codeName} - Click for more details`);
        });
    });
    
    // Add interactive elements to process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const stepNumber = index + 1;
            showToast(`Step ${stepNumber}: ${this.querySelector('h4').textContent}`);
        });
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Arrow keys to navigate between tabs
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeTab = document.querySelector('.nav-tab.active');
        const navTabs = document.querySelectorAll('.nav-tab');
        const currentIndex = Array.from(navTabs).indexOf(activeTab);
        
        let newIndex;
        if (e.key === 'ArrowRight') {
            newIndex = (currentIndex + 1) % navTabs.length;
        } else {
            newIndex = (currentIndex - 1 + navTabs.length) % navTabs.length;
        }
        
        navTabs[newIndex].click();
    }
    
    // Escape to close any modals or return to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('Returned to top of page');
    }
    
    // Number keys 1-6 to jump to specific sections
    if (e.key >= '1' && e.key <= '6') {
        const navTabs = document.querySelectorAll('.nav-tab');
        const index = parseInt(e.key) - 1;
        if (navTabs[index]) {
            navTabs[index].click();
        }
    }
});

// Add some fun animations
function addFunAnimations() {
    // Animate hero stats on scroll
    const heroStats = document.querySelectorAll('.hero-stat');
    heroStats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'bounce 0.6s ease';
        }, index * 200);
    });
    
    // Add floating animation to section icons
    const sectionIcons = document.querySelectorAll('.section-icon');
    sectionIcons.forEach(icon => {
        icon.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Add progress tracking
function trackProgress() {
    // Track which sections user has viewed
    const sections = document.querySelectorAll('.content-section');
    const viewedSections = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                viewedSections.add(entry.target.id);
                
                // Show progress toast
                const progress = Math.round((viewedSections.size / sections.length) * 100);
                if (progress % 25 === 0 && progress > 0) {
                    showToast(`Great progress! You've viewed ${progress}% of the recycling guide.`);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add bookmark functionality
function addBookmarkFeature() {
    // Allow users to bookmark specific sections
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: #4A9782;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;
        
        bookmarkBtn.addEventListener('click', function() {
            const sectionName = header.querySelector('h2').textContent;
            this.style.color = '#FF9800';
            this.innerHTML = '<i class="fas fa-bookmark"></i>';
            showToast(`Bookmarked: ${sectionName}`);
        });
        
        header.style.position = 'relative';
        header.appendChild(bookmarkBtn);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add educational features
    addEducationalFeatures();
    
    // Add fun animations
    addFunAnimations();
    
    // Track progress
    trackProgress();
    
    // Add bookmark feature
    addBookmarkFeature();
    
    // Add some helpful shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + H to go to hero section
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' });
            showToast('Scrolled to top of guide');
        }
        
        // Ctrl/Cmd + T to go to tips section
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            document.querySelector('.tips-section').scrollIntoView({ behavior: 'smooth' });
            showToast('Scrolled to tips section');
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .bookmark-btn:hover {
        background: rgba(74, 151, 130, 0.1) !important;
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.findRecyclingCenter = findRecyclingCenter;
window.schedulePickup = schedulePickup;
window.contactSupport = contactSupport;
window.logout = logout;
