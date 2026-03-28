document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            
            formMessage.textContent = '';
            formMessage.className = 'form__message';

            
            const submitBtn = form.querySelector('.btn--submit');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    formMessage.textContent = 'Спасибо! Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.';
                    formMessage.className = 'form__message success show';
                    form.reset();
                } else {
                    formMessage.textContent = result.message || 'Произошла ошибка при отправке.';
                    formMessage.className = 'form__message error show';
                }
            } catch (error) {
                formMessage.textContent = 'Ошибка сети. Пожалуйста, проверьте подключение и попробуйте позже.';
                formMessage.className = 'form__message error show';
            } finally {
                
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                
                setTimeout(() => {
                    formMessage.classList.remove('show');
                }, 5000);
            }
        });
    }

    
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    
                    if (currentScrollY > 50) {
                        navbar.classList.add('navbar--scrolled');
                    } else {
                        navbar.classList.remove('navbar--scrolled');
                    }

                    
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        
                        navbar.classList.add('navbar--hidden');
                        
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            burgerBtn.classList.remove('active');
                        }
                    } else {
                        
                        navbar.classList.remove('navbar--hidden');
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burgerBtn.classList.toggle('active');
        });

        
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerBtn.classList.remove('active');
            });
        });
    }

    
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const fadeUpElements = document.querySelectorAll('.fade-up-element');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px', 
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    entry.target.classList.add('is-visible');
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeUpElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        
        document.querySelectorAll('.fade-up-element').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});
