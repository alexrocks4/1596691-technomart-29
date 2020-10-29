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


/*** 
 * Making alive any slider switchers. Slider must have:
 * 
 * - switchers(any ineractive HTML element that switches slides)
 * - items(images, text, ...etc)
 * - active switcher class name
 * - active item class name 
 * 
 * The order of items and switchers in HTML must be the same.
 ***/

function aliveSliderSwitchers({
    switchersSelector,
    itemsSelector,
    activeSwitcherClass,
    activeItemClass
    }) {

    const sliderSwitchers = document.querySelectorAll('.' + switchersSelector);
    const sliderItems = document.querySelectorAll('.' + itemsSelector);

    function showSlide(sliderItem, sliderSwitcher) {
        sliderItem.classList.add(activeItemClass);
        sliderSwitcher.classList.add(activeSwitcherClass);
    }

    function hideSlide() {
        document.querySelector('.' + activeSwitcherClass).classList.remove(activeSwitcherClass);
        document.querySelector('.' + activeItemClass).classList.remove(activeItemClass);
    }

    sliderSwitchers.forEach(function(switcher, currentIndex) {
        switcher.addEventListener('click', function(evt) {
            evt.preventDefault();
            /* If user has clicked on the active switcher - nothing to do */
            if (switcher.classList.contains(activeSwitcherClass)) return;
            hideSlide();
            showSlide(sliderItems[currentIndex], switcher);
        })
    });
}

/*** Making alive slider switches in promo block ***/
const promoSliderOptions = {
    switchersSelector: 'slider-switch',
    itemsSelector: 'slider-item',
    activeSwitcherClass: 'slider-switch--active',
    activeItemClass: 'slider-item--active'
};
aliveSliderSwitchers(promoSliderOptions);

/*** Making alive slider switches in services block ***/
const servicesSliderOptions = {
    switchersSelector: 'services-menu-button',
    itemsSelector: 'services-item',
    activeSwitcherClass: 'services-menu-active',
    activeItemClass: 'services-item-active'
};
aliveSliderSwitchers(servicesSliderOptions);

/* Promo-block sliders back and forward buttons logic. */
const backButton = document.querySelector('.slider-back-button');
const forwardButton = document.querySelector('.slider-forward-button');
const sliderSwitchers = document.querySelectorAll('.slider-switch');
const sliderItems = document.querySelectorAll('.slider-item');

backButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    let activeItemId;
    let newActiveItemId;
    /* Find active slider item id */
    sliderItems.forEach(function(sliderItem, sliderItemId) {
        if (sliderItem.classList.contains('slider-item--active')) activeItemId = sliderItemId;
    });
    newActiveItemId = activeItemId - 1;
    /* If this is first slider item then slide to last slider item */
    if (newActiveItemId < 0) newActiveItemId = sliderItems.length - 1;
    /* Hide old active slide and deactivate corresponding switcher */
    document.querySelector('.slider-switch--active').classList.remove('slider-switch--active');
    document.querySelector('.slider-item--active').classList.remove('slider-item--active');
    /* Show new active slide an activate corresponding switcher */
    sliderItems[newActiveItemId].classList.add('slider-item--active');
    sliderSwitchers[newActiveItemId].classList.add('slider-switch--active');
});

forwardButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    let activeItemId;
    let newActiveItemId;
    /* Find active slider item id */
    sliderItems.forEach(function(sliderItem, sliderItemId) {
        if (sliderItem.classList.contains('slider-item--active')) activeItemId = sliderItemId;
    });
    newActiveItemId = activeItemId + 1;
    /* If this is the last slider item then slide to first slider item */
    if (newActiveItemId > sliderItems.length - 1) newActiveItemId = 0;
    /* Hide old active slide and deactivate corresponding switcher */
    document.querySelector('.slider-switch--active').classList.remove('slider-switch--active');
    document.querySelector('.slider-item--active').classList.remove('slider-item--active');
    /* Show new active slide an activate corresponding switcher */
    sliderItems[newActiveItemId].classList.add('slider-item--active');
    sliderSwitchers[newActiveItemId].classList.add('slider-switch--active');
});
