// Retrieve authentication status (e.g., from a cookie or global variable)
const isAuthenticated = true; // Example: Change this based on actual authentication status

// Select the links
const myAccountLink = document.getElementById("myAccountLink");
const logoutLink = document.getElementById("logoutLink");

// Toggle link visibility based on authentication status
if (isAuthenticated) {
  myAccountLink.style.display = "none";
  logoutLink.style.display = "inline"; // Show the logout link
} else {
  myAccountLink.style.display = "inline"; // Show the "My Account" link
  logoutLink.style.display = "none";
}