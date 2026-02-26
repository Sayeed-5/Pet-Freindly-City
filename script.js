document.addEventListener('DOMContentLoaded', function() {
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', function() {
        
        nav.classList.toggle('nav-active');
        
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Scroll Animation for Impact Story Cards
    const storyCards = document.querySelectorAll('.story-card');
    
    function checkCards() {
        const triggerBottom = window.innerHeight * 0.8;
        
        storyCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkCards);
    checkCards(); // Check on initial load
    
    // Pet Adoption Carousel
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    let currentIndex = 0;
    let itemWidth = carouselItems[0].clientWidth + 20; // Width + margin
    let itemsPerView = getItemsPerView();
    let maxIndex = carouselItems.length - itemsPerView;
    
    function getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 4;
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Update carousel on window resize
    window.addEventListener('resize', function() {
        itemWidth = carouselItems[0].clientWidth + 20;
        itemsPerView = getItemsPerView();
        maxIndex = carouselItems.length - itemsPerView;
        
        // Reset position if needed
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateCarousel();
    });
    
    // Form submission
    const volunteerForm = document.querySelector('.volunteer-form');
    
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('fullName').value;
        const city = document.getElementById('city').value;
        const role = document.getElementById('role').value;
        const email = document.getElementById('email').value;
        
        // Simple validation
        if (!name || !city || !role || !email) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        alert(`Thank you, ${name}! Your volunteer application has been submitted. We'll contact you soon at ${email}.`);
        
        // Reset form
        volunteerForm.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
});
