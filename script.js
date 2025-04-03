// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAveZtZbI3yKU927L538pnocsVikB91qPo",
  authDomain: "firstauth-39bae.firebaseapp.com",
  projectId: "firstauth-39bae",
  storageBucket: "firstauth-39bae.firebasestorage.app",
  messagingSenderId: "541833169246",
  appId: "1:541833169246:web:7e6e8509324f1795eaa7cf",
  measurementId: "G-5G21QKTMY7"
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
