function displayRegisterForm() {
    document.querySelector('.register_model_container').style.display = 'flex';
}

function closeRegisterForm() {
    document.querySelector('.register_model_container').style.display = 'none';
}

document.getElementById('register_button').addEventListener('click', displayRegisterForm);

document.getElementById('register_close').addEventListener('click', closeRegisterForm);