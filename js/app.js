const serviceForm = document.querySelector("#service-form");
const formStatus = document.querySelector("#form-status");
const thankYouModal = document.querySelector("#thank-you-modal");
const errorModal = document.querySelector("#error-modal");
const closeModalButton = document.querySelector(".modal-close");
const closeErrorButton = document.querySelector(".error-close");

function showThankYouModal() {
    if (typeof thankYouModal.showModal === "function") {
        thankYouModal.showModal();
        return;
    }

    thankYouModal.setAttribute("open", "");
}

function closeThankYouModal() {
    if (typeof thankYouModal.close === "function") {
        thankYouModal.close();
        return;
    }

    thankYouModal.removeAttribute("open");
}

function showErrorModal() {
    if (typeof errorModal.showModal === "function") {
        errorModal.showModal();
        return;
    }

    errorModal.setAttribute("open", "");
}

function closeErrorModal() {
    if (typeof errorModal.close === "function") {
        errorModal.close();
        return;
    }

    errorModal.removeAttribute("open");
}

serviceForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = serviceForm.querySelector("button[type='submit']");
    const formData = new FormData(serviceForm);

    formStatus.textContent = "Sending your request...";
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const response = await fetch(serviceForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Form submission failed");
        }

        serviceForm.reset();
        formStatus.textContent = "";
        showThankYouModal();
    } catch (error) {
        formStatus.textContent = "Something went wrong. Please try again, or contact CZ Grass Masters directly.";
        showErrorModal();
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
    }
});

closeModalButton.addEventListener("click", closeThankYouModal);
closeErrorButton.addEventListener("click", closeErrorModal);

thankYouModal.addEventListener("click", (event) => {
    if (event.target === thankYouModal) {
        closeThankYouModal();
    }
});

errorModal.addEventListener("click", (event) => {
    if (event.target === errorModal) {
        closeErrorModal();
    }
});

if (new URLSearchParams(window.location.search).get("preview") === "thanks") {
    showThankYouModal();
}

if (new URLSearchParams(window.location.search).get("preview") === "error") {
    showErrorModal();
}
