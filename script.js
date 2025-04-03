// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Convert Currency
function convertCurrency() {
    const usd = document.getElementById("usd").value;
    if (usd === "" || isNaN(usd)) {
        alert("Please enter a valid USD amount!");
        return;
    }
    const inr = usd * 83.2; // Example conversion rate
    document.getElementById("result").innerText = `${usd} USD = ₹${inr.toFixed(2)} INR`;
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Push Notification
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

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('✅ Service Worker registered:', registration.scope);
        }).catch(error => {
            console.log('❌ Service Worker registration failed:', error);
        });
    });
}

// Firebase Authentication Functions

// Sign Up
function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("✅ Sign-up successful!");
        })
        .catch((error) => {
            alert(`❌ Error: ${error.message}`);
        });
}

// Login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("✅ Login successful!");
        })
        .catch((error) => {
            alert(`❌ Error: ${error.message}`);
        });
}

// Logout
function logout() {
    auth.signOut()
        .then(() => {
            alert("👋 Logged out successfully!");
        })
        .catch((error) => {
            alert(`❌ Error: ${error.message}`);
        });
}

// Check Authentication Status
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("auth-status").innerText = `Logged in as: ${user.email}`;
        document.getElementById("logout-btn").style.display = "block";
    } else {
        document.getElementById("auth-status").innerText = "Not logged in";
        document.getElementById("logout-btn").style.display = "none";
    }
});

// Run Notification on Page Load
window.addEventListener('load', showNotification);
