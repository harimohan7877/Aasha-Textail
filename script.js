document.addEventListener("DOMContentLoaded", () => {
    console.log("वेबसाइट लोड हो गई!");

    // 🌐 HTML खंडों को गतिशील रूप से लोड करें
    const sections = ["header", "hero", "ladies-items", "youtube-channel", "about-us", "contact", "footer"];
    sections.forEach(section => {
        fetch(`${section}.html`)
            .then(response => response.text())
            .then(data => document.getElementById(section).innerHTML = data)
            .catch(error => console.error(`${section}.html लोड करने में त्रुटि:`, error));
    });

    // 🛒 शॉपिंग कार्ट प्रणाली
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("वर्तमान कार्ट:", cart);
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-item-btn")) {
            const itemCard = e.target.closest(".category-card");
            if (itemCard) {
                const itemName = itemCard.querySelector(".item-name").textContent;
                const price = itemCard.querySelector(".item-price").textContent;

                cart.push({ itemName, price });
                updateCart();
                alert(`${itemName} कार्ट में जोड़ा गया!`);
            }
        }
    });

    // 🎥 YouTube वीडियो लेजी लोडिंग
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

    // 📜 स्मूथ स्क्रॉलिंग
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // 🌙 डार्क मोड टॉगल
    const themeToggle = document.getElementById("theme-toggle");
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    function applyTheme() {
        document.body.classList.toggle("dark-mode", darkMode);
        themeToggle.textContent = darkMode ? "☀ लाइट मोड" : "🌙 डार्क मोड";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            darkMode = !darkMode;
            localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
            applyTheme();
        });
        applyTheme();
    }

    // 🛒 उत्पाद स्लाइडर ड्रैग स्क्रॉल
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

    // 📧 संपर्क फॉर्म सबमिशन
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

    // पूर्ण स्क्रीन छवि देखें
    const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const closeFullscreen = document.querySelector('.close-fullscreen');
    const categoryCards = document.querySelectorAll('.category-card img');

    categoryCards.forEach(img => {
        img.addEventListener('click', function() {
            fullscreenImage.src = this.src;
            fullscreenOverlay.style.display = 'flex';
        });
    });

    closeFullscreen.addEventListener('click', function() {
        fullscreenOverlay.style.display = 'none';
    });

    // और अधिक दिखाएँ बटन कार्यक्षमता
    const showMoreBtn = document.querySelector('.show-more-btn');
    const categoryGrid = document.querySelector('.category-grid');
    let visibleItems = 12;

    function showItems() {
        const allItems = categoryGrid.querySelectorAll('.category-card');
        allItems.forEach((item, index) => {
            if (index < visibleItems) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        if (visibleItems >= allItems.length) {
            showMoreBtn.style.display = 'none';
        }
    }

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            visibleItems += 12;
            showItems();
        });
    }

    // प्रारंभिक प्रदर्शन
    showItems();
});
