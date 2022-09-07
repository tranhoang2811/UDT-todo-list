// Direct to todo list if user has logged in
if (localStorage.getItem('loggedinAccount') !== null) {
    window.location.assign('././todo-list.html')
}

// Get submit button
const submitButton = document.querySelector('.submit-information input')

// Get fullname input
const fullnameInputContainer = document.querySelector('.fullname-input'),
    fullnameInput = document.querySelector('.fullname-input input')

// Get email input
const emailInputContainer = document.querySelector('.email-input'),
    emailInput = document.querySelector('.email-input input')

// Get password input
const passwordInputContainer = document.querySelector('.password-input'),
    passwordInput = document.querySelector('.password-input input')

// Get gender input
const genderInputContainer = document.querySelector('.gender-input')

// Get age input
const ageInputContainer = document.querySelector('.age-input'),
    ageInput = document.querySelector('.age-input input')

// Creata error element
const signupError = document.createElement('p')
signupError.classList.add('sign-up-error')

// Get information list
const informationList = document.querySelector('.sign-up__description')

// Validate fullname
function validateFullname(fullname) {
    if (fullname.value.split(' ').length >= 2) {
        return true
    }
    signupError.innerHTML = 'Fullname must contains at least two words'
    fullnameInputContainer.appendChild(signupError)
    return false
}

// Validate email
function validateEmail(emailElement) {
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegEx.test(emailElement.value)) {
        return true
    }
    signupError.innerHTML = 'Invalid Email!'
    emailInputContainer.appendChild(signupError)
    return false
}

// Validate password
function validatePassword(passwordElement) {
    let passwordRegEx = /[A-Z]\w{6,}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (passwordRegEx.test(passwordElement.value)) {
        return true
    }
    signupError.innerHTML = 'Password must:<br>- Starts with an uppercase letter<br>- Ends with a special character<br>- Has at least 8 character'
    passwordInputContainer.appendChild(signupError)
    return false
}

// Validate age
function validateAge(ageElement) {
    const ageValue  = Number(ageElement.value)
    if (ageValue >= 18 && ageValue < 100) {
        return true
    }
    signupError.innerHTML = 'Age must between 18 and 100'
    signupError.style.padding = '0'
    signupError.style.fontSize = '16px'
    ageInputContainer.appendChild(signupError)
    return false
}

// Set user information in storage
function setInformation() {
    const userInformation = {
        fullname: fullnameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        gender: genderInputContainer.querySelector('input[name="gender"]:checked').id,
        age: ageInput.value
    }
    const users = localStorage.getItem('users') === null ? [] : JSON.parse(localStorage.getItem('users'))
    
    users.push(userInformation)
    localStorage.setItem('users', JSON.stringify(users))
    sessionStorage.setItem('currentUserSignUp', JSON.stringify(userInformation))

    fullnameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''
    ageInput.value = '0'
}

function removeError() {
    signupError.remove()
}

submitButton.onclick = function() {
    const signupCondition = validateFullname(fullnameInput) && validateEmail(emailInput) && validatePassword(passwordInput) && validateAge(ageInput)
    if (signupCondition) {
        setInformation()
        window.location.assign('././login-form.html')
    }
}

ageInput.onfocus = removeError
fullnameInput.onfocus = removeError
emailInput.onfocus = removeError
passwordInput.onfocus = removeError
