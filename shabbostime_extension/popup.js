// Cache DOM elements
const inputField = document.getElementById("zip");
const submitBtn = document.getElementById("submit");
const changeColorBtn = document.getElementById("changeColor");
const page = document.getElementById("page");

// Set input field properties
inputField.maxLength = 5;

// Initialize variables
let zip;
let city;
let parsha;

// Define constants
const colors = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', 
  '#43e97b', '#38f9d7', '#fa709a', '#fee140', '#a8edea', '#fed6e3',
  '#ff9a9e', '#fecfef', '#fccb90', '#d4fc79', '#96e6a1', '#ffd89b',
  '#19547b', '#ffecd2', '#fcb69f', '#a3bded', '#6991c7', '#13547a'
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Storage functions with proper error handling
async function getZipcode() {
    return new Promise((resolve) => {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get(['zipcode'], (result) => {
                    if (chrome.runtime.lastError) {
                        console.warn('Chrome storage error:', chrome.runtime.lastError);
                        resolve(localStorage.getItem('zipcode') || '');
                    } else {
                        resolve(result.zipcode || '');
                    }
                });
            } else {
                // Fallback for testing
                resolve(localStorage.getItem('zipcode') || '');
            }
        } catch (error) {
            console.warn('Storage error, using fallback:', error);
            resolve(localStorage.getItem('zipcode') || '');
        }
    });
}

async function setZipcode(zipcode) {
    return new Promise((resolve) => {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ zipcode }, () => {
                    if (chrome.runtime.lastError) {
                        console.warn('Chrome storage error:', chrome.runtime.lastError);
                        localStorage.setItem('zipcode', zipcode);
                    }
                    resolve();
                });
            } else {
                // Fallback for testing
                localStorage.setItem('zipcode', zipcode);
                resolve();
            }
        } catch (error) {
            console.warn('Storage error, using fallback:', error);
            localStorage.setItem('zipcode', zipcode);
            resolve();
        }
    });
}

function getRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function changeColor() {
    const color1 = getRandomColor(colors);
    const color2 = getRandomColor(colors);
    document.body.style.transition = 'background 0.8s ease';
    document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    
    // Reset transition after animation
    setTimeout(() => {
        document.body.style.transition = '';
    }, 800);
}

async function init() {
    try {
        const savedZip = await getZipcode();
        inputField.value = savedZip;
        
        if (savedZip) {
            await find();
        }
        
        changeColor();
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('Error initializing extension', 'error');
    }
}

function setdiv(id, className) {
    const div = document.createElement("div");
    div.setAttribute("id", id);
    if (className) div.setAttribute("class", className);
    page.querySelector('.glass-card').appendChild(div);
    return div;
}

function updateTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = text;
}

function updateShabbosInfo(city, parsha, candles, havdalah) {
    updateTextContent("header", `Shabbos Times for ${city}`);
    updateTextContent("candleLighting", candles);
    updateTextContent("havdala", havdalah);
    updateTextContent("parsha", parsha);
    
    // Add fade-in animation to time cards
    const candleContainer = document.getElementById('candleLightingContainer');
    const havdalaContainer = document.getElementById('havdalaContainer');
    
    if (candleContainer) candleContainer.classList.add('fade-in');
    if (havdalaContainer) havdalaContainer.classList.add('fade-in');
    
    // Add event listener to the GPT button
    const gptBtn = document.getElementById('gpt');
    if (gptBtn) {
        gptBtn.addEventListener('click', generateAI);
    }
}

