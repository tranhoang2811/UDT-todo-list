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
if (sessionStorage.getItem('user') !== null) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    emailInput.value = user.email
    passwordInput.value = user.password
} else if (localStorage.getItem('userAccount') !== null){
    const userAccount = JSON.parse(localStorage.getItem('userAccount'))
    emailInput.value = userAccount.email
    passwordInput.value = userAccount.password
    remmerberAccountCheckbox.checked = true
}



// Validate email
function validateEmail(emailElement) {
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegEx.test(emailElement.value)) {
        return true
    }
    loginError.innerHTML = 'Invalid Email!'
    return false
}

// Validate password
function validatePassword(passwordElement) {
    let passwordRegEx = /[A-Z]\w{6,}[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (passwordRegEx.test(passwordElement.value)) {
        return true
    }
    loginError.innerHTML = 'Invalid Password!'
    return false
}

const loginButton = document.querySelector('.login-button-item')
loginButton.onclick = function() {  
    if (!validateEmail(emailInput)) {
        emailContainer.appendChild(loginError)
    }
    else if (!validatePassword(passwordInput)) {
        passwordContainer.appendChild(loginError)
    }
    else {
        if (remmerberAccountCheckbox.checked) {
            const userAccount = {
                email: emailInput.value,
                password: passwordInput.value
            }
            localStorage.setItem('userAccount', JSON.stringify(userAccount))
        }
        else {
            if (localStorage.getItem('userAccount') !== null) {
                localStorage.removeItem('userAccount')
            }
        }
        window.location.assign('././todo-list.html')
    }
}

// Remove error
emailInput.onfocus = () => {loginError.remove()}
passwordInput.onfocus = () => {loginError.remove()}


