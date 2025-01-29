document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded!");

    // 🌐 Load HTML Sections Dynamically
    const sections = ["header", "hero", "ladies-items", "youtube-channel", "about-us", "contact", "footer"];
    sections.forEach(section => {
        fetch(`${section}.html`)
            .then(response => response.text())
            .then(data => document.getElementById(section).innerHTML = data)
            .catch(error => console.error(`Error loading ${section}.html:`, error));
    });

    // 🛒 Shopping Cart System
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Current Cart:", cart);
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-item-btn")) {
            const itemCard = e.target.closest(".category-card");
            if (itemCard) {
                const itemName = itemCard.querySelector(".item-name").textContent;
                const price = itemCard.querySelector(".item-price").textContent;

                cart.push({ itemName, price });
                updateCart();
                alert(`${itemName} added to cart!`);
            }
        }
    });

    // 🎥 YouTube Video Lazy Loading
    const youtubeContainer = document.querySelector(".video-container");
    const youtubeButton = document.querySelector("#youtube-channel .btn");

    if (youtubeButton) {
        youtubeButton.addEventListener("click", (e) => {
            e.preventDefault();
            const iframe = youtubeContainer.querySelector("iframe");
            const src = iframe.getAttribute("src");
            iframe.setAttribute("src", src + "&autoplay=1");
        });
    }

    // 📜 Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // 🌙 Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    function applyTheme() {
        document.body.classList.toggle("dark-mode", darkMode);
        themeToggle.textContent = darkMode ? "☀ Light Mode" : "🌙 Dark Mode";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            darkMode = !darkMode;
            localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
            applyTheme();
        });
        applyTheme();
    }

    // 🛒 Product Slider Drag Scroll
    const productSlider = document.querySelector(".product-slider");
    let isDown = false, startX, scrollLeft;

    if (productSlider) {
        productSlider.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - productSlider.offsetLeft;
            scrollLeft = productSlider.scrollLeft;
        });

        productSlider.addEventListener("mouseleave", () => isDown = false);
        productSlider.addEventListener("mouseup", () => isDown = false);

        productSlider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - productSlider.offsetLeft;
            const walk = (x - startX) * 3;
            productSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // 📧 Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");

            // WhatsApp पर संदेश भेजने के लिए URL तैयार करें
            const whatsappNumber = "7852004401"; // अपना WhatsApp नंबर यहाँ डालें
            const whatsappMessage = `नाम: ${name}%0Aईमेल: ${email}%0Aसंदेश: ${message}`;
            const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

            // WhatsApp संदेश भेजें (पृष्ठभूमि में)
            fetch(whatsappURL, { mode: "no-cors" })
                .then(() => {
                    console.log("WhatsApp संदेश भेजा गया");
                })
                .catch((error) => {
                    console.error("WhatsApp संदेश भेजने में त्रुटि:", error);
                });

            // उपयोगकर्ता को सूचना दें और फॉर्म रीसेट करें
            alert("धन्यवाद! आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।");
            contactForm.reset();
        });
    }
});