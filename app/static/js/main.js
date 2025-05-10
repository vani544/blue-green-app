// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .info-card, .profile-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles
    const elements = document.querySelectorAll('.card, .info-card, .profile-image');
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add visual animation for deployment indicator
    const environmentIndicator = document.querySelector('.environment-indicator');
    if (environmentIndicator) {
        setInterval(() => {
            environmentIndicator.classList.toggle('pulse');
        }, 2000);
    }
    
    // Animate arrows in deployment visual
    const animateArrows = () => {
        const arrows = document.querySelectorAll('.arrow');
        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.style.width = '0';
                setTimeout(() => {
                    arrow.style.width = '60px';
                }, 300);
            }, index * 200);
        });
    };
    
    // Run arrow animation every 3 seconds
    setInterval(animateArrows, 3000);
});