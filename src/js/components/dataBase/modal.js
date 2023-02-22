import { onGetCookie } from "./getCookie"

(() => {
    const refs = {
      openModalBtn: document.querySelector(".registr"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      submitReg: document.querySelector("[data-submitReg]"),
    };

    onTimeoutOpenModal()
    function onTimeoutOpenModal() {
      if (!onGetCookie('user')) {
        setTimeout(toggleModal, 10000)
      }
    }
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    refs.submitReg.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();


