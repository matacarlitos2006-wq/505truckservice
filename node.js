document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close other open panels optionally
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.querySelector('.chat-widget');
    const chatBubble = document.getElementById('chatBubble');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatBody = document.querySelector('.chat-body');

    chatBubble.addEventListener('click', () => {
        chatWidget.classList.add('chat-open');
    });

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

        // Trigger the assistant reply after 1 second
        setTimeout(() => {
            sendAssistantReply(text);
        }, 1000);
    }

    function sendAssistantReply(userText) {
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('message', 'system-msg');
        
        // Lowercase the user text to make keyword matching easier
        const cleanText = userText.toLowerCase();
        let replyMessage = "Thank you for your message. An agent will review your request shortly.";

        // Basic keyword routing rules
        if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey')) {
            replyMessage = "Hello! How can I assist you today?";
        } else if (cleanText.includes('contact') || cleanText.includes('form') || cleanText.includes('submit')) {
            replyMessage = "You can fill out our contact form directly on this page to submit your details or file uploads.";
        } else if (cleanText.includes('phone') || cleanText.includes('call')) {
            replyMessage = "You can reach our main office line at (505) 726-3225.";
        } else if (cleanText.includes('email') || cleanText.includes('message')) {
            replyMessage = "Feel free to email our support team directly at @gmail.com or our phone number.";
        } else if (cleanText.includes('address') || cleanText.includes('location') || cleanText.includes('located'){
            replyMessage = "In Gallup we are located at: 19 U.S. Route 66, Gallup, NM 87301. While Milan's: 712 U.S. Route 66, Milan, NM 87021.";
            

        replyDiv.innerHTML = `<p>${replyMessage}</p>`;
        chatBody.appendChild(replyDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('activityToast');
    const msgEl = document.getElementById('toastMessage');
    
    const activities = [
        "A fleet manager from Gallup submitted a roadside inquiry.",
        "Someone from Gallup downloaded an archive document.",
        "A visitor from Gallup started reading the documentary.",
        "New support request processed successfully from Gallup."
    ];

    function showRandomNotification() {
        const randomMsg = activities[Math.floor(Math.random() * activities.length)];
        msgEl.textContent = randomMsg;
        
        toast.classList.add('show');
        
        // Hide it after 9 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 9000);
    }

    // Run the notification 3 seconds after page load, then repeat every 20 seconds
    setTimeout(showRandomNotification, 3000);
    setInterval(showRandomNotification, 20000);
});

document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.split-panel');

    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            // Remove active state from all panels and apply to hovered one
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.reveal-toggle-btn');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.parentElement;
            card.classList.toggle('is-open');

            // Toggle active button text for accurate labeling
            if (card.classList.contains('is-open')) {
                btn.textContent = 'Hide Plan Details';
            } else {
                btn.textContent = 'View Full Plan';
            }
        });
    });
});
