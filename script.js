// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.form');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Tab switching functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding form
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${targetTab}Form`) {
                form.classList.add('active');
            }
        });
    });
});

// Password toggle functionality
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function showError(input, message) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.add('error');
    
    // Remove existing error message
    const existingError = wrapper.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    wrapper.parentNode.insertBefore(errorDiv, wrapper.nextSibling);
}

function clearError(input) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('error');
    
    const errorMessage = wrapper.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

// Real-time validation
function setupValidation(input, validationRules) {
    input.addEventListener('blur', () => {
        const value = input.value.trim();
        
        if (validationRules.required && !value) {
            showError(input, 'This field is required');
            return;
        }
        
        if (validationRules.email && value && !validateEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return;
        }
        
        if (validationRules.password && value && !validatePassword(value)) {
            showError(input, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            return;
        }
        
        clearError(input);
    });
    
    input.addEventListener('input', () => {
        clearError(input);
    });
}

// Setup validation for all inputs
document.addEventListener('DOMContentLoaded', () => {
    // Login form validation
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    setupValidation(loginEmail, { required: true, email: true });
    setupValidation(loginPassword, { required: true });
    
    // Signup form validation
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    setupValidation(signupName, { required: true });
    setupValidation(signupEmail, { required: true, email: true });
    setupValidation(signupPassword, { required: true, password: true });
    setupValidation(confirmPassword, { required: true });
    
    // Confirm password validation
    confirmPassword.addEventListener('blur', () => {
        const password = signupPassword.value;
        const confirm = confirmPassword.value;
        
        if (confirm && password !== confirm) {
            showError(confirmPassword, 'Passwords do not match');
        }
    });
});

// Form submission handling
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showError(document.getElementById('loginEmail'), 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitBtn = loginForm.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success - redirect to dashboard
        console.log('Login successful:', { email, rememberMe });
        showToast('Login successful! Welcome back.');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!validateEmail(email)) {
        showError(document.getElementById('signupEmail'), 'Please enter a valid email address');
        return;
    }
    
    if (!validatePassword(password)) {
        showError(document.getElementById('signupPassword'), 'Password must be at least 8 characters with uppercase, lowercase, and number');
        return;
    }
    
    if (password !== confirmPassword) {
        showError(document.getElementById('confirmPassword'), 'Passwords do not match');
        return;
    }
    
    if (!agreeTerms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    // Show loading state
    const submitBtn = signupForm.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success - redirect to dashboard
        console.log('Signup successful:', { name, email });
        showToast('Account created successfully! Welcome to EcoRecycle.');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = btn.classList.contains('google') ? 'Google' : 'Facebook';
        alert(`${provider} login functionality would be implemented here.`);
    });
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset functionality would be implemented here.');
});

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to form container
    const formContainer = document.querySelector('.form-container');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        formContainer.style.transition = 'all 0.6s ease';
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 100);
    
    // Add hover effects to social buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const activeForm = document.querySelector('.form.active');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('.submit-btn');
            if (submitBtn && !submitBtn.classList.contains('loading')) {
                submitBtn.click();
            }
        }
    }
});

// Accessibility improvements
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.blur();
        }
    });
});

// Add focus indicators for better accessibility
document.querySelectorAll('button, input, a').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #4CAF50';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
    });
});

// Toast notification function
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span class="toast-message">${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
    } else {
        toast.querySelector('.toast-message').textContent = message;
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
