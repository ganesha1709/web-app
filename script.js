function convertCurrency() {
    const usd = document.getElementById("usd").value;
    const inr = usd * 83.2; // Example conversion rate
    document.getElementById("result").innerText = `${usd} USD = ₹${inr.toFixed(2)} INR`;
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
