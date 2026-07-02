document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------
    // 1. Hero Image Slider Carousel
    // -----------------------------------------
    const heroSection = document.getElementById("hero-slider");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");

    const slides = [
        "hero_image.jpg",
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000",
        "https://images.unsplash.com/photo-1472851294608-062f824d296e?q=80&w=2000"
    ];

    let currentSlideIndex = 0;
    let autoSlideInterval;

    const updateSlide = () => {
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${slides[currentSlideIndex]}')`;
        }
    };

    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlide();
        }, 5000);
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlide();
            startAutoSlide(); // reset timer on manual action
        });

        nextBtn.addEventListener("click", () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlide();
            startAutoSlide(); // reset timer on manual action
        });
    }

    // Initialize first slide and start auto timer
    updateSlide();
    startAutoSlide();

    // -----------------------------------------
    // 2. Product Search Filter
    // -----------------------------------------
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const cards = document.querySelectorAll("#shop-section .box");
    const noProductsMsg = document.getElementById("no-products-msg");

    const filterProducts = () => {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
            const productType = card.getAttribute("data-product") || "";
            const title = card.querySelector("h2") ? card.querySelector("h2").innerText.toLowerCase() : "";

            if (productType.includes(query) || title.includes(query) || query === "") {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Toggle "no products found" warning
        if (noProductsMsg) {
            if (visibleCount === 0) {
                noProductsMsg.style.display = "flex";
            } else {
                noProductsMsg.style.display = "none";
            }
        }
    };

    if (searchInput) {
        // Real-time search filter as they type
        searchInput.addEventListener("input", filterProducts);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener("click", filterProducts);
    }

    // -----------------------------------------
    // 3. Cart Increment Counters
    // -----------------------------------------
    let cartCount = 0;
    const cartCountSpan = document.getElementById("cart-count");
    const cartButton = document.getElementById("cart-button");
    const addToCartBtns = document.querySelectorAll(".add-to-cart");

    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent triggering card actions
            cartCount++;
            
            if (cartCountSpan) {
                cartCountSpan.innerText = cartCount;
            }

            // Animate Cart Counter Badge
            if (cartButton) {
                cartButton.style.borderColor = "var(--amazon-gold)";
                cartButton.style.boxShadow = "0 0 10px rgba(254, 189, 105, 0.4)";
                
                setTimeout(() => {
                    cartButton.style.borderColor = "transparent";
                    cartButton.style.boxShadow = "none";
                }, 400);
            }
            
            // Visual check button animation
            const originalText = btn.innerText;
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
            btn.style.backgroundColor = "#22c55e";
            btn.style.color = "#ffffff";
            btn.style.borderColor = "#16a34a";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "var(--amazon-yellow)";
                btn.style.color = "#111";
                btn.style.borderColor = "#a88734 #9c7e31 #846a29";
            }, 1000);
        });
    });

    // -----------------------------------------
    // 4. Smooth Back to Top
    // -----------------------------------------
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
