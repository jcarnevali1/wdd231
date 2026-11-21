const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toLocaleString();

const membershipButtons = document.querySelectorAll(".membership-button");

membershipButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const modal = document.querySelector(button.getAttribute("href"));
        modal.showModal();
    });
});

const modals = document.querySelectorAll("dialog");

modals.forEach((modal) => {
    const closeButton = modal.querySelector(".close-modal");
    closeButton.addEventListener("click", () => {
        modal.close();
    });
});