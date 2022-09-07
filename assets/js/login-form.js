const loginForm = document.getElementById('login-form')

// Select email container and item
const emailContainer = document.querySelector('.email-container'),
    emailInput = document.querySelector('.email-container input')

// Select password container and item
const passwordContainer = document.querySelector('.password-container'),
    passwordInput = document.querySelector('.password-container input')

// Creata error element
const loginError = document.createElement('p')
loginError.classList.add('login-error')

// Get remember checkbox
const remmerberAccountCheckbox = document.getElementById('remember')

// Set email, password after sign up
if (sessionStorage.getItem('currentUserSignUp') !== null) {
    const user = JSON.parse(sessionStorage.getItem('currentUserSignUp'))
    emailInput.value = user.email
    passwordInput.value = user.password
}

// Direct to todo list if user has logged in
if (localStorage.getItem('loggedinAccount') !== null) {
    window.location.assign('././todo-list.html')
}

// Validate email
function validateEmail(emailElement) {
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegEx.test(emailElement.value)) {
        return true
    }
    loginError.innerHTML = 'Invalid Email!'
    emailContainer.appendChild(loginError)
    return false
}

// Validate password
function validatePassword(passwordElement) {
    let passwordRegEx = /[A-Z]\w{6,}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (passwordRegEx.test(passwordElement.value)) {
        return true
    }
    loginError.innerHTML = 'Invalid Password!'
    passwordContainer.appendChild(loginError)
    return false
}

// Validate account
function validateUserAccount(email, password) {
    const users = localStorage.getItem('users')
    if (users === null) {
        loginError.innerHTML = 'No accounts are registered yet'
        loginError.style.textAlign = 'center'
        loginForm.appendChild(loginError)
        return false
    }
    const user = JSON.parse(users).find(user => user.email === email && user.password === password)
    if (user === undefined) {
        loginError.innerHTML = 'Account not found'
        loginError.style.textAlign = 'center'
        loginForm.appendChild(loginError)
        return false
    }
    if (remmerberAccountCheckbox.checked) {
        localStorage.setItem('loggedinAccount', JSON.stringify(user))
    }
    return true
}

const loginButton = document.querySelector('.login-button-item')
loginButton.onclick = function() {
    const loginFormat = validateEmail(emailInput) && validatePassword(passwordInput)
    if (loginFormat && validateUserAccount(emailInput.value, passwordInput.value)) {
        window.location.assign('././todo-list.html')
    }
}

// Remove error
emailInput.onfocus = () => {loginError.remove()}
passwordInput.onfocus = () => {loginError.remove()}