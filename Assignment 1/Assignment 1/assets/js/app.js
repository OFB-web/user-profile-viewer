const userList = document.getElementById('userList');
const userDetails = document.getElementById('userDetails');
const errorContainer = document.getElementById('errorContainer');

// State
let activeUserId = null;

// Fetch users from API
async function fetchUsers() {
    try {
        userList.innerHTML = '<div class="loading">Loading users</div>';

        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();
        displayUserList(users);
    } catch (error) {
        console.error('Fetch Error:', error);
        showError(`Failed to load users: ${error.message}`);
    }
}

// Display the list of users
function displayUserList(users) {
    userList.innerHTML = '';

    if (users.length === 0) {
        userList.innerHTML = '<p>No users found</p>';
        return;
    }

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user-item');
        userElement.dataset.userId = user.id;
        userElement.innerHTML = `
            <span>${user.name}</span>
        `;

        userElement.addEventListener('click', () => {
            // Remove active class from all users
            document.querySelectorAll('.user-item').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to clicked user
            userElement.classList.add('active');

            // Set active user ID
            activeUserId = user.id;

            // Display user details
            displayUserDetails(user);
        });

        userList.appendChild(userElement);
    });
}

function displayUserDetails(user) {
    userDetails.innerHTML = `
        <div class="detail-card">
            <div class="detail-section">
                <h3>Personal Info</h3>
                <div class="detail-item">
                    <span class="detail-label">Name:</span> ${user.name}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Username:</span> ${user.username}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span> ${user.email}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone:</span> ${user.phone}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Website:</span> ${user.website}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Address</h3>
                <div class="detail-item">
                    <span class="detail-label">Street:</span> ${user.address.street}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Suite:</span> ${user.address.suite}
                </div>
                <div class="detail-item">
                    <span class="detail-label">City:</span> ${user.address.city}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Zipcode:</span> ${user.address.zipcode}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Company</h3>
                <div class="detail-item">
                    <span class="detail-label">Name:</span> ${user.company.name}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Business:</span> ${user.company.catchPhrase}
                </div>
                <div class="detail-item">
                    <span class="detail-label">Strategy:</span> ${user.company.bs}
                </div>
            </div>
        </div>
    `;
}

// Show error message
function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');

    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorContainer.classList.add('hidden');
    }, 5000);
}

// Initialize the application
function init() {
    fetchUsers();
}

document.addEventListener('DOMContentLoaded', init);