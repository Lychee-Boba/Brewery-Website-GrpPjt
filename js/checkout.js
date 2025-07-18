function renderCheckoutSummary() {
  
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    cart = [];
  }

  
  if (!localStorage.getItem("cart") || cart.length === 0) {
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("transactionSuccess").style.display = "block";
    return;
  }

  const summaryDiv = document.querySelector(".checkout-summary");
  if (!summaryDiv) return;
  let total = 0;
  let html = "<h2>Checkout</h2>";
  cart.forEach((item) => {
    html += `<div class="summary-item"><div><strong>${item.name}</strong></div><span>$${item.price} x ${item.quantity}</span></div>`;
    total += item.price * item.quantity;
  });
  html += `<div class="summary-total"><strong>Total</strong><span>$${total.toFixed(2)}</span></div>`;
  summaryDiv.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", renderCheckoutSummary);

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    const expMonth = document.getElementById("expMonth").value;
    const expYear = document.getElementById("expYear").value;
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    const monthNum = parseInt(expMonth, 10);
    const yearNum = parseInt(expYear, 10);

    if (
      isNaN(monthNum) ||
      monthNum < 1 ||
      monthNum > 12 ||
      isNaN(yearNum) ||
      expYear.length !== 2
    ) {
      errorMsg.textContent = "Please enter a valid expiration month and year.";
      e.preventDefault();
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear() % 100; 
    const currentMonth = now.getMonth() + 1;

    if (
      yearNum < currentYear ||
      (yearNum === currentYear && monthNum < currentMonth)
    ) {
      errorMsg.textContent = "The card is expired. Please enter a valid expiration date.";
      e.preventDefault();
      return;
    }

    
    e.preventDefault();
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("transactionSuccess").style.display = "block";
    localStorage.removeItem("cart");
});
