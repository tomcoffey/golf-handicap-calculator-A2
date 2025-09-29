const API_URL = 'http://192.168.99.100:5050';

window.onload = async function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Please login first!");
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/scores/${currentUser.userId}`);
        const data = await response.json();

        let scores = [];
        if (data.success) {
            scores = data.scores;
        }

        const handicapDiv = document.querySelector('.handicap-display h3');
        if (scores.length > 0) {
            let total = 0;
            for (let i = 0; i < scores.length; i++) {
                total += scores[i].score;
            }
            const average = total / scores.length;
            handicapDiv.innerHTML = 'Your Average: ' + average.toFixed(1);
        } else {
            handicapDiv.innerHTML = 'No scores yet';
        }

        const scoresDiv = document.querySelector('.scores-list');
        if (scores.length > 0) {
            let html = '<h4>Your Scores:</h4>';
            for (let i = 0; i < scores.length; i++) {
                const s = scores[i];
                html += `<p>${s.course}: ${s.score} (${s.date.split('T')[0]})</p>`;
            }
            scoresDiv.innerHTML = html;
        } else {
            scoresDiv.innerHTML = '<p>No scores yet. <a href="add-score.html">Add one!</a></p>';
        }

    } catch (error) {
        console.log("Error loading scores:", error);
        document.querySelector('.scores-list').innerHTML =
            '<p>Error loading scores. Check if server is running.</p>';
    }
};
