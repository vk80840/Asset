document.addEventListener("DOMContentLoaded", function () {
    let savings = JSON.parse(localStorage.getItem("savings")) || [];
    let totalTarget = localStorage.getItem("target") || 45000;

    function updateDashboard() {
        let totalINR = 0;
        savings.forEach(entry => {
            totalINR += entry.category === "crypto" ? entry.amount * 91 : entry.amount;
        });

        document.getElementById("total-savings").innerText = totalINR;
        let progress = (totalINR / totalTarget) * 100;
        document.getElementById("progress-fill").style.width = progress + "%";

        if (progress >= 100) {
            document.getElementById("laptop-image").classList.remove("hidden");
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

    if (document.getElementById("theme-toggle")) {
        document.getElementById("theme-toggle").addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    }

    updateDashboard();
});
