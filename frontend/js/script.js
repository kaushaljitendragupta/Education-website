// Future JS functionality will go here
console.log("Ignite Learning loaded successfully!");
// Dummy registered users for simulation
let registeredUsers = [
    {email: "test1@example.com", password: "123456"},
    {email: "test2@example.com", password: "abcdef"}
];

// ----------------- LOGIN PAGE -----------------
const loginForm = document.querySelector("section.form-container form[action='#'][method='post']:not(#registerForm)");
if(loginForm){
    const loginEmail = document.getElementById("email");
    const loginPassword = document.getElementById("password");

    // Create a message paragraph
    let loginMessage = document.createElement("p");
    loginMessage.style.color = "red";
    loginForm.appendChild(loginMessage);

    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value;

        // Reset color
        loginMessage.style.color = "red";

        // Empty field check
        if(!email || !password){
            loginMessage.textContent = "All fields are required.";
            return;
        }

        // Email format check
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!emailPattern.test(email)){
            loginMessage.textContent = "Invalid email format.";
            return;
        }

        // Check if user exists
        const user = registeredUsers.find(u => u.email === email);
        if(!user){
            loginMessage.textContent = "Email not registered. Please register first.";
            return;
        }

        // Check password
        if(user.password !== password){
            loginMessage.textContent = "Wrong password. Try again.";
            return;
        }

        // Success
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";
        setTimeout(()=>{ window.location.href = "index.html"; }, 1000);
    });
}

// ----------------- REGISTER PAGE -----------------
const registerForm = document.querySelector("section.form-container form[action='#'][method='post']:not(#loginForm)");
if(registerForm){
    const regName = document.getElementById("name");
    const regEmail = document.getElementById("email");
    const regPassword = document.getElementById("password");
    const regConfirm = document.getElementById("confirm");

    // Create a message paragraph
    let regMessage = document.createElement("p");
    regMessage.style.color = "red";
    registerForm.appendChild(regMessage);

    registerForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = regName.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value;
        const confirm = regConfirm.value;

        regMessage.style.color = "red";

        // Empty field check
        if(!name || !email || !password || !confirm){
            regMessage.textContent = "All fields are required.";
            return;
        }

        // Email format check
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(!emailPattern.test(email)){
            regMessage.textContent = "Invalid email format.";
            return;
        }

        // Password match check
        if(password !== confirm){
            regMessage.textContent = "Passwords do not match.";
            return;
        }

        // Check if email already registered
        const exists = registeredUsers.some(u => u.email === email);
        if(exists){
            regMessage.textContent = "Email already registered. Please login.";
            return;
        }

        // Success: add to dummy users
        registeredUsers.push({email: email, password: password});
        regMessage.style.color = "green";
        regMessage.textContent = "Registration successful! You can now login.";
        registerForm.reset();
    });
}

// ----------------- CONTACT FORM -----------------
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name === "" || email === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill all fields!";
    return;
  }

  // Simple email format check
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!email.match(emailPattern)) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please enter a valid email!";
    return;
  }

  // Show success message
  formMessage.style.color = "green";
  formMessage.textContent = `Thank you ${name}, your message has been sent!`;

  // Reset form after 3 second delay
  setTimeout(() => {
    contactForm.reset();
    formMessage.textContent = ""; // Success message clear kar de
  }, 3000);
});