async function find() {
    try {
        const input = inputField.value.trim();
        
        // Validate zip code
        if (!input || input.length !== 5 || isNaN(input)) {
            showNotification("Please enter a valid 5-digit zip code", "error");
            return;
        }

        zip = `zip=${input}`;
        await setZipcode(input);

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Remove fade-in classes for reload
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.remove('fade-in');
        });

        // Fetch data from Hebcal API
        const response = await fetch(`https://www.hebcal.com/shabbat/?cfg=json&${zip}&m=50`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        // Check if the 'items' array exists and is not empty
        if (!data || !data.items || data.items.length === 0) {
            showNotification("No Shabbos times found for this zip code", "error");
            return;
        }

        // Extract city and state
        if (!data.location) {
            throw new Error("Location data not found in response");
        }
        
        city = `${data.location.city}, ${data.location.state}`;

        // Extract parsha
        const parashatItem = data.items.find(i => i.category === "parashat");
        parsha = parashatItem?.title || 'No parsha this week';

        // Extract candlelighting and havdalah times
        const candlesItem = data.items.find(i => i.category === "candles");
        const havdalahItem = data.items.find(i => i.category === "havdalah");

        const candlesText = candlesItem
            ? formatEventText(candlesItem.date, candlesItem.title)
            : 'Time not available';
        const havdalahText = havdalahItem
            ? formatEventText(havdalahItem.date, havdalahItem.title)
            : 'Time not available';

        // Update Shabbos info
        updateShabbosInfo(city, parsha, candlesText, havdalahText);

        // Clear previous holiday containers
        const holidayContainer = document.getElementById('holidayContainer');
        if (holidayContainer) {
            holidayContainer.querySelectorAll('[id^="holiday"]').forEach(el => el.remove());
        }

        // Handle holidays
        const holidayItems = data.items.filter(i => i.category === "holiday");
        handleHolidays(holidayItems);

        // Handle Yom Tov
        const yomtovItems = data.items.filter(i => i.yomtov === true);
        handleYomTov(yomtovItems);

        // Show success notification
        showNotification(`Shabbos times loaded for ${city}`, "success");

    } catch (error) {
        console.error("Error fetching or processing data:", error);
        showNotification("Error fetching Shabbos times. Please check your zip code and try again.", "error");
    } finally {
        submitBtn.innerHTML = '<i class="fas fa-search"></i>';
        submitBtn.disabled = false;
    }
}

// Helper function to format event text
function formatEventText(date, title) {
    const d = new Date(date);
    const day = days[d.getDay()].substring(0, 3);
    const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    const time = title.replace('Candle lighting: ', '')
                      .replace('Havdalah: ', '')
                      .replace('(50 min)', '')
                      .replace('(72 min)', '');
    
    return `${day} ${dateStr}<br>${time.trim()}`;
}

// Helper function to handle holidays
function handleHolidays(holidayItems) {
    if (holidayItems.length > 0) {
        const holidayContainer = document.getElementById('holidayContainer');
        if (!holidayContainer) return;
        
        const holidayDiv = document.createElement('div');
        holidayDiv.setAttribute('id', 'holiday');
        holidayDiv.setAttribute('class', 'holidaycandle fade-in');
        holidayDiv.innerHTML = `🎉 ${holidayItems[0]?.title || ''}`;
        holidayContainer.appendChild(holidayDiv);
    }
}

// Helper function to handle Yom Tov
function handleYomTov(yomtovItems) {
    if (yomtovItems.length >= 2) {
        const holidayContainer = document.getElementById('holidayContainer');
        if (!holidayContainer) return;
        
        yomtovItems.slice(0, 2).forEach((item, index) => {
            const holidayDiv = document.createElement('div');
            holidayDiv.setAttribute('id', `holiday${index + 2}`);
            holidayDiv.setAttribute('class', 'holidaycandle fade-in');
            holidayDiv.innerHTML = `✨ ${item?.title || ''}`;
            holidayContainer.appendChild(holidayDiv);
        });
    }
}


// Notification system
function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fade-in`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 12px;
                padding: 12px 16px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                z-index: 1000;
                max-width: 300px;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            .notification-success { color: #43e97b; }
            .notification-error { color: #f5576c; }
            .notification-info { color: #667eea; }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Enhanced event listeners with better UX
submitBtn.addEventListener('click', find);
changeColorBtn.addEventListener('click', changeColor);

inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        find();
    }
});

inputField.addEventListener("input", function (event) {
    // Real-time validation
    const value = event.target.value;
    if (value.length === 5 && !isNaN(value)) {
        inputField.style.borderColor = '#43e97b';
    } else {
        inputField.style.borderColor = '';
    }
});

// Add hover effects programmatically
document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        e.target.style.transform = 'translateY(-1px)';
    }
    
    if (e.target.id === 'gpt' || e.target.closest('#gpt')) {
        e.target.style.transform = 'translateY(-2px) scale(1.1)';
    }
});

document.addEventListener('mouseout', function (e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        e.target.style.transform = 'translateY(0)';
    }
    
    if (e.target.id === 'gpt' || e.target.closest('#gpt')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});

// Initialize the popup
document.addEventListener('DOMContentLoaded', function () {
    // Add initial animation to glass card
    const glassCard = document.querySelector('.glass-card');
    if (glassCard) {
        glassCard.style.opacity = '0';
        glassCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            glassCard.style.transition = 'all 0.6s ease';
            glassCard.style.opacity = '1';
            glassCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    init();
});

// Service worker registration for Chrome extension
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(() => {
        console.log('Shabbos Times extension started');
    });
}