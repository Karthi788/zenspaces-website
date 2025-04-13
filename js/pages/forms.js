// Wait for DOM to load to set up button event listeners
document.addEventListener('DOMContentLoaded', () => {
    const enquireNowButton = document.querySelector('.navbar-enquire-now'); // Adjust selector based on your HTML
    const sendEnquiryButton = document.querySelector('.why-choose-us-send-enquiry'); // Adjust selector based on your HTML

    if (enquireNowButton) {
        enquireNowButton.addEventListener('click', initializeForm);
    }
    if (sendEnquiryButton) {
        sendEnquiryButton.addEventListener('click', initializeForm);
    }
});

// Function to initialize the form (unchanged)
function initializeForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('status');
    const closeBtn = document.querySelector('.close-btn');
    const buildSiteInput = document.getElementById('build-site-input');
    const suggestionsDiv = document.getElementById('suggestions');
    const plotInput = document.getElementById('plot-input');
    const plotSuggestions = document.getElementById('plot-suggestions');
    const plotSuggestionsInterior = document.getElementById('plot-suggestions-interior');
    const dateInput = document.getElementById('date-input');
    const dateSuggestions = document.getElementById('date-suggestions');
    const budgetInput = document.getElementById('budget-input');
    const budgetSuggestions = document.getElementById('budget-suggestions');
    const budgetSuggestionsInterior = document.getElementById('budget-suggestions-interior');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.querySelector('.popup-close');
    const plotLabel = document.getElementById('plot-label');
    const budgetLabel = document.getElementById('budget-label');

    console.log('Initializing form...');
    console.log('Elements:', {
        form, buildSiteInput, suggestionsDiv, plotInput, plotSuggestions,
        plotSuggestionsInterior, dateInput, dateSuggestions, budgetInput,
        budgetSuggestions, budgetSuggestionsInterior, phoneInput, emailInput,
        popup, popupMessage, popupClose, plotLabel, budgetLabel
    });

    if (!form || !buildSiteInput || !suggestionsDiv || !plotInput || !plotSuggestions || !plotSuggestionsInterior || !dateInput || !dateSuggestions || !budgetInput || !budgetSuggestions || !budgetSuggestionsInterior || !phoneInput || !emailInput || !popup || !popupMessage || !popupClose || !plotLabel || !budgetLabel) {
        console.error('One or more elements not found in the DOM:', {
            form, buildSiteInput, suggestionsDiv, plotInput, plotSuggestions,
            plotSuggestionsInterior, dateInput, dateSuggestions, budgetInput,
            budgetSuggestions, budgetSuggestionsInterior, phoneInput, emailInput,
            popup, popupMessage, popupClose, plotLabel, budgetLabel
        });
        return;
    }

    // Replace with your AbstractAPI key (sign up at https://www.abstractapi.com/)
    const EMAIL_API_KEY = '16deec22c71e4275b2e64022ee7b6b21';

    const districts = [
        'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
        'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram',
        'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
        'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
        'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
        'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
        'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
        'Vellore', 'Viluppuram', 'Virudhunagar'
    ];

    // Phone input handling
    phoneInput.addEventListener('input', () => {
        let value = phoneInput.value.replace(/\D/g, '');
        if (value.startsWith('91')) value = value.slice(2);
        phoneInput.value = '+91' + value.slice(0, 10);
    });

    phoneInput.addEventListener('keydown', (event) => {
        const cursorPosition = phoneInput.selectionStart;
        const selectionEnd = phoneInput.selectionEnd;
        const value = phoneInput.value;
        if ((event.key === 'Backspace' || event.key === 'Delete') && selectionEnd > cursorPosition && selectionEnd === value.length && cursorPosition === 0) return;
        if ((event.key === 'Backspace' || event.key === 'Delete') && cursorPosition <= 3 && selectionEnd === cursorPosition) event.preventDefault();
    });

    // Build site autocomplete
    function showSuggestions(matches, suggestionDiv) {
        console.log('Showing suggestions for:', suggestionDiv.id, 'with matches:', matches);
        suggestionDiv.innerHTML = '';
        const ul = document.createElement('ul');
        matches.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                buildSiteInput.value = item;
                suggestionDiv.style.display = 'none';
                suggestionDiv.classList.remove('show');
                console.log('Selected:', item, 'for', suggestionDiv.id);
            });
            ul.appendChild(li);
        });
        suggestionDiv.appendChild(ul);
        suggestionDiv.style.display = 'block'; // Force visibility
        suggestionDiv.classList.add('show');
    }

    buildSiteInput.addEventListener('click', () => {
        console.log('Clicked buildSiteInput');
        showSuggestions(districts, suggestionsDiv);
    });

    buildSiteInput.addEventListener('input', () => {
        const query = buildSiteInput.value.trim().toLowerCase();
        const matches = query.length === 0 ? districts : districts.filter(d => d.toLowerCase().includes(query));
        showSuggestions(matches, suggestionsDiv);
    });

    // Dropdown click handlers
    const dropdownInputs = [plotInput, dateInput, buildSiteInput, budgetInput];
    dropdownInputs.forEach(input => {
        input.addEventListener('click', (e) => {
            console.log('Clicked input:', input.id);
            let suggestionDiv;
            switch (input.id) {
                case 'plot-input': suggestionDiv = getActiveSuggestion(input, plotSuggestions, plotSuggestionsInterior); break;
                case 'date-input': suggestionDiv = dateSuggestions; break;
                case 'build-site-input': suggestionDiv = suggestionsDiv; break;
                case 'budget-input': suggestionDiv = getActiveSuggestion(input, budgetSuggestions, budgetSuggestionsInterior); break;
            }
            console.log('Active suggestion div:', suggestionDiv ? suggestionDiv.id : 'null');
            if (!suggestionDiv) {
                console.error('No suggestion div found for input:', input.id);
                return;
            }
            // Hide all other dropdowns
            [plotSuggestions, plotSuggestionsInterior, dateSuggestions, suggestionsDiv, budgetSuggestions, budgetSuggestionsInterior]
                .filter(div => div !== suggestionDiv)
                .forEach(div => {
                    div.style.display = 'none';
                    div.classList.remove('show');
                    console.log('Hiding:', div.id);
                });
            suggestionDiv.style.display = 'block'; // Force visibility
            suggestionDiv.classList.toggle('show');
            console.log('Toggling:', suggestionDiv.id, 'to show:', suggestionDiv.classList.contains('show'));
            e.stopPropagation();
        });
    });

    // Helper function to get the active suggestion div based on service
    function getActiveSuggestion(input, defaultDiv, interiorDiv) {
        const selectedService = document.querySelector('input[name="services"]:checked');
        const service = selectedService ? selectedService.value : 'architecture';
        console.log('Service selected:', service, 'for input:', input.id);
        const activeDiv = service === 'architecture' ? defaultDiv : interiorDiv;
        console.log('Returning active div:', activeDiv.id);
        return activeDiv;
    }

    // Add click event listeners for suggestion items
    [plotSuggestions, plotSuggestionsInterior, dateSuggestions, budgetSuggestions, budgetSuggestionsInterior, suggestionsDiv].forEach(suggestionDiv => {
        suggestionDiv.querySelectorAll('li').forEach(option => {
            option.addEventListener('click', (e) => {
                // Determine the correct input based on the suggestion div
                let input;
                switch (suggestionDiv.id) {
                    case 'plot-suggestions':
                    case 'plot-suggestions-interior':
                        input = document.getElementById('plot-input');
                        break;
                    case 'date-suggestions':
                        input = document.getElementById('date-input');
                        break;
                    case 'budget-suggestions':
                    case 'budget-suggestions-interior':
                        input = document.getElementById('budget-input');
                        break;
                    case 'suggestions':
                        input = document.getElementById('build-site-input');
                        break;
                    default:
                        console.error('Unknown suggestion div:', suggestionDiv.id);
                        return;
                }
                if (input) {
                    input.value = e.target.textContent; // Update the input with the selected option
                    suggestionDiv.style.display = 'none';
                    suggestionDiv.classList.remove('show');
                    console.log('Selected option:', e.target.textContent, 'for input:', input.id);
                } else {
                    console.error('Input not found for suggestion div:', suggestionDiv.id);
                }
            });
        });
    });

    // Add click event listeners for suggestion items with input update
    [plotSuggestions, plotSuggestionsInterior, dateSuggestions, budgetSuggestions, budgetSuggestionsInterior, suggestionsDiv].forEach(suggestionDiv => {
        suggestionDiv.querySelectorAll('li').forEach(option => {
            option.addEventListener('click', (e) => {
                const input = suggestionDiv.previousElementSibling; // Get the input field above the suggestion div
                if (input) {
                    input.value = e.target.textContent; // Update the input with the selected option
                    suggestionDiv.style.display = 'none';
                    suggestionDiv.classList.remove('show');
                    console.log('Selected option:', e.target.textContent, 'for input:', input.id);
                } else {
                    console.error('No input found for suggestion div:', suggestionDiv.id);
                }
            });
        });
    });

    // Hide dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        console.log('Click outside detected');
        [suggestionsDiv, plotSuggestions, plotSuggestionsInterior, dateSuggestions, budgetSuggestions, budgetSuggestionsInterior].forEach(div => {
            if (!div.contains(event.target) && !div.previousElementSibling.contains(event.target)) {
                div.style.display = 'none';
                div.classList.remove('show');
                console.log('Hiding dropdown:', div.id);
            }
        });
    });

    // Update dropdowns based on service selection
    function updateDropdowns() {
        const selectedService = document.querySelector('input[name="services"]:checked');
        const service = selectedService ? selectedService.value : null;
        console.log('Updating dropdowns for service:', service);

        plotInput.value = '';
        dateInput.value = '';
        budgetInput.value = '';
        buildSiteInput.value = '';

        const asterisk = '<span class="required-asterisk">*</span>';

        if (service === 'architecture') {
            plotLabel.innerHTML = 'Type of Project ' + asterisk;
            budgetLabel.innerHTML = 'Choose a budget? ' + asterisk;
        } else if (service === 'interior') {
            plotLabel.innerHTML = 'Type of Project ' + asterisk;
            budgetLabel.innerHTML = 'Project Specification ' + asterisk;
        } else {
            plotLabel.innerHTML = 'Type of Project ' + asterisk;
            budgetLabel.innerHTML = 'Choose a budget? ' + asterisk;
        }
        [plotSuggestions, plotSuggestionsInterior, dateSuggestions, suggestionsDiv, budgetSuggestions, budgetSuggestionsInterior].forEach(div => {
            div.style.display = 'none';
            div.classList.remove('show');
            console.log('Hiding on service change:', div.id);
        });
    }

    updateDropdowns();

    document.querySelectorAll('input[name="services"]').forEach(radio => {
        radio.addEventListener('change', updateDropdowns);
    });

    closeBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
    });

    popupClose.addEventListener('click', () => {
        popup.classList.remove('show');
        popup.classList.remove('success');
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('show');
            popup.classList.remove('success');
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Form submission triggered');
        clearErrors();
    
        const firstName = document.getElementById('first-name').value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const buildSite = buildSiteInput.value.trim();
        const plot = plotInput.value.trim();
        const date = dateInput.value.trim();
        const budget = budgetInput.value.trim();
        const message = document.getElementById('message')?.value.trim() || ''; // Assuming ID is 'message-input'
        const services = document.querySelector('input[name="services"]:checked') ? [document.querySelector('input[name="services"]:checked').value] : [];
    
        let isValid = true;
    
        if (!firstName) {
            showError('first-name-error', 'First Name is required.', 'first-name');
            isValid = false;
        }
    
        console.log('Checking email:', email);
        if (!email) {
            showError('email-error', 'Email is required.', 'email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Enter a valid email (e.g., xyz@gmail.com).', 'email');
            isValid = false;
        } else {
            status.textContent = 'Verifying email...';
            status.classList.add('show');
            const emailExists = await verifyEmailExists(email);
            status.classList.remove('show');
            if (!emailExists) {
                showError('email-error', 'This email does not exist.', 'email');
                isValid = false;
            }
        }
    
        const phoneRegex = /^\+91\d{10}$/;
        if (!phone || phone === '+91') {
            showError('phone-error', 'Phone number is required.', 'phone');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            showError('phone-error', 'Check if there are 10 digits.', 'phone');
            isValid = false;
        }
    
        // Dropdown validation
        if (!buildSite) {
            showError('build-site-error', 'Build site is required.', 'build-site-input');
            isValid = false;
        } else if (!districts.includes(buildSite)) {
            showError('build-site-error', 'Please enter a valid district from the dropdown.', 'build-site-input');
            isValid = false;
        }
    
        if (!plot) {
            showError('plot-error', 'Type of Project is required.', 'plot-input');
            isValid = false;
        } else {
            const validPlots = [...plotSuggestions.querySelectorAll('li')].map(li => li.textContent);
            const validInteriorPlots = [...plotSuggestionsInterior.querySelectorAll('li')].map(li => li.textContent);
            const selectedService = document.querySelector('input[name="services"]:checked')?.value || 'architecture';
            const validPlotOptions = selectedService === 'architecture' ? validPlots : validInteriorPlots;
            if (!validPlotOptions.includes(plot)) {
                showError('plot-error', 'Please enter a valid option from the dropdown.', 'plot-input');
                isValid = false;
            }
        }
    
        if (!date) {
            showError('date-error', 'Date is required.', 'date-input');
            isValid = false;
        } else {
            const validDates = [...dateSuggestions.querySelectorAll('li')].map(li => li.textContent);
            if (!validDates.includes(date)) {
                showError('date-error', 'Please enter a valid option from the dropdown.', 'date-input');
                isValid = false;
            }
        }
    
        if (!budget) {
            showError('budget-error', 'Budget/Specification is required.', 'budget-input');
            isValid = false;
        } else {
            const validBudgets = [...budgetSuggestions.querySelectorAll('li')].map(li => li.textContent);
            const validInteriorBudgets = [...budgetSuggestionsInterior.querySelectorAll('li')].map(li => li.textContent);
            const selectedService = document.querySelector('input[name="services"]:checked')?.value || 'architecture';
            const validBudgetOptions = selectedService === 'architecture' ? validBudgets : validInteriorBudgets;
            if (!validBudgetOptions.includes(budget)) {
                showError('budget-error', 'Please enter a valid option from the dropdown.', 'budget-input');
                isValid = false;
            }
        }
    
        if (!message) {
            showError('message-error', 'Message is required.', 'message-input'); // Added message validation
            isValid = false;
        }
    
        if (services.length === 0) {
            showError('services-error', 'Select at least one service.', 'null');
            isValid = false;
        }
    
        console.log('Validation complete, isValid:', isValid);
    
        if (!isValid) return;
    
        console.log('All fields valid, sending email');
        status.textContent = 'Sending...';
        status.classList.add('show');
    
        const formData = new FormData(form);
    
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            status.classList.remove('show');
            if (data.success) {
                console.log('Email sent successfully:', data);
                showPopup('Message sent successfully!', true);
                form.reset();
                phoneInput.value = '+91';
                clearErrors();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        })
        .catch(error => {
            console.error('Error sending email:', error);
            status.classList.remove('show');
            status.textContent = 'Failed to send. Please try again.';
            status.classList.add('show');
            showPopup('Failed to send. Please try again.');
        });
    });

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(email);
        console.log(`Validating email syntax: "${email}", Result: ${isValid}`);
        return isValid;
    }

    async function verifyEmailExists(email) {
        try {
            const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${EMAIL_API_KEY}&email=${encodeURIComponent(email)}`);
            const data = await response.json();
            console.log('Email verification response:', data);
            return data.deliverability === 'DELIVERABLE' && !data.is_disposable_email.value;
        } catch (error) {
            console.error('Email verification failed:', error);
            showPopup('Error verifying email. Please try again.');
            return false;
        }
    }

    function showError(errorId, message, inputId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            console.log(`Error displayed: ${errorId} - ${message}`);
        }
        if (inputId) {
            const inputElement = document.getElementById(inputId);
            if (inputElement) inputElement.closest('.form-group').classList.add('invalid');
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(span => {
            span.textContent = '';
            span.classList.remove('show');
        });
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));
        console.log('Errors cleared');
    }

    function showPopup(message, isSuccess = false) {
        if (isSuccess) {
            // Create and show a success notification banner
            let notification = document.createElement('div');
            notification.id = 'success-notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #F2E2B1; /* Green background for success */
                color: black;
                padding: 15px 30px;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 2001;
                font-size: 16px;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            `;
            document.body.appendChild(notification);
    
            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
            }, 10);
    
            // Auto-hide after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500); // Match transition duration
            }, 3000);
        } else {
            // Keep the error popup behavior
            popupMessage.textContent = message;
            popup.classList.add('show');
            if (!isSuccess) popup.classList.remove('success');
        }
    }
}

// Initialize form if already present (removed to rely on button clicks)