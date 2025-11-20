// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    contactForm.reset();
});

// Add fade-in animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
// Store reservations in memory
const reservations = [];

// Set minimum date to today
const dateInput = document.getElementById('res-date');
if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
}

// Form submission handler
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create reservation object
        const reservation = {
            id: Date.now(),
            name: document.getElementById('res-name').value,
            email: document.getElementById('res-email').value,
            phone: document.getElementById('res-phone').value,
            date: document.getElementById('res-date').value,
            time: document.getElementById('res-time').value,
            guests: document.getElementById('res-guests').value,
            notes: document.getElementById('res-notes').value
        };
        
        // Add to reservations array
        reservations.push(reservation);
        
        // Show success message
        const successMsg = document.getElementById('reservation-success');
        successMsg.classList.add('show');
        
        // Reset form
        this.reset();
        
        // Hide success message after 4 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 4000);
        
        // Update reservations list
        displayReservations();
        
        // Scroll to reservations list
        document.getElementById('reservations-list').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    });
}

// Display all reservations
function displayReservations() {
    const container = document.getElementById('reservations-list');
    
    // Show empty state if no reservations
    if (reservations.length === 0) {
        container.innerHTML = '<div class="empty-reservations">No upcoming reservations</div>';
        return;
    }
    
    // Generate HTML for each reservation
    container.innerHTML = reservations.map(res => {
        const resDate = new Date(res.date);
        const formattedDate = resDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <div class="reservation-item">
                <h4>${res.name}</h4>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${res.time}</p>
                <p><strong>Party Size:</strong> ${res.guests} ${res.guests === '1' ? 'guest' : 'guests'}</p>
                <p><strong>Phone:</strong> ${res.phone}</p>
                <p><strong>Email:</strong> ${res.email}</p>
                ${res.notes ? `<p><strong>Special Requests:</strong> ${res.notes}</p>` : ''}
                <button class="delete-btn" onclick="deleteReservation(${res.id})">Cancel Reservation</button>
            </div>
        `;
    }).join('');
}

// Delete a reservation
function deleteReservation(id) {
    const index = reservations.findIndex(res => res.id === id);
    if (index > -1) {
        reservations.splice(index, 1);
        displayReservations();
    }
}

// Initialize - display empty state on page load
displayReservations();
