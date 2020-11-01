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
        //create account goes here?
    }
    else {
        return;
    }
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
        if (document.querySelector(".first_name_error").childElementCount == 0){
            let first_name_error_msg = document.createElement("span");
            first_name_error_msg.innerHTML = "This field is required";
            first_name_error_msg.style.color = "red";
            first_name_error_msg.style.position = "absolute";
            first_name_error_msg.id = "first_name_error_msg";
            document.querySelector(".first_name_error").appendChild(first_name_error_msg);
        }
        verfication = false;
    }
    else{
        if (document.querySelector(".first_name_error").childElementCount != 0){
            document.getElementById("first_name_error_msg").remove();
        }
    }

    if (signUpFormObj.getLastName().trim().length == 0){
        if (document.querySelector(".last_name_error").childElementCount == 0){
            let last_name_error_msg = document.createElement("span");
            last_name_error_msg.innerHTML = "This field is required";
            last_name_error_msg.style.color = "red";
            last_name_error_msg.style.position = "absolute";
            last_name_error_msg.style.paddingLeft = "245px";
            last_name_error_msg.id = "last_name_error_msg";
            document.querySelector(".last_name_error").appendChild(last_name_error_msg);
        }
        verfication = false;
    }
    else{
        if (document.querySelector(".last_name_error").childElementCount != 0){
            document.getElementById("last_name_error_msg").remove();
        }
    }

    if (signUpFormObj.getUsername().trim().length == 0){
        if (document.querySelector(".username_error").childElementCount == 0){
            let username_error_msg = document.createElement("span");
            username_error_msg.innerHTML = "This field is required";
            username_error_msg.style.color = "red";
            username_error_msg.style.position = "absolute";
            username_error_msg.id = "username_error_msg";
            document.querySelector(".username_error").appendChild(username_error_msg);
        }
        verfication = false;
    }
    else{
        if (document.querySelector(".username_error").childElementCount != 0){
            document.getElementById("username_error_msg").remove();
        }
    }

    if (signUpFormObj.getEmail().trim().length == 0){
        if (document.querySelector(".email_error").childElementCount == 0){
            let email_error_msg = document.createElement("span");
            email_error_msg.innerHTML = "This field is required";
            email_error_msg.style.color = "red";
            email_error_msg.style.position = "absolute";
            email_error_msg.id = "email_error_msg";
            document.querySelector(".email_error").appendChild(email_error_msg);
        }
        verfication = false;
    }
    else{
        if (document.querySelector(".email_error").childElementCount != 0){
            document.getElementById("email_error_msg").remove();
        }
    }

    if (signUpFormObj.getPassword().trim().length == 0){
        if (document.querySelector(".password_error").childElementCount == 0){
            let password_error_msg = document.createElement("span");
            password_error_msg.innerHTML = "This field is required";
            password_error_msg.style.color = "red";
            password_error_msg.style.position = "absolute";
            password_error_msg.id = "password_error_msg";
            document.querySelector(".password_error").appendChild(password_error_msg);
        }
        verfication = false;
    }
    else{
        if (document.querySelector(".password_error").childElementCount != 0){
            document.getElementById("password_error_msg").remove();
        }
    }

    if (signUpFormObj.getConfirmPassword().trim().length == 0){
        if (document.querySelector(".confirm_password_error").childElementCount == 0){
            let confirm_password_error_msg = document.createElement("span");
            confirm_password_error_msg.innerHTML = "This field is required";
            confirm_password_error_msg.style.color = "red";
            confirm_password_error_msg.style.position = "absolute";
            confirm_password_error_msg.id = "confirm_password_error_msg";
            document.querySelector(".confirm_password_error").appendChild(confirm_password_error_msg);
        }
        verfication = false;
    }
    else{
        if (document.querySelector(".confirm_password_error").childElementCount != 0){
            document.getElementById("confirm_password_error_msg").remove();
        }
    }

    if (verfication == false){
        return false;
    }
    else {

        return true;
    }
}

function validateSignUp(signUpFormObj) {
    console.log(emptyFieldsVerification(signUpFormObj));
    if (emptyFieldsVerification(signUpFormObj) == true) {
        return true;
    }
}

document.getElementById('register_button').addEventListener('click', function(event){
    displayRegisterForm();
    event.preventDefault();
    event.stopPropagation();
});

document.getElementById('register_close').addEventListener('click', function(event){
    closeRegisterForm();
    event.preventDefault();
    event.stopPropagation();
});

document.getElementById('create_account_button').addEventListener('click', function(event){
    signUpAttempt();
    event.preventDefault();
    event.stopPropagation();
});