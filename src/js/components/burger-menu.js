(() => {
  const menuBtnRef = document.querySelector("[date-menu-button]");
  const mobileMenuRef = document.querySelector("[date-menu]");
  const searchRef = document.querySelector(".form-search");
  menuBtnRef.addEventListener("click", () => {
      const expanded =
          menuBtnRef.getAttribute("aria-expanded") === 'true' || false;
      
      menuBtnRef.classList.toggle("is-open");
      menuBtnRef.setAttribute("aria-expanded", !expanded);
      mobileMenuRef.classList.toggle("is-open");
      searchRef.classList.toggle("is-open");
      document.body.classList.toggle("is-open");

  });
})();