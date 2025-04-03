// Check if user is logged in
window.onload = function() {
    if (localStorage.getItem("loggedInUser")) {
        showApp();
    }
};

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("loggedInUser", email);
        showApp();
    } else {
        document.getElementById("auth-message").innerText = "Invalid credentials!";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("app-container").style.display = "none";
    document.getElementById("auth-container").style.display = "block";
}

function showApp() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
}

// Sign Up (For First-Time Users)
function signUp(email, password) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Sign-up successful! Now log in.");
}

// Currency Conversion Function (Same as before)
function convertCurrency() {
    const usd = document.getElementById("usd").value;
    const inr = usd * 83.2; // Example conversion rate
    document.getElementById("result").innerText = `${usd} USD = ₹${inr.toFixed(2)} INR`;
}

// Dark Mode Toggle (Same as before)
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function showNotification() {
    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification('🚀 USD to INR Converter', {
                        body: 'Your currency conversion tool is ready!',
                        icon: 'icon-192.png'
                    });
                });
            }
        });
    }
}
window.addEventListener('load', showNotification);

