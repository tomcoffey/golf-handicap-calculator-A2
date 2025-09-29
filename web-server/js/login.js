const API_URL = 'http://192.168.99.100:5050';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                window.location.href = 'mainpage.html';
            } else {
                alert('Error: ' + (data.error || 'Login failed'));
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error connecting to server');
        }
    } else {
        alert('Please enter username and password');
    }
});
