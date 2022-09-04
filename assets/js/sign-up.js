// Direct to login if user had signed up
if (localStorage.getItem('userAccount') !== null) {
    window.location.assign('././login-form.html')
}

// Get submit button
const submitButton = document.querySelector('.submit-information input')

// Get Fullname input
const fullnameInputContainer = document.querySelector('.fullname-input'),
    fullnameInput = document.querySelector('.fullname-input input')

// Get Email input
const emailInputContainer = document.querySelector('.email-input'),
    emailInput = document.querySelector('.email-input input')

// Get Password input
const passwordInputContainer = document.querySelector('.password-input'),
    passwordInput = document.querySelector('.password-input input')
    
// Creata error element
const signupError = document.createElement('p')
signupError.classList.add('sign-up-error')

// Get information list
const informationList = document.querySelector('.sign-up__description')

// Validate fullname
function validateFullname(fullname) {
    console.log(fullname.value)
    if (fullname.value.split(' ').length >= 2) {
        return true
    }
    signupError.innerHTML = 'Fullname must contains at least two words'
    return false
}

// Validate email
function validateEmail(emailElement) {
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegEx.test(emailElement.value)) {
        return true
    }
    signupError.innerHTML = 'Invalid Email!'
    return false
}

// Validate password
function validatePassword(passwordElement) {
    let passwordRegEx = /[A-Z]\w{6,}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (passwordRegEx.test(passwordElement.value)) {
        return true
    }
    signupError.innerHTML = 'Password must:<br>- Starts with an uppercase letter<br>- Ends with a special character<br>- Has at least 8 character'
    return false
}

function removeError() {
    signupError.remove()
}

submitButton.onclick = function() {
    if (!validateFullname(fullnameInput)) {
        fullnameInputContainer.appendChild(signupError)
    }
    else if (!validateEmail(emailInput)) {
        emailInputContainer.appendChild(signupError)
    }
    else if (!validatePassword(passwordInput)) {
        passwordInputContainer.appendChild(signupError)
    }
    else {
        window.location.assign('././login-form.html')
        const userInformation = {
            fullname: fullnameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
        sessionStorage.setItem('user', JSON.stringify(userInformation))
        fullnameInput.value = ''
        emailInput.value = ''
        passwordInput.value = ''
    }
}

fullnameInput.onfocus = removeError
emailInput.onfocus = removeError
passwordInput.onfocus = removeError
