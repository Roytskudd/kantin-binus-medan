// Get today's day of week (0 = Sunday, 6 = Saturday)
function getTodaysMenu() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return menuData[dayOfWeek];
}

// Format current date
function displayCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = formattedDate;
    }
}

// Theme toggle support
function getStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

function initThemeToggle() {
    applyTheme(getStoredTheme());
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
}

const chatStorageKey = 'binusChatMessages';

function getStoredChat() {
    const stored = localStorage.getItem(chatStorageKey);
    if (!stored) {
        return [];
    }
    try {
        let messages = JSON.parse(stored) || [];

    if (messages.length > 8) {
        messages = messages.slice(-8);
    
    localStorage.setItem(chatStorageKey, JSON.stringify(messages));
    }
    return messages;
    } catch {
        return [];
    }
}

function saveChat(messages) {

    const maxMessages = 8;

    if (messages.length > maxMessages) {
        messages = messages.slice(-maxMessages);
    }

    localStorage.setItem(chatStorageKey, JSON.stringify(messages));
}

function createChatMessageElement(message) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-message ${message.sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = message.text;

    wrapper.appendChild(bubble);
    return wrapper;
}

function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const messages = getStoredChat();
    container.innerHTML = '';
    messages.forEach((message) => {
        container.appendChild(createChatMessageElement(message));
    });
    container.scrollTop = container.scrollHeight;
}

function addChatMessage(sender, text) {
    const messages = getStoredChat();
    const newMessage = { sender, text, timestamp: Date.now() };
    messages.push(newMessage);
    saveChat(messages);
    renderChatMessages();
}

function getBotResponse(input) {
    const text = input.toLowerCase();

    if (text.includes('menu')) {
        return 'You can explore the full menu on the Menu page, or ask me about today\'s special and ingredients.';
    }
    if (text.includes('vote')) {
        return 'The Vote page is open for your dish choice. You can vote for tomorrow\'s meal right now.';
    }
    if (text.includes('price') || text.includes('cost')) {
        return 'Most student meals are priced affordably. For exact prices, check the Menu page or ask the canteen staff.';
    }
    if (text.includes('drink') || text.includes('beverage')) {
        return 'We usually serve soft drinks, water, and coffee. If you want special drink options, let us know.';
    }
    if (text.includes('hours') || text.includes('open')) {
        return 'We are open from 08:00 to 18:00 every weekday. Visit early for the best selection!';
    }
    if (text.includes('thank')) {
        return 'You\'re welcome! If you have more questions, feel free to ask.';
    }
    return 'Thanks for your message! I\'m here to help with menu options, voting, and canteen hours.';
}

function initLiveChat() {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');

    if (!form || !input) {
        return;
    }

    if (getStoredChat().length === 0) {
        addChatMessage('bot', 'Hi there! I\'m the BINUS Canteen assistant. Ask me about the menu, vote, or today\'s meal.');
    } else {
        renderChatMessages();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageText = input.value.trim();
        if (!messageText) return;

        addChatMessage('user', messageText);
        input.value = '';
        input.focus();

        setTimeout(() => {
            addChatMessage('bot', getBotResponse(messageText));
        }, 750);
    });
}

const reviewStorageKey = 'binusStudentReviews';

function getStoredReviews() {
    const stored = localStorage.getItem(reviewStorageKey);
    if (!stored) return [];
    try {
        return JSON.parse(stored) || [];
    } catch {
        return [];
    }
}

function saveReviews(reviews) {

    const maxReviews = 8;
    if (reviews.length > maxReviews) {
        reviews = reviews.slice(-maxReviews);
    }

    localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';

    const meta = document.createElement('div');
    meta.className = 'review-meta';
    meta.innerHTML = `<strong>${review.name}</strong><span>${review.date}</span>`;

    const text = document.createElement('p');
    text.textContent = review.text;

    card.appendChild(meta);
    card.appendChild(text);
    return card;
}

function renderReviews() {
    const container = document.getElementById('review-cards');
    if (!container) return;

    const reviews = getStoredReviews();
    container.innerHTML = '';

    if (reviews.length === 0) {
        container.innerHTML = '<p>No reviews yet. Be the first to share your thoughts about today\'s meal!</p>';
        return;
    }

    reviews.slice().reverse().forEach((review) => {
        container.appendChild(createReviewCard(review));
    });
}

function formatReviewDate(timestamp) {
    return new Date(timestamp).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function initReviews() {
    const form = document.getElementById('review-form');
    const nameInput = document.getElementById('review-name');
    const textInput = document.getElementById('review-text');

    if (!form || !nameInput || !textInput) {
        return;
    }

    renderReviews();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            return;
        }

        const reviews = getStoredReviews();
        reviews.push({ name, text, date: formatReviewDate(Date.now()) });
        saveReviews(reviews);
        renderReviews();

        form.reset();
        nameInput.focus();
    });
}

// status badges removed (not used)

// Render today's menu
function renderTodaysMenu() {
    const todaysMenu = getTodaysMenu();
    const dayNameEl = document.getElementById('current-day-name');
    const mealNameEl = document.getElementById('meal-name');
    const mealDescEl = document.getElementById('meal-description');
    const menuContainer = document.getElementById('today-menu');
    
    if (dayNameEl) {
        dayNameEl.textContent = todaysMenu.dayName;
    }

    if (mealNameEl) {
        mealNameEl.textContent = todaysMenu.meal;
    }

    if (mealDescEl) {
        mealDescEl.textContent = todaysMenu.description || `Enjoy today's special: ${todaysMenu.meal}.`;
    }

    if (!menuContainer) {
        return;
    }

    menuContainer.innerHTML = '';
    
    if (!todaysMenu.items || todaysMenu.items.length === 0) {
        menuContainer.innerHTML = '<p>No menu available today</p>';
        return;
    }
    
    todaysMenu.items.forEach((item) => {
        const menuBox = document.createElement('div');
        menuBox.className = 'menu-box';
        menuBox.innerHTML = `
            <i class="fas ${item.icon}"></i>
            <h3>${item.category}</h3>
            <p>${item.name}</p>
        `;
        
        menuContainer.appendChild(menuBox);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    initThemeToggle();
    renderTodaysMenu();
    initLiveChat();
    initReviews();
});

// Optional: Auto-refresh menu every 5 minutes
setInterval(() => {
    renderTodaysMenu();
}, 300000); // 5 minutes