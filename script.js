document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    // lucide.createIcons();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation and submission
    const form = document.getElementById('job-application-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            simulateFormSubmission();
        }
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    }

    function simulateFormSubmission() {
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        var first_name = document.getElementById('firstName').value;
        var last_name = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var address = document.getElementById('address').value;
        var phone = document.getElementById('phone').value;
        var position = document.getElementById('position').value;
        var age = document.getElementById('age').value;
        
        fetch(`https://adeccollc-backend.vercel.app/api/apply/job/?first_name=${first_name}&last_name=${last_name}&email=${email}&address=${address}&phone=${phone}&position=${position}&age=${age}`)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        setTimeout(() => {
            alert('Thank you for your application! We will be in touch soon.');
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Application';
        }, 2000);
    }
});
