
const form = document.querySelector("#contact-form");
const successMessage = document.querySelector("#success-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value,
    };

    try {
        
        const scriptUrl = "https://script.google.com/macros/s/AKfycbwlmg2HT87hyg4FAoPLdJynFz2Us5aQPRBV_152qY1F4RX3zyIROpBTyGPUbqUMPqSEPw/exec";
        
        fetch(scriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        form.reset();
        successMessage.style.display = "block";

        // Hide it after 5 seconds (optional)
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 5000);
        
    } catch (error) {
        console.error("Error:", error);
        return;
    }
});