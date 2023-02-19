(() => {
    const refs = {
      openModalBtn: document.querySelector(".login"),
      closeModalBtn: document.querySelector("[data-modal-close-auth]"),
      modal: document.querySelector("[data-modal-auth]"),
      submitReg: document.querySelector(".submit-auth"),

    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    refs.submitReg.addEventListener("click", toggleModal);
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();