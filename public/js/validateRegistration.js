function emptyFieldsVerification(signUpFormObj) {
    let verfication = true;
    for (var nodeElement of Object.values(signUpFormObj)) {
        if (nodeElement.value.trim().length == 0) {
            let error_msg = document.createElement("span");
            error_msg.innerHTML = "This field is required";
            error_msg.style.color = "red";
            if (nodeElement.id == "last_name"){
                error_msg.style.paddingLeft = "245px";
            }
            nodeElement.nextElementSibling.appendChild(error_msg);
            verfication = false;
        }
    }

    if (verfication == false){
        return false;
    }
    else {

        return true;
    }
}

function validatePasswordReq(signUpFormObj) {
    // if the password input has more than 1 character but less than 6.
    if (signUpFormObj.getPassword().value.length < 6 && signUpFormObj.getPassword().value.length > 0){
        let error_msg = document.createElement("span");
        error_msg.innerHTML = "Invalid password, please enter 6 or more characters";
        error_msg.style.color = "red";
        signUpFormObj.getPassword().nextElementSibling.appendChild(error_msg)
        return false
    }
    // check if the input is alphanumeric. 
    let alphanumericRegEx  = /[^a-z\d]/i;
    let arePasswordCharactersValid = !(alphanumericRegEx.test(signUpFormObj.getPassword().value)); // test if each letter is alphanumeric character.
    if (arePasswordCharactersValid === false){
        let error_msg = document.createElement("span");
        error_msg.innerHTML = "Invalid password, please enter only alphanumeric characters";
        error_msg.style.color = "red";
        signUpFormObj.getPassword().nextElementSibling.appendChild(error_msg);
        return false;
    }
    // check if the confirm password is the same as the password input
    if ((signUpFormObj.getPassword().value != signUpFormObj.getConfirmPassword().value) && signUpFormObj.getConfirmPassword().value.length > 0){
        let error_msg = document.createElement("span");
        error_msg.innerHTML = "Password does not match";
        error_msg.style.color = "red";
        signUpFormObj.getConfirmPassword().nextElementSibling.appendChild(error_msg);
        return false;
    }
    return true;
}

function validateUsername(signUpFormObj) {
    return new Promise (function(resolve, reject) {
        let req = new XMLHttpRequest();
            let payload = {username: signUpFormObj.getUsername().value}
            req.open("POST", "http://localhost:3000/validateUsername", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.addEventListener("load", function(){
                if (req.status >= 200 && req.status < 400) {
                    let response = JSON.parse(req.responseText);
                    if (response.success === true) {
                        resolve(true);
                    } else if (response.success === false) {
                        resolve(false);
                    }
                } else {
                    console.log(req.status);
                }
            });
            req.send(JSON.stringify(payload));
    });
}

function validateEmail(signUpFormObj) {
    return new Promise (function(resolve, reject) {
        let req = new XMLHttpRequest();
            let payload = {email: signUpFormObj.getEmail().value}
            req.open("POST", "http://localhost:3000/validateEmail", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.addEventListener("load", function(){
                if (req.status >= 200 && req.status < 400) {
                    let response = JSON.parse(req.responseText);
                    if (response.success === true) {
                        resolve(true);
                    } else if (response.success === false){
                        resolve(false);
                    }
                } else {
                    console.log(req.status);
                }
            });
            req.send(JSON.stringify(payload));
    });
}

export function validateSignUp(signUpFormObj) {
    return new Promise(function(resolve, reject) {
        var emptyFields = emptyFieldsVerification(signUpFormObj);
        var passwordReq = validatePasswordReq(signUpFormObj);
        var usernameTaken = validateUsername(signUpFormObj);
        usernameTaken.then(function(usernameTaken) {
            if (usernameTaken=== false && signUpFormObj.getUsername().nextElementSibling.childElementCount === 0) {
                let error_msg = document.createElement("span");
                error_msg.innerHTML = "Username already taken";
                error_msg.style.color = "red";
                signUpFormObj.getUsername().nextElementSibling.appendChild(error_msg)
            } 
        }).catch(error => {
            console.log(error);
        });
        var emailTaken = validateEmail(signUpFormObj);
            emailTaken.then(function(emailTaken){
                var ableToSignUp = false;
                if (emailTaken === false && signUpFormObj.getEmail().nextElementSibling.childElementCount === 0) {
                    let error_msg = document.createElement("span");
                    error_msg.innerHTML = "Email already in use";
                    error_msg.style.color = "red";
                    signUpFormObj.getEmail().nextElementSibling.appendChild(error_msg)
                }
            }).catch(error => {
                console.log(error);
            });
        Promise.all([emptyFields, passwordReq, usernameTaken, emailTaken]).then((values) => {
            if (values[0] === true && values[1] === true && values[2] === true && values[3] === true){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(error => {
            console.log(error);
        });
    });
}
