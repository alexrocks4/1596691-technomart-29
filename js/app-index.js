/*** Write-us modal ***/

function presetWriteUsModal() {

    const contactsButton = document.querySelector('.contacts-button');
    const modal = document.querySelector('.write-us-modal');
    const firstInput = modal.querySelector('input:first-of-type');
    const form = modal.querySelector('.write-us-modal-form');
    const name = modal.querySelector('[name="name"]');
    const email = modal.querySelector('[name="email"]');
    const message = modal.querySelector('[name="message"]');
    let isStorageSupport = true;
    let storageName = '';
    let storageEmail = '';

    /* Check localStorage support */
    try {
        storageName = localStorage.getItem('name');
        storageEmail = localStorage.getItem('email');
    } catch {
        isStorageSupport = false;
    }

    /* Show modal */
    contactsButton.addEventListener('click', function(evt) {
        evt.preventDefault();
        modal.classList.add('modal-show');
        firstInput.focus();
        if (storageName) name.value = storageName;
        if (storageEmail) email.value = storageEmail;
    });

    /* Validate form */
    form.addEventListener('submit', function(evt) {

        if (!name.value || !email.value || !message.value) {
            evt.preventDefault();
            modal.classList.remove('modal-error');
            modal.offsetWidth = modal.offsetWidth;
            modal.classList.add('modal-error');
        } else {

            if (isStorageSupport) {
                localStorage.setItem('name', name.value);
                localStorage.setItem('email', email.value);
            }
        }
    });
}

presetWriteUsModal();


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


/*** Show map modal ***/

const mapLink = document.querySelector('.contacts-map');
const mapModal = document.querySelector('.map-modal');

mapLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  mapModal.classList.add('modal-show');
});


/*** Slider in promo block ***/

const sliderSwitchers = document.querySelectorAll('.slider-switch');
const sliderItems = document.querySelectorAll('.slider-item');

/* Slider switchers logic*/
sliderSwitchers.forEach(function(switcher, currentIndex) {
  switcher.addEventListener('click', function(evt) {
    evt.preventDefault();
    /* If user clicked on the active switcher - nothing to do */
    if (switcher.classList.contains('slider-switch--active')) return;
    /* Deactivate current active switcher and slide */
    document.querySelector('.slider-switch--active').classList.remove('slider-switch--active');
    document.querySelector('.slider-item--active').classList.remove('slider-item--active');
    /* Make active new switcher and slide */
    switcher.classList.add('slider-switch--active');
    sliderItems[currentIndex].classList.add('slider-item--active');
  })
});
