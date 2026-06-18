document.addEventListener('DOMContentLoaded', () => {
    /* --- Testimonials Slider --- */
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    if (slides.length && prevBtn && nextBtn) {
        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    /* --- FAQ Accordion --- */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    /* --- Live Chat Widget --- */
    const chatWidget = document.querySelector('.chat-widget');
    const chatBubble = document.getElementById('chatBubble');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatBody = document.querySelector('.chat-body');

    if (chatBubble && closeChat && chatInput && sendChatBtn && chatBody) {
        chatBubble.addEventListener('click', () => chatWidget.classList.add('chat-open'));
        closeChat.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWidget.classList.remove('chat-open');
        });

        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === '') return;

            const userMsgDiv = document.createElement('div');
            userMsgDiv.classList.add('message', 'user-msg');
            userMsgDiv.innerHTML = `<p>${text}</p>`;
            chatBody.appendChild(userMsgDiv);

            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => sendAssistantReply(text), 1000);
        }

        function sendAssistantReply(userText) {
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('message', 'system-msg');
            const cleanText = userText.toLowerCase();
            let replyMessage = "Thank you for your message. An agent will review your request shortly.";

            if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey')) {
                replyMessage = "Hello! How can I assist you today?";
            } else if (cleanText.includes('contact') || cleanText.includes('form') || cleanText.includes('submit')) {
                replyMessage = "You can fill out our contact form directly on this page to submit your details or file uploads.";
            } else if (cleanText.includes('phone') || cleanText.includes('call')) {
                replyMessage = "You can reach our main office line at (505) 726-3225 for Gallup. And (505) 290-9862 for Milan";
            } else if (cleanText.includes('email') || cleanText.includes('message')) {
                replyMessage = "Feel free to email our support team directly at @gmail.com or our phone number.";
            } else if (cleanText.includes('address') || cleanText.includes('location') || cleanText.includes('located')) {
                replyMessage = "In Gallup we are located at: 19 U.S. Route 66, Gallup, NM 87301. While Milan's: 712 U.S. Route 66, Milan, NM 87021.";
            } else if (cleanText.includes('common tires') || cleanText.includes('tires')) {
                replyMessage = "Our common tires are Trailer Tires, Steer Tires, and Drive Tires";
            }

            replyDiv.innerHTML = `<p>${replyMessage}</p>`;
            chatBody.appendChild(replyDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        sendChatBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    /* --- Activity Toast Notifications --- */
    const toast = document.getElementById('activityToast');
    const msgEl = document.getElementById('toastMessage');
    
    if (toast && msgEl) {
        const activities = [
            "A fleet manager from Gallup submitted a roadside inquiry.",
            "Someone from Gallup downloaded an archive document.",
            "A visitor from Gallup started reading the documentary.",
            "New support request processed successfully from Gallup."
        ];

        function showRandomNotification() {
            msgEl.textContent = activities[Math.floor(Math.random() * activities.length)];
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 9000);
        }

        setTimeout(showRandomNotification, 3000);
        setInterval(showRandomNotification, 20000);
    }

    /* --- Split Image Panels --- */
    const panels = document.querySelectorAll('.split-panel');
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        });
    });

    /* --- Reveal Text Cards --- */
    const toggleButtons = document.querySelectorAll('.reveal-toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.parentElement;
            card.classList.toggle('is-open');
            btn.textContent = card.classList.contains('is-open') ? 'Hide Plan Details' : 'View Full Plan';
        });
    });
});

const accordionItems = document.querySelectorAll('.nk-accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.nk-accordion-header');
    
    if (header) {
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('nk-active');
            
            // 1. Close all open accordion items first to keep it clean
            accordionItems.forEach(allTrackedItems => {
                allTrackedItems.classList.remove('nk-active');
            });
            
            // 2. If the clicked item wasn't open, open it now
            if (!isActive) {
                item.classList.add('nk-active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('uxContextModal');
    const modalTitle = document.getElementById('modalServiceTitle');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const bentoCards = document.querySelectorAll('.bento-card');

    // Open Modal and apply context based on the card clicked
    bentoCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent modal triggers if clicking standard internal text selection or input actions
            if (e.target.tagName === 'BUTTON') {
                const contextService = card.getAttribute('data-service');
                
                if (contextService) {
                    modalTitle.textContent = contextService;
                }
                
                modal.classList.add('is-visible');
            }
        });
    });

    // Close Modal via Close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('is-visible');
        });
    }

    // Close Modal safely when clicking outside the window element bounds
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-visible');
        }
    });

    // Escape Key Accessibility configuration
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            modal.classList.remove('is-visible');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-btn');
    const details = document.querySelectorAll('.branch-details');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status from all buttons and sections
            buttons.forEach(b => b.classList.remove('active'));
            details.forEach(d => d.classList.remove('active'));

            // Activate current selection
            btn.classList.add('active');
            const targetId = `details-${btn.getAttribute('data-target')}`;
            document.getElementById(targetId).classList.add('active');
        });
    });
});

window.addEventListener('scroll', () => {
    const tracker = document.querySelector('.scroll-tracker');
    if (tracker) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        tracker.style.width = scrolled + '%';
    }
});

// This prevents mouse clicks from causing ugly outlines while maintaining access for keyboards
window.addEventListener('keydown', function handleFirstTab(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
});

// This prevents mouse clicks from causing ugly outlines while maintaining access for keyboards
window.addEventListener('keydown', function handleFirstTab(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const alertBanner = document.getElementById('opAlert');
    const closeBtn = document.getElementById('closeAlertBtn');

    if (closeBtn && alertBanner) {
        closeBtn.addEventListener('click', () => {
            alertBanner.style.transition = "all 0.3s ease";
            alertBanner.style.opacity = "0";
            alertBanner.style.transform = "translateY(-100%)";
            
            // Completely clean up the DOM node once animation ends
            setTimeout(() => {
                alertBanner.remove();
            }, 300);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const showcaseSection = document.querySelector('.reveal-on-scroll');
    const typedTitleEl = document.getElementById('typedTitle');
    
    // Safety guard to ensure elements exist on the active page canvas
    if (!showcaseSection || !typedTitleEl) return;

    const fullText = typedTitleEl.getAttribute('data-text');
    let currentIdx = 0;
    let typingStarted = false;

    // Typing Engine function loop
    function typeWords() {
        if (currentIdx < fullText.length) {
            typedTitleEl.textContent += fullText.charAt(currentIdx);
            currentIdx++;
            // Randomized speed interval variable mimics organic human cadences
            setTimeout(typeWords, Math.floor(Math.random() * 40) + 60);
        } else {
            // Clean up cursor graphic once complete
            typedTitleEl.classList.add('typing-done');
        }
    }

    // Modern Intersection Observer API manages viewport tracking effortlessly
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Trigger animation if item intersects at least 20% deep inside viewport
            if (entry.isIntersecting) {
                showcaseSection.classList.add('is-visible');
                
                // Fire typing animation exactly once upon scrolling down
                if (!typingStarted) {
                    typingStarted = true;
                    // Slight delay allows the fade glide to finish before text types
                    setTimeout(typeWords, 400); 
                }
                
                // Clean up observer node process tracking to optimize frame performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.20
    });

    scrollObserver.observe(showcaseSection);
});
