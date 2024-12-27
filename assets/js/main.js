
document.addEventListener('DOMContentLoaded', function () {

    try {
        const btns = document.querySelectorAll('[data-modal]');
        const body = document.querySelector('body');
        const btnClose = document.querySelectorAll('[data-modal-close]');

        btns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const modalId = e.target.closest('[data-modal]').getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('modal--active');
                    body.style.overflow = 'hidden';
                    addModalEventListeners(modal);
                }
            });
        });

        btnClose.forEach(close => {
            close.addEventListener('click', e => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    closeModal(modal);
                }
            });
        });

        function addModalEventListeners(modal) {
            modal.addEventListener('keydown', onModalKeyDown);
            modal.addEventListener('click', onModalClick);
        }

        function removeModalEventListeners(modal) {
            modal.removeEventListener('keydown', onModalKeyDown);
            modal.removeEventListener('click', onModalClick);
        }

        function closeModal(modal) {
            modal.classList.remove('modal--active');
            body.style.overflowY = '';
            removeModalEventListeners(modal);
        }

        function onModalKeyDown(e) {
            const modal = e.currentTarget;
            if (e.key === 'Escape') {
                closeModal(modal);
            }
        }

        function onModalClick(e) {
            const modalContent = e.currentTarget.querySelector('.modal__content');
            if (!modalContent.contains(e.target)) {
                closeModal(e.currentTarget);
            }
        }


    } catch (error) {
    }


    let burgerBtn = document.querySelector('#burger');
    let burgerMenu = document.querySelector('.header__nav');

    burgerBtn.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    })

    let headerLinks = document.querySelectorAll('.header__link');
    headerLinks.forEach((item) => {
        item.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
        })
    })



})

document.querySelectorAll('input[type="tel"]').forEach((input) => {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
        }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

});


let formsRegular = document.querySelectorAll('.form__box');

formsRegular.forEach(function (form) {

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let name = form.querySelector('#user-name');
        let phone = form.querySelector('#user-phone');
        let acceptance = form.querySelector('[name="acceptance"]');

        if (name.value === '') {
            alert('Заполните поле с именем');
            return false;
        }

        if (phone.value === '') {
            alert('Заполните поле с номером телефона');
            return false;
        }

        if (!acceptance.checked) {
            alert('Необходимо согласие на обработку персональных данных');
            return false;
        }


        var form_data = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${CURRENT_DOMAIN}/wp-content/themes/autodv/send.php`, true);
        xhr.send(form_data);
        xhr.onload = function () {
            if (xhr.status == 200) {
                form.reset();

                if (form.parentElement.parentElement.parentElement.parentElement.classList.contains('modal--active')) {
                    form.parentElement.parentElement.parentElement.parentElement.classList.remove('modal--active');
                    document.querySelector('body').style = '';
                }
                alert('Ваше сообщение успешно отправлено.');
            }
            else {

                alert('Ошибка при отправке сообщения. Попробуйте позже');
            }
        };
    })


})
