function displayRegisterForm() {
    document.querySelector('.register_model_container').style.display = 'flex';
}

function closeRegisterForm() {
    document.querySelector('.register_model_container').style.display = 'none';

    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let email = document.getElementById('email');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');

    // clear field values after closing
    first_name.value = "";
    last_name.value = "";
    email.value = "";
    username.value = "";
    password.value = "";
    confirm_password.value = "";

    // clear error messages
    let input_list = [];
    input_list.push(first_name);
    input_list.push(last_name);
    input_list.push(email);
    input_list.push(username);
    input_list.push(password);
    input_list.push(confirm_password);
    console.log(input_list);
    for (i=0; i<input_list.length; i++) {
        if (input_list[i].nextElementSibling.childElementCount != 0){
            input_list[i].nextElementSibling.children[0].remove();
        }
    }
}

function signUpAttempt() {
    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let email = document.getElementById('email');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');
    let signUpForm = new SignUpForm(first_name, last_name, email, username, password, confirm_password);
    console.log("signUpform", signUpForm); //remove this later
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
    for (var nodeElement of Object.values(signUpFormObj)) {
        if (nodeElement.value.trim().length == 0) {
            if (nodeElement.nextElementSibling.childElementCount == 0){
                let error_msg = document.createElement("span");
                error_msg.innerHTML = "This field is required";
                error_msg.style.color = "red";
                if (nodeElement.id == "last_name"){
                    error_msg.style.paddingLeft = "245px";
                }
                nodeElement.nextElementSibling.appendChild(error_msg);
            }
            verfication = false;
        }
        else {
            if (nodeElement.nextElementSibling.childElementCount != 0){
                nodeElement.nextElementSibling.children[0].remove();
            }
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
    console.log(emptyFieldsVerification(signUpFormObj)); //remove later
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