(function() {
    const styles = `

    .cb-widget-button {
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.5s ease, opacity 0.5s ease;
      position: relative;
      overflow: hidden;
      z-index: 2147483647 !important;
    }

    .cb-widget-button:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .cb-chat-popup-container {
      position: fixed;
      bottom: 58px;
      right: 72px;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 0px;
      z-index: 2147483647 !important;
    }

    .cb-chat-popup {
      position: relative;
      background-color: #f2f2f2;
      color: #333333;
      padding: 12px 20px;
      border-radius: 20px 20px 0px 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 2147483647 !important;
      font-size: 13px;
      max-width: 400px;
      width: max-content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
      cursor: pointer;
      transition: opacity 0.3s ease, transform 0.3s ease;
      opacity: 0;
      transform: translateY(10px);
      margin-bottom: -26px;
    }

    .cb-chat-popup:first-child {
      margin-bottom: 0;
    }

    .cb-chat-popup::after {
      content: '';
      position: absolute;
      bottom: -8px;
      right: 20px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #f2f2f2;
      transition: border-top-color 0.3s ease;
    }

    .cb-chat-popup:hover {
      background-color: #e0e0e0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .cb-chat-popup:hover::after {
      border-top-color: #e0e0e0;
    }

    .cb-chat-popup.show {
      opacity: 1;
      transform: translateY(0);
    }

    .cb-chat-popup.hide {
      opacity: 0;
      transform: translateY(10px);
    }

    .cb-chatbot-button {
      position: fixed;
      bottom: 78px;
      right: 16px;
      transform: translateY(calc(100% + 10px));
      padding: 0;
      width: 60px;
      height: 60px;
      z-index: 2147483647 !important;
    }

    .cb-chatbot-button img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0;
      display: block;
    }

    .cb-chatbot-button:hover img {
      filter: brightness(1.1);
      transition: filter 0.5s ease;
    }

.cb-widget-buttons {
    position: fixed;
    bottom: 73px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    z-index: 2147483647 !important;
    transition: transform 0.5s ease, opacity 0.5s ease;
}
      
    .bpFab {
      display: none;
    }

    @media (max-width: 768px) {
      .cb-widget-buttons {
        left: 20px;
        right: auto;
      }

      .cb-chatbot-button {
        left: 16px;
        right: auto;
      }

      .cb-chat-popup-container {
        left: 72px;
        right: auto;
        align-items: flex-start;
      }

      .cb-chat-popup {
        border-radius: 20px 20px 20px 0;
      }

      .cb-chat-popup::after {
        left: 20px;
        right: auto;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
  
  // After style element creation
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => callback && callback();
    script.onerror = () => console.error(`Failed to load script: ${src}`);
    document.body.appendChild(script);
}

// Load bot immediately
loadScript('https://your-gpt.github.io/widget/config.js', () => {
    loadScript(config.injectUrl, () => {
        window.botpress.init({
            "botId": "6c19be39-eda6-4258-886e-f62e1bc0e578",
            "clientId": "1f8b6035-58e4-4216-8788-79b33e8c3e49",
            "configuration": {
                "composerPlaceholder": "Schreiben Sie eine Nachricht...",
                "botName": "LinkGPT",
                "botAvatar": "https://files.bpcontent.cloud/2025/01/13/18/20250113185223-33X3V00H.gif",
                "botDescription": "Unsere KI beantwortet Ihre Fragen",
                "website": {},
                "email": {},
                "phone": {},
                "termsOfService": {},
                "privacyPolicy": {},
                "color": "#6E1E46",
                "variant": "solid",
                "themeMode": "light",
                "fontFamily": "inter",
                "radius": 2,
                "additionalStylesheet": `
                    .bpComposerPoweredBy {
                        display: none;
                    }
                    .bp-widget-container {
                        z-index: 2147483645 !important;
                    }
                    .bpHeaderContentDescription {
                        display: none;
                    }
                `
            }
        });
    });
});


  const chatbotButton = document.createElement('div');
  chatbotButton.className = 'cb-widget-button cb-chatbot-button';
  chatbotButton.id = 'chatbotWidgetTrigger';
  chatbotButton.innerHTML = `
      <img src="https://files.bpcontent.cloud/2025/01/13/18/20250113185223-33X3V00H.gif" style="width: 60px; height: 60px;">
  `;
  document.body.appendChild(chatbotButton);
  
  const chatPopupContainer = document.createElement('div');
  chatPopupContainer.id = 'cbchatPopupContainer';
  chatPopupContainer.className = 'cb-chat-popup-container';
  document.body.appendChild(chatPopupContainer);

  let isChatbotOpen = false;

chatbotButton.addEventListener('click', function() {
    if (window.botpress) {
        if (isChatbotOpen) {
            window.botpress.close();
            isChatbotOpen = false;
        } else {
            window.botpress.open();
            isChatbotOpen = true;
        }
    }
});

  let shownPopups = new Set();


window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Second message at 50% scroll
    if (scrollPercentage >= 50 && !shownPopups.has('second')) {
        showChatPopup(getSecondMessage(), 5000, false, 'second');
    }

    // Contact message at 90% scroll
    if (scrollPercentage > 90 && !shownPopups.has('Nehmen Sie gerne Kontakt zu uns auf!')) {
        showChatPopup('Nehmen Sie gerne Kontakt zu uns auf!', 7000);
    }
});

function showChatPopup(message, duration = false) {
    if (shownPopups.has(message)) return;
    shownPopups.add(message);

    const popup = document.createElement('div');
    popup.className = 'cb-chat-popup';
    popup.innerHTML = message;

    // Add click handler directly to the popup
popup.addEventListener('click', function() {
    if (window.botpress && typeof window.botpress.open === 'function') {
        window.botpress.open();
        isChatbotOpen = true;
    }
});

    chatPopupContainer.insertBefore(popup, chatPopupContainer.firstChild);

    const existingPopups = chatPopupContainer.querySelectorAll('.cb-chat-popup');
    existingPopups.forEach((existingPopup, index) => {
        if (index > 0) {
            existingPopup.style.transform = `translateY(-${index * 100}%)`;
        }
    });

    setTimeout(() => {
        popup.classList.add('show');
    }, 100);

    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hide');
        setTimeout(() => {
            chatPopupContainer.removeChild(popup);
            const remainingPopups = chatPopupContainer.querySelectorAll('.cb-chat-popup');
            remainingPopups.forEach((remainingPopup, index) => {
                remainingPopup.style.transform = `translateY(-${index * 100}%)`;
            });
        }, 300);
    }, duration);
}


// Basic version - Standard welcome message
function isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path === '/index.html';
}

setTimeout(function() {
    const message = isHomePage()
        ? '👋 Willkommen! Wie kann ich Ihnen helfen?'
        : '💭 Haben Sie Fragen? Ich bin hier, um zu helfen!';
    showChatPopup(message, 5000);
}, 1500);

function getSecondMessage() {
    return isHomePage()
        ? '🔎 Haben Sie gefunden was Sie suchen?'
        : 'Kann ich Ihnen bei etwas Bestimmtem helfen?';
}

/* PREMIUM FEATURE: Page-specific messages
// Configuration object for page-specific settings
const pageConfig = {
    // URL pattern to page name mapping
    urlPatterns: {
        '^/$|/index.html$': 'home',
        'unternehmen': 'about',
        'immobilienangebote': 'offers',
        'kontakt': 'contact',
        // Easy to add new pages:
        // 'your-url-pattern': 'page-key',
    },

    // Messages for each page and type
    messages: {
        welcome: {
            home: '👋 Willkommen! Wie kann ich Ihnen helfen?',
            about: '💭 Haben Sie Fragen zu unserem Unternehmen?',
            offers: '🏠 Suchen Sie etwas Bestimmtes?',
            contact: 'Möchten Sie Kontakt aufnehmen?',
            default: 'Haben Sie Fragen? Ich bin hier, um zu helfen!'
        },
        second: {
            home: '🔎 Haben Sie gefunden was Sie suchen?',
            about: '🔎 Möchten Sie etwas über unser Team wissen?',
            offers: '🔎 Haben Sie gefunden was Sie suchen?',
            contact: '🔎 Haben Sie weitere Fragen?',
            default: 'Kann ich Ihnen bei etwas Bestimmtem helfen?'
        }
    }
};

function getCurrentPage() {
    const path = window.location.pathname;
    for (const [pattern, pageName] of Object.entries(pageConfig.urlPatterns)) {
        if (path.match(new RegExp(pattern))) {
            return pageName;
        }
    }
    return 'default';
}

function getMessage(type, page) {
    return pageConfig.messages[type]?.[page] || pageConfig.messages[type].default;
}
END PREMIUM FEATURE */


})();
