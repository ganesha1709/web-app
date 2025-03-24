function convertCurrency() {
    const usd = document.getElementById("usd").value;
    const inr = usd * 83.2; // example conversion rate
    document.getElementById("result").innerText = `${usd} USD = ₹${inr.toFixed(2)} INR`;
}