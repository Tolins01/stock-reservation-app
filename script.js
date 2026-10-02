const searchInput = document.getElementById("searchInput");
const tableRows = document.querySelectorAll("#reservationsTable tbody tr");
const toast = document.getElementById("toast");
const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();

  tableRows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(query);
    row.style.display = matches ? "" : "none";
  });
});

document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => {
    const reservationId = button.closest("tr").children[0].textContent;
    showToast(`Opening ${reservationId}`);
  });
});

document.querySelector(".view-all").addEventListener("click", () => {
  showToast("Opening all reservations");
});

document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".nav-link.active").classList.remove("active");
    button.classList.add("active");
    showToast(`${button.textContent.trim()} selected`);
    sidebar.classList.remove("open");
  });
});

document.getElementById("createReservation").addEventListener("click", () => {
  showToast("Create Reservation selected");
});

document.querySelectorAll(".quick:not(.primary)").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(`${button.textContent.trim()} selected`);
  });
});

document.querySelector(".notification").addEventListener("click", () => {
  showToast("You have 1 new notification");
});

document.querySelector(".user-menu").addEventListener("click", () => {
  showToast("Profile menu selected");
});

mobileMenu.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});
