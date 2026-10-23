
// ==========================================
// JONATHAN MORALES — ENGINEERING LAB
// JAVASCRIPT PRINCIPAL
// ==========================================

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // AÑO AUTOMÁTICO
  // ========================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // ========================================
  // MENÚ MÓVIL
  // ========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navigationLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("open");
    navLinks.classList.remove("show");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("show");

      menuToggle.classList.toggle("open", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }


  // ========================================
  // HEADER AL HACER SCROLL
  // ========================================

  const header = document.getElementById("header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  // ========================================
  // ANIMACIONES AL APARECER EN PANTALLA
  // ========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // ========================================
  // NAVEGACIÓN ACTIVA SEGÚN LA SECCIÓN
  // ========================================

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navigationLinks.forEach((link) => {

            const linkId = link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkId === `#${currentId}`
            );

          });

        });

      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  // ========================================
  // BIENVENIDA AL LABORATORIO
  // ========================================

  const welcomeMessage = document.getElementById("lab-welcome");

  if (welcomeMessage) {

    let alreadyShown = false;

    try {
      alreadyShown =
        sessionStorage.getItem("labWelcomeShown") === "true";
    } catch {
      // Continúa si el almacenamiento está bloqueado.
    }

    if (!alreadyShown) {

      setTimeout(() => {
        welcomeMessage.classList.add("show");
      }, 700);

      setTimeout(() => {
        welcomeMessage.classList.remove("show");
      }, 5200);

      try {
        sessionStorage.setItem("labWelcomeShown", "true");
      } catch {
        // La bienvenida no depende del almacenamiento.
      }
    }
  }


  // ========================================
  // EFECTO SUAVE DEL PANEL HOLOGRÁFICO
  // SOLO EN COMPUTADORES
  // ========================================

  const labInterface = document.querySelector(".lab-interface");

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (
    labInterface &&
    finePointer.matches &&
    !reducedMotion.matches
  ) {

    labInterface.addEventListener("mousemove", (event) => {

      const rect = labInterface.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY =
        ((event.clientX - centerX) / rect.width) * 5;

      const rotateX =
        ((centerY - event.clientY) / rect.height) * 5;

      labInterface.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;
    });

    labInterface.addEventListener("mouseleave", () => {
      labInterface.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

  }

});



/* ==========================================
   ENLACES TEMPORALES — EN CONSTRUCCIÓN
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const constructionPage = "construccion.html";

  document.querySelectorAll("a[href]").forEach((link) => {
    // Conservamos los enlaces que llevan a la propia
    // página de construcción o al inicio desde ella.
    const href = link.getAttribute("href");

    if (
      href === constructionPage ||
      href === "index.html"
    ) {
      return;
    }

    // Todos los demás enlaces llevan a construcción.
    link.setAttribute("href", constructionPage);

    // Evita abrir pestañas externas innecesarias.
    link.removeAttribute("target");
    link.removeAttribute("rel");
  });
});
