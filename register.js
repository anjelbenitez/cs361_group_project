function displayRegisterForm() {
    document.querySelector('.register_model_container').style.display = 'flex';
}

function closeRegisterForm() {
    document.querySelector('.register_model_container').style.display = 'none';
}

function signUpAttempt() {
    let first_name = document.getElementById('first_name').value;
    let last_name = document.getElementById('last_name').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirm_password').value;
    let signUpForm = new SignUpForm(first_name, last_name, email, username, password, confirm_password)
    console.log("signUpform", signUpForm);
    let formValidated = validateSignUp(signUpForm);
    if (formValidated == true){
        //create account
    }
    else return;
}

function SignUpForm(first_name, last_name, email, username, password, confirm_password) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.confirm_password = confirm_password;
}

SignUpForm.prototype.getFirstName = function() {
    return this.first_name;
}

SignUpForm.prototype.getLastName = function() {
    return this.last_name;
}

SignUpForm.prototype.getEmail = function() {
    return this.email;
}

SignUpForm.prototype.getUsername = function() {
    return this.username;
}

SignUpForm.prototype.getPassword = function() {
    return this.password;
}

SignUpForm.prototype.getConfirmPassword = function() {
    return this.confirm_password;
}

function emptyFieldsVerification(signUpFormObj) {
    let verfication = true;
    if (signUpFormObj.getFirstName().trim().length == 0){
        //display emptyFieldsError
        verfication = false
    }
    else if (signUpFormObj.getLastName().trim().length == 0){
        //display emptyFieldsError
        verfication = false
    }
    else if (signUpFormObj.getEmail().trim().length == 0){
        //display emptyFieldsError
        verfication = false
    }
    else if (signUpFormObj.getUsername().trim().length == 0){
        //display emptyFieldsError
        verfication = false
    }
    else if (signUpFormObj.getPassword().trim().length == 0){
        //display emptyFieldsError
        verfication = false
    }
    else if (signUpFormObj.getConfirmPassword().trim().length == 0){
        //display emptyFieldsError
        verfication = false
    }

    if (verfication == false){
        return false
    }
    else return true; 
}

function validateSignUp(signUpFormObj) {
    console.log(emptyFieldsVerification(signUpFormObj));
    if (emptyFieldsVerification(signUpFormObj) == true) {
        return true;
    }
}

document.getElementById('register_button').addEventListener('click', displayRegisterForm);

document.getElementById('register_close').addEventListener('click', function(event){
    closeRegisterForm();
    event.preventDefault;
});

document.getElementById('create_account_button').addEventListener('click', function(event){
    signUpAttempt();
    event.preventDefault;
    event.stopPropagation;
});