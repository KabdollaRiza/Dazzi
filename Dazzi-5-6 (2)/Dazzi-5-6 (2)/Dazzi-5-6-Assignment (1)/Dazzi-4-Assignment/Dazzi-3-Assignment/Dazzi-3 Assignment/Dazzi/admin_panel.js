const users = [
    { username: "admin", password: "riza2006", role: "admin" },
    { username: "admin", password: "dinara2005", role: "admin"}
];

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user && user.role === "admin") {
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-message").textContent = "Invalid credentials or access restricted to admins.";
    }
});
