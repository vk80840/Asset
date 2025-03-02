document.addEventListener("DOMContentLoaded", function () {
    const totalBalance = document.getElementById("totalBalance");
    const progress = document.getElementById("progress");
    const themeToggle = document.getElementById("themeToggle");
    const addMoneyBtn = document.getElementById("addMoney");
    const viewHistoryBtn = document.getElementById("viewHistory");
    const setTargetBtn = document.getElementById("setTarget");
    const historyDiv = document.getElementById("history");
    const laptopImage = document.getElementById("laptopImage");

    let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 0;
    let target = localStorage.getItem("target") ? parseInt(localStorage.getItem("target")) : 45000;
    let history = JSON.parse(localStorage.getItem("history")) || [];

    function updateUI() {
        totalBalance.innerText = `₹${balance}`;
        let percentage = (balance / target) * 100;
        progress.style.width = percentage + "%";

        if (balance >= target) {
            laptopImage.style.display = "block";
        }
    }

    function saveData() {
        localStorage.setItem("balance", balance);
        localStorage.setItem("history", JSON.stringify(history));
    }

    addMoneyBtn.addEventListener("click", function () {
        let amount = parseInt(prompt("Enter amount:"));
        let source = prompt("Enter source:");
        let date = new Date().toLocaleDateString();

        if (!isNaN(amount)) {
            balance += amount;
            history.push({ amount, source, date });
            saveData();
            updateUI();
        }
    });

    viewHistoryBtn.addEventListener("click", function () {
        historyDiv.innerHTML = "<h3>History</h3>";
        history.forEach(entry => {
            historyDiv.innerHTML += `<p>₹${entry.amount} - ${entry.source} (${entry.date})</p>`;
        });
    });

    setTargetBtn.addEventListener("click", function () {
        let newTarget = parseInt(prompt("Set new target:"));
        if (!isNaN(newTarget) && newTarget > 0) {
            target = newTarget;
            localStorage.setItem("target", target);
            updateUI();
        }
    });

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
    });

    updateUI();
});
