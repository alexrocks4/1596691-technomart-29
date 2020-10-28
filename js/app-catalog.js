
/*** Show added to the basket modal ***/

const buyButtons = document.querySelectorAll('.product-actions-buy');
const toTheBasketModal = document.querySelector('.to-basket-modal');

buyButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
      evt.preventDefault();
      toTheBasketModal.classList.add('modal-show');
    });
});

/*** Close modal windows ***/

const closeModalButtons = document.querySelectorAll('.button-close-modal');

/* General actions for all modals while closing */
function closeModal(evt, modal) {
    evt.preventDefault();
    modal.classList.remove('modal-show');
    modal.classList.remove('modal-error');
}

/* Close modals on close-button click */
closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        closeModal(evt, button.closest('.modal'));
    });
});


/* Close modals on Esc key presse */
window.addEventListener('keydown', function(evt) {

    if (evt.code === 'Escape') {
        const openedModal = document.querySelector('.modal.modal-show');

        if (openedModal) closeModal(evt, openedModal);
    }
});

