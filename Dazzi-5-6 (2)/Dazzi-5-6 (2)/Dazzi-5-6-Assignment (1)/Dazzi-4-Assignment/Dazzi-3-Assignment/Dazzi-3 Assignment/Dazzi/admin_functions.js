function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

let users = loadUsers();
let searchQuery = "";
let sortColumn = null;
let sortAscending = true;

function renderUsers() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = `
        <tr>
            <th onclick="sortUsers('username')">Username</th>
            <th onclick="sortUsers('email')">Email</th>
            <th onclick="sortUsers('password')">Password</th>
            <th>Actions</th>
        </tr>
    `;

    const filteredUsers = users.filter(user => {
        return Object.values(user).some(value =>
            value.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    if (sortColumn) {
        filteredUsers.sort((a, b) => {
            const valueA = a[sortColumn].toLowerCase();
            const valueB = b[sortColumn].toLowerCase();
            if (valueA < valueB) return sortAscending ? -1 : 1;
            if (valueA > valueB) return sortAscending ? 1 : -1;
            return 0;
        });
    }

    filteredUsers.forEach((user, index) => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
    });
}


function deleteUser(index) {
    users.splice(index, 1);
    saveUsers(users);
    renderUsers();
}

window.addEventListener('storage', (event) => {
    if (event.key === 'users') {
        users = JSON.parse(event.newValue);
        renderUsers();
    }
});

renderUsers();
