document.addEventListener("DOMContentLoaded", function () {
    let savings = JSON.parse(localStorage.getItem("savings")) || [];
    let totalTarget = localStorage.getItem("target") || 45000;
    
    function updateDashboard() {
        let totalINR = 0;
        savings.forEach(entry => {
            if (entry.category === "crypto") {
                totalINR += entry.amount * 91; // Convert USDT to INR
            } else {
                totalINR += entry.amount;
            }
        });

        document.getElementById("total-savings").innerText = totalINR;
        let progress = (totalINR / totalTarget) * 100;
        document.getElementById("progress-bar").style.width = progress + "%";

        if (progress >= 100) {
            document.getElementById("laptop-image").style.display = "block";
        }
    }

    if (document.getElementById("savings-form")) {
        document.getElementById("savings-form").addEventListener("submit", function (e) {
            e.preventDefault();
            let amount = parseFloat(document.getElementById("amount").value);
            let category = document.getElementById("category").value;
            let source = document.getElementById("source").value;
            let date = document.getElementById("date").value;

            savings.push({ amount, category, source, date });
            localStorage.setItem("savings", JSON.stringify(savings));

            window.location = "index.html";
        });
    }

    if (document.getElementById("history-list")) {
        let historyList = document.getElementById("history-list");
        savings.forEach(entry => {
            let li = document.createElement("li");
            li.innerText = `${entry.amount} INR (${entry.category}) from ${entry.source} on ${entry.date}`;
            historyList.appendChild(li);
        });
    }

    if (document.getElementById("theme-toggle")) {
        document.getElementById("theme-toggle").addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    }

    if (document.getElementById("save-target")) {
        document.getElementById("save-target").addEventListener("click", function () {
            let newTarget = document.getElementById("new-target").value;
            if (newTarget) {
                localStorage.setItem("target", newTarget);
            }
        });
    }

    updateDashboard();
});
