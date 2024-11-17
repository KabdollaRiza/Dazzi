const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const c_password = document.getElementById('c_password');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username: username.value.trim(), email: email.value.trim(), password: password.value.trim() });
        localStorage.setItem("users", JSON.stringify(users));
        
        alert("Registration successful! Thank you for signing up.");
        window.location.href = "login.html"; 
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    errorDisplay.style.color = 'red';
    errorDisplay.style.fontSize = '14px';
    errorDisplay.style.marginTop = '5px';
    errorDisplay.style.display = 'block';
    element.style.borderColor = 'red';
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    element.style.borderColor = 'green';
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    let isFormValid = true;

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const c_passwordValue = c_password.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is required');
        isFormValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        isFormValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isFormValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isFormValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        isFormValid = false;
    } else {
        setSuccess(password);
    }

    if (c_passwordValue === '') {
        setError(c_password, 'Please confirm your password');
        isFormValid = false;
    } else if (c_passwordValue !== passwordValue) {
        setError(c_password, "Passwords don't match");
        isFormValid = false;
    } else {
        setSuccess(c_password);
    }

    return isFormValid;
}
