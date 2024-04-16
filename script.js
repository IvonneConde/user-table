document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('tableBody');

    function fetchUsers() {
        return fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data => data.results)
            .catch(error => console.error('Error fetching users:', error));
    }

    function renderUsers(users) {
        tableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name.first}</td>
                <td>${user.name.last}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetchUsers().then(users => renderUsers(users));

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let found = false;

            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });

            if (found) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
