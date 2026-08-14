/* =====================================
   HASIBA ACADEMY
   Official Website
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    const header = document.querySelector("header");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");

    const faqItems = document.querySelectorAll(".faq-item");
    const counters = document.querySelectorAll(".counter");

    const revealElements = document.querySelectorAll(
        ".program-card, .info-card, .why-card, .quality-card, .vision-card, .mission-card"
    );


    // =========================
    // Loader
    // =========================

    window.addEventListener("load", () => {
        if (!loader) {
            return;
        }

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    });


    // =========================
    // Navbar
    // =========================

    const updateNavbar = () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // =========================
    // Mobile Menu
    // =========================

    if (menuBtn && nav) {
        const closeMenu = () => {
            nav.classList.remove("show");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Buka menu"
            );
        };


        const openMenu = () => {
            nav.classList.add("show");

            menuBtn.setAttribute(
                "aria-expanded",
                "true"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Tutup menu"
            );
        };


        menuBtn.addEventListener("click", (event) => {
            event.stopPropagation();

            if (nav.classList.contains("show")) {
                closeMenu();
            } else {
                openMenu();
            }
        });


        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });


        document.addEventListener("click", (event) => {
            if (
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMenu();
            }
        });


        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });
    }


    // =========================
    // FAQ Accordion
    // =========================

    faqItems.forEach((item) => {
        const button = item.querySelector(
            ".faq-question"
        );

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            const isActive =
                item.classList.contains("active");

            faqItems.forEach((otherItem) => {
                otherItem.classList.remove("active");

                const otherButton =
                    otherItem.querySelector(
                        ".faq-question"
                    );

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            });

            if (!isActive) {
                item.classList.add("active");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        });
    });


    // =========================
    // Counter Animation
    // =========================

    let counted = false;

    const animateCounter = (counter) => {
        const target = Number(
            counter.dataset.target
        );

        const duration = 1400;
        const startTime = performance.now();


        const updateCounter = (currentTime) => {
            const elapsed =
                currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const value = Math.floor(
                progress * target
            );

            counter.textContent = value;


            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            } else {
                counter.textContent = target;
            }
        };


        requestAnimationFrame(
            updateCounter
        );
    };


    const handleCounter = () => {
        const statistics =
            document.querySelector(
                ".statistics"
            );

        if (!statistics || counted) {
            return;
        }

        const top =
            statistics.getBoundingClientRect()
                .top;

        if (
            top <
            window.innerHeight - 100
        ) {
            counted = true;

            counters.forEach((counter) => {
                animateCounter(counter);
            });
        }
    };


    window.addEventListener(
        "scroll",
        handleCounter,
        { passive: true }
    );

    handleCounter();


    // =========================
    // Scroll Reveal
    // =========================

    const revealOnScroll = () => {
        revealElements.forEach((element) => {
            const top =
                element.getBoundingClientRect()
                    .top;

            if (
                top <
                window.innerHeight - 80
            ) {
                element.classList.add(
                    "visible"
                );
            }
        });
    };


    window.addEventListener(
        "scroll",
        revealOnScroll,
        { passive: true }
    );

    revealOnScroll();


    // =========================
    // Back To Top
    // =========================

    const topBtn =
        document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.className = "top-btn";

    topBtn.type = "button";

    topBtn.setAttribute(
        "aria-label",
        "Kembali ke atas"
    );

    document.body.appendChild(topBtn);


    const updateTopButton = () => {
        if (window.scrollY > 500) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    };


    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );

    updateTopButton();


    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // =========================
    // Smooth Scroll
    // =========================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {
            anchor.addEventListener(
                "click",
                (event) => {
                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        10;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            );
        });


    // =========================
    // Hero Animation
    // =========================

    const heroTitle =
        document.querySelector(
            ".hero-left h1"
        );


    if (
        heroTitle &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        heroTitle.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(35px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 900,
                easing: "ease-out",
                fill: "forwards"
            }
        );
    }


    // =========================
    // Footer Year
    // =========================

    const year =
        new Date().getFullYear();

    const copyright =
        document.querySelector(
            ".copyright p"
        );


    if (copyright) {
        copyright.textContent =
            `© ${year} Hasiba Academy. All Rights Reserved.`;
    }
});