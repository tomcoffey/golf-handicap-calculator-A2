const API_URL = 'http://192.168.99.100:5050';

document.getElementById('scoreForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const course = document.getElementById('course').value;
    const date = document.getElementById('date').value;
    const score = document.getElementById('score').value;
    
    if (!course || !date || !score) {
        alert("Please fill in all fields!");
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Please login first!");
        return;
    }
    
    try {
       
        const response = await fetch(`${API_URL}/api/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.userId,
                course: course,
                score: parseInt(score),
                date: date
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Score saved successfully!');
            window.location.href = 'scores.html';
        } else {
            alert("Error: " + result.error);
        }
        
    } catch (error) {
        console.log("Error adding score:", error);
        alert("Server error - try again later");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('date').valueAsDate = new Date();
});