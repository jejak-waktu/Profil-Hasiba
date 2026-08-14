/* =====================================
   HASIBA ACADEMY
   Official Website
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // Select Elements
    // =========================

    const loader = document.querySelector(".loader");
    const header = document.querySelector("header");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");

    const faqItems = document.querySelectorAll(".faq-item");
    const counters = document.querySelectorAll(".counter");

    const revealElements = document.querySelectorAll(
        "section, .program-card, .value-card, .why-card, .quality-card"
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
    // Navbar On Scroll
    // =========================

    const handleNavbar = () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbar);

    handleNavbar();


    // =========================
    // Mobile Menu
    // =========================

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("show");

            const isOpen = nav.classList.contains("show");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        // Tutup menu setelah link diklik
        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });


        // Tutup menu jika klik di luar navbar
        document.addEventListener("click", (event) => {
            const clickedInsideMenu =
                nav.contains(event.target);

            const clickedMenuButton =
                menuBtn.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {
                nav.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }


    // =========================
    // FAQ Accordion
    // =========================

    faqItems.forEach((item) => {
        const button =
            item.querySelector(".faq-question");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });


    // =========================
    // Counter Animation
    // =========================

    let counted = false;

    const animateCounter = (counter) => {
        const target =
            Number(counter.dataset.target);

        const duration = 1500;

        const startTime =
            performance.now();


        const updateCounter = (currentTime) => {
            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const value =
                Math.floor(
                    progress * target
                );

            counter.textContent = value;


            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            } else {
                counter.textContent =
                    target;
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


        const triggerPoint =
            statistics.getBoundingClientRect().top;


        if (
            triggerPoint <
            window.innerHeight - 150
        ) {
            counted = true;

            counters.forEach(
                (counter) => {
                    animateCounter(counter);
                }
            );
        }
    };


    window.addEventListener(
        "scroll",
        handleCounter
    );

    handleCounter();


    // =========================
    // Scroll Reveal
    // =========================

    const revealOnScroll = () => {
        revealElements.forEach(
            (element) => {
                const top =
                    element.getBoundingClientRect()
                        .top;


                if (
                    top <
                    window.innerHeight - 120
                ) {
                    element.classList.add(
                        "active"
                    );
                }
            }
        );
    };


    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();


    // =========================
    // Back To Top Button
    // =========================

    const topBtn =
        document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.className =
        "top-btn";

    topBtn.type = "button";

    topBtn.setAttribute(
        "aria-label",
        "Kembali ke atas"
    );


    document.body.appendChild(
        topBtn
    );


    const handleTopButton = () => {
        if (window.scrollY > 500) {
            topBtn.classList.add(
                "show"
            );
        } else {
            topBtn.classList.remove(
                "show"
            );
        }
    };


    window.addEventListener(
        "scroll",
        handleTopButton
    );

    handleTopButton();


    topBtn.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    // =========================
    // Smooth Scroll
    // =========================

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
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


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
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


    if (heroTitle) {
        heroTitle.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(50px)"
                },

                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 1200,
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
        copyright.innerHTML =
            `© ${year} Hasiba Academy. All Rights Reserved.`;
    }
});