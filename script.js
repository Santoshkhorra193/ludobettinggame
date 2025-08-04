// बैलेंस लोड करें या इनिशियलाइज़ करें
function getBalance() {
  let balance = localStorage.getItem("balance");
  if (!balance) {
    balance = 0;
    localStorage.setItem("balance", balance);
  }
  return parseInt(balance);
}

// बैलेंस अपडेट करें
function setBalance(newBalance) {
  localStorage.setItem("balance", newBalance);
}

// पैसे जोड़ें
function addMoney(amount) {
  let balance = getBalance();
  balance += amount;
  setBalance(balance);
  return balance;
}

// बेट लगाना
function placeBet(amount) {
  let balance = getBalance();
  let result;

  if (amount > balance) {
    return { status: "fail", message: "बैलेंस कम है!" };
  }

  let win = Math.random() < 0.5; // 50% chance

  if (win) {
    balance += amount;
    result = "जीत";
  } else {
    balance -= amount;
    result = "हार";
  }

  setBalance(balance);
  return { status: "success", result: result, balance: balance };
}
document.getElementById("adminMode").addEventListener("change", function () {
  document.getElementById("adminResult").style.display = this.checked ? "inline" : "none";
});
function getCurrentUser() {
  return localStorage.getItem("loggedInUser");
}

function getUserData() {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const username = getCurrentUser();
  return users[username];
}

function updateUserData(data) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const username = getCurrentUser();
  users[username] = data;
  localStorage.setItem("users", JSON.stringify(users));
}