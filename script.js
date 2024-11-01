// Function to generate a random password
function generatePassword(length, includeLower, includeUpper, includeNumbers, includeSymbols) {
    let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numberChars = '0123456789';
    let symbolChars = '@-*';

    let characterSet = '';
    if (includeLower) characterSet += lowercaseChars;
    if (includeUpper) characterSet += uppercaseChars;
    if (includeNumbers) characterSet += numberChars;
    if (includeSymbols) characterSet += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    return password;
}

// Function to update the slider value display
document.getElementById('inputSlider').addEventListener('input', function() {
    document.getElementById('sliderValue').innerText = this.value;
});

// Event listener for the Generate Password button
document.getElementById('genBtn').addEventListener('click', function() {
    const length = document.getElementById('inputSlider').value;
    const includeLower = document.getElementById('lowercase').checked;
    const includeUpper = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const newPassword = generatePassword(length, includeLower, includeUpper, includeNumbers, includeSymbols);

    // Display the generated password
    document.getElementById('passBox').value = newPassword;

    // Store the generated password in Local Storage
    storeGeneratedPassword(newPassword);
});

// Function to store the generated password
function storeGeneratedPassword(password) {
    const generatedPasswords = JSON.parse(localStorage.getItem('generatedPasswords')) || [];
    generatedPasswords.push(password);
    localStorage.setItem('generatedPasswords', JSON.stringify(generatedPasswords));
}

// Function to retrieve and display all stored passwords
function displayAllPasswords() {
    const allStoredPasswords = JSON.parse(localStorage.getItem('generatedPasswords')) || [];
    const allPasswordList = document.getElementById('allPasswordList');
    allPasswordList.innerHTML = ''; // Clear previous list

    allStoredPasswords.forEach(password => {
        const li = document.createElement('li');
        li.textContent = password; // Add password to list
        allPasswordList.appendChild(li);
    });
}

// Event listener for the View All Passwords button
document.getElementById('viewAllBtn').addEventListener('click', function() {
    const allPasswordsSection = document.querySelector('.all-passwords');
    allPasswordsSection.style.display = allPasswordsSection.style.display === 'none' ? 'block' : 'none';
    displayAllPasswords(); // Update the display
});

// Call to display latest passwords on page load (optional)
displayStoredPasswords(); // This line is optional and can be removed if not needed.
