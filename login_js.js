document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    const loginUser = document.getElementById('login-user');
    const loginPass = document.getElementById('login-pass');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    const signupUser = document.getElementById('signup-user');
    const signupPass = document.getElementById('signup-pass');
    const signupBtn = document.getElementById('signup-btn');
    const signupSuccess = document.getElementById('signup-success');

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginError.textContent = '';
        signupSuccess.textContent = '';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginError.textContent = '';
        signupSuccess.textContent = '';
    });

    signupBtn.addEventListener('click', () => {
        const user = signupUser.value.trim();
        const pass = signupPass.value.trim();

        if (user === '' || pass === '') {
            alert('Please enter a username and password.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('planner_users') || '[]');

        if (users.find(u => u.user === user)) {
            alert('Username already exists!');
            return;
        }

        users.push({ user: user, pass: pass });
        localStorage.setItem('planner_users', JSON.stringify(users));

        signupSuccess.textContent = 'Account created successfully! Please log in.';
        signupUser.value = '';
        signupPass.value = '';
    });

    loginBtn.addEventListener('click', () => {
        const user = loginUser.value.trim();
        const pass = loginPass.value.trim();

        if (user === '' || pass === '') {
            loginError.textContent = 'Please enter a username and password.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('planner_users') || '[]');
        const foundUser = users.find(u => u.user === user && u.pass === pass);

        if (foundUser) {
            localStorage.setItem('planner_currentUser', user);
            window.location.href = 'planner.html';
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });
});