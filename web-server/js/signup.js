const API_URL = 'http://192.168.99.100:5050';

async function signup(event) {
    event.preventDefault();  
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let idNumber = document.getElementById('id-number').value;

    if (!name || !username || !email || !password || !idNumber) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, email, password, idNumber })
        });

        const data = await response.json();
        if (data.success) {
            alert('Account created successfully!');
            window.location.href = 'login.html';
        } else {
            alert('Error: ' + (data.error || 'Registration failed'));
        }
    } catch (error) {
        alert('Error connecting to server');
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', signup);
    } else {
        console.error('signupForm not found');
    }
});

