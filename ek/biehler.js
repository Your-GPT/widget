        (function() {
    
    const styles = `

    :root {
      --widget-icon-color: #f2f2f2;
    }

   .cb-widget-button.close-icon:hover {
    background-color: #ff4444 !important;
}

.cb-widget-button.close-icon {
    background-color: #e63939 !important;
}

.cb-widget-button.close-icon svg {
    color: white; /* White icon */
    width: 28px; /* Slightly larger icon */
    height: 28px;
}

.cb-widget-buttons {
  position: fixed;
  bottom: 76px; /* Erhöht von 20px auf 88px um Platz über dem Chatbot zu schaffen */
  right: 20px;  /* Angepasst auf 16px um mit dem Chatbot auszurichten */
  display: flex;
  flex-direction: column-reverse; /* Horizontale Ausrichtung der Buttons */
  gap: 10px;
  z-index: 998;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

    .cb-widget-button {
      background-color: var(--widget-button-color);
      color: var(--widget-icon-color);
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
      z-index: 9999;
    }

    .cb-widget-button svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
      display: block;
    }

    .cb-widget-button:hover {
      background-color: var(--widget-button-hover-color);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .cb-widget-buttons.collapsed {
      transform: translateY(70px);
      opacity: 0;
    }

    .cb-widget-buttons.collapsed .cb-widget-button {
      transform: scale(0);
    }

    .cb-button-stack-area {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 260px;
      height: 80px;
      z-index: 997;
    }

    .cb-chat-popup-container {
      position: fixed;
      bottom: 58px;
      right: 72px;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 0px;
      z-index: 999;
    }

    .cb-chat-popup {
      position: relative;
      background-color: #f2f2f2;
      color: #333333;
      padding: 12px 20px;
border-radius: 20px 20px 0px 20px;      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 999;
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

    .social-icons {
      display: flex;
      justify-content: space-around;
      margin-top: 5px;
    }

    .social-icons a {
      color: var(--widget-button-color);
      font-size: 18px;
      transition: color 0.3s ease, filter 0.3s ease;
    }

    .social-icons a:hover {
      color: var(--widget-button-hover-color);
      filter: brightness(1.5);
    }

    .social-icons svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
    
    .flip-vertical {
      transform: scaleX(-1);
    }
    
    .cb-widget-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.cb-chatbot-button {
  position: fixed;
  bottom: 84px;
  right: 16px;
  transform: translateY(calc(100% + 10px));
  padding: 0; /* Remove padding */
  width: 60px; /* Match the image width */
  height: 60px; /* Match the image height */
  overflow: hidden; /* Ensure content stays within bounds */
}


.cb-chatbot-button img {
  width: 100%; /* Fill entire button width */
  height: 100%; /* Fill entire button height */
  object-fit: cover; /* Ensure image covers the area */
  margin: 0; /* Remove margins */
  display: block; /* Remove any inline spacing */
}

.cb-chatbot-button:hover img {
  filter: brightness(1.1);
  transition: filter 0.5s ease;
}


      .cb-widget-buttons {
    gap: 6px;
    bottom: 73px;
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

  // Create style element
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
  
  
  // Create Chatbot
    const chatbotButton = document.createElement('button');
chatbotButton.className = 'cb-widget-button cb-chatbot-button';
chatbotButton.id = 'chatbotWidgetTrigger';
chatbotButton.innerHTML = `
    <img src="https://images.squarespace-cdn.com/content/641c5981823d0207a111bb74/999685ce-589d-4f5f-9763-4e094070fb4b/64e9502e4159bed6f8f57b071db5ac7e+%281%29.gif?content-type=image%2Fgif" alt="Chatbot" style="width: 60px; height: 60px;">
`;
document.body.appendChild(chatbotButton);
    
    
      // Create and append elements for WidgetStack and Popup
  const chatPopupContainer = document.createElement('div');
  chatPopupContainer.id = 'cbchatPopupContainer';
  chatPopupContainer.className = 'cb-chat-popup-container';
  document.body.appendChild(chatPopupContainer);

let isChatbotOpen = false;

    
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => callback && callback();
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.body.appendChild(script);
    }

function initializeChatbot() {
    const closeIconHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.71a1 1 0 0 0-1.42 1.42L10.59 12l-4.89 4.88a1 1 0 0 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"/>
        </svg>
    `;

    const openIconHTML = `
        <img src="https://images.squarespace-cdn.com/content/641c5981823d0207a111bb74/999685ce-589d-4f5f-9763-4e094070fb4b/64e9502e4159bed6f8f57b071db5ac7e+%281%29.gif?content-type=image%2Fgif" alt="Chatbot" style="width: 60px; height: 60px;">
    `;

    chatbotButton.addEventListener('click', function() {
        if (window.botpress) {
            if (isChatbotOpen) {
                if (typeof window.botpress.close === 'function') {
                    window.botpress.close();
                    isChatbotOpen = false;
                    chatbotButton.innerHTML = openIconHTML;
                    chatbotButton.classList.remove('close-icon'); // Remove close icon class
                    console.log('Chatbot closed');
                } else {
                    console.error('Botpress close function is not available');
                }
            } else {
                if (typeof window.botpress.open === 'function') {
                    window.botpress.open();
                    isChatbotOpen = true;
                    chatbotButton.innerHTML = closeIconHTML;
                    chatbotButton.classList.add('close-icon'); // Add close icon class
                    console.log('Chatbot opened');
                } else {
                    console.error('Botpress open function is not available');
                }
            }
        } else {
            console.error('Botpress is not initialized');
        }
    });
}

loadScript('https://your-gpt.github.io/widget/config.js', () => {
    loadScript(config.injectUrl, () => {
        window.botpress.init({
            "botId": "fbeaaef4-6008-4d2d-aeb5-df010c16f63b",
            "clientId": "3e9801d4-74e6-41e5-bc36-8dbbf492ab5b",
            "configuration": {
                "composerPlaceholder": "Schreiben Sie eine Nachricht...",
                "botName": "BiehlerGPT",
                "botAvatar": "https://files.bpcontent.cloud/2025/01/20/15/20250120150034-H4MSRURH.gif",
                "botDescription": "Unsere KI beantwortet Ihre Fragen",
                "website": {},
                "email": {},
                "phone": {},
                "termsOfService": {},
                "privacyPolicy": {},
                "color": "#4C4C4C",
                "variant": "solid",
                "themeMode": "light",
                "fontFamily": "inter",
                "radius": 2,
                "additionalStylesheet": `
                    .bpComposerPoweredBy {
                        display: none;
                    }
                    .bpReset bpContainer {
                        z-index: 9999;
                    }
                    .bp-widget-container {
                        z-index: 9999 !important;
                    }
                    .bpHeaderContentDescription {
                        display: none;
                    }
                `
            }
        });
        initializeChatbot();
    });
});
    
      // Script logic
let lastScrollTop = 0;
let maxScrollReached = 0;
let buttonsCollapsed = true;
let shownPopups = new Set();
let widgetButtons;

function collapseButtons() {
  buttonsCollapsed = true;
  // Add your button collapsing logic here
}

function expandButtons() {
  buttonsCollapsed = false;
  // Add your button expanding logic here
}

function getSecondMessage() {
  // Your logic to get the second message
  return "This is the second message!";
}

function showChatPopup(message, duration, socialIcons = false, id = '') {
  if (shownPopups.has(id || message)) return;
  shownPopups.add(id || message);

  // Rest of the function remains the same...
  const popup = document.createElement('div');
  popup.innerHTML = message;
  popup.style.position = 'fixed';
  popup.style.bottom = '20px';
  popup.style.right = '20px';
  popup.style.backgroundColor = 'white';
  popup.style.padding = '20px';
  popup.style.border = '1px solid #ccc';
  popup.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
    shownPopups.delete(id || message);
  }, duration);
}


window.addEventListener('scroll', function() {
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercentage = (scrollTop / (bodyHeight - windowHeight)) * 100;

  // Add the following lines to initialize widgetButtons if it's not already initialized.
  if (!widgetButtons) {
    widgetButtons = document.getElementById('widgetButtons'); // Replace 'widgetButtons' with the actual ID of your button element.
    if (!widgetButtons) {
      console.error("widgetButtons element not found!");
    }
  }

  if (scrollPercentage >= 90 && buttonsCollapsed) {
    expandButtons();
  } else if (scrollTop > lastScrollTop && !buttonsCollapsed && scrollPercentage < 90) {
    collapseButtons();
  } else if ((scrollTop < lastScrollTop || scrollPercentage >= 90) && buttonsCollapsed) {
    expandButtons();
  }

  // Check for 50% scroll to show the second popup
  if (scrollPercentage >= 50 && !shownPopups.has('second')) {
    showChatPopup(getSecondMessage(), 5000, false, 'second');
    shownPopups.add('second');
  }

  maxScrollReached = Math.max(maxScrollReached, scrollTop);
  lastScrollTop = scrollTop; // Update lastScrollTop after each scroll event
});

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/' || path === '/index.html') {
    return 'home';
  } else if (path.includes('unternehmen')) {
    return 'ueber-uns';
  } else if (path.includes('immobilienangebote')) {
    return 'angebot';
  } else if (path.includes('kontakt')) {
    return 'kontakt';
  } else {
    return 'other';
  }
}


  function showChatPopup(message, duration, socialIcons = false) {
    if (shownPopups.has(message)) return;
    shownPopups.add(message);

    const popup = document.createElement('div');
    popup.className = 'cb-chat-popup';
    popup.innerHTML = message;



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

    if (shownPopups.size === 2) {
      firstTwoBubblesShown = true;
      checkForFourthBubble();
    }
  }

  function checkForFourthBubble() {
    if (firstTwoBubblesShown && Date.now() - pageLoadTime > 30000 && !shownPopups.has('Kann ich zu einer speziellen Frage behilflich sein?')) {
      showChatPopup('Kann ich zu einer speziellen Frage behilflich sein?', 5000);
    }
  }

  function initializeChatPopupListeners() {
    chatPopupContainer.addEventListener('click', function(event) {
        const popup = event.target.closest('.cb-chat-popup');
        if (popup) {
            if (event.target.closest('.social-icons a')) {
                // Social-Icon-Links ignorieren
                return;
            }
            
            // Botpress öffnen
            if (window.botpress && typeof window.botpress.open === 'function') {
                window.botpress.open();
                isChatbotOpen = true;
            } else {
                console.error('Bot ist nicht verfügbar oder die open-Funktion fehlt.');
            }
        }
    });
}


  // Initialize components
  initializeChatPopupListeners();

    // Show the first chat popup after a short delay
  setTimeout(function() {
    const currentPage = getCurrentPage();
    let message = '';

    switch(currentPage) {
      case 'home':
        message = '👋 Willkommen! Wie kann ich Ihnen helfen?';
        break;
      case 'ueber-uns':
        message = '💭 Haben Sie Fragen zu unserem Unternehmen?';
        break;
      case 'angebot':
        message = '🏠 Suchen Sie etwas Bestimmtes?';
        break;
      case 'kontakt':
        message = 'Möchten Sie Kontakt aufnehmen?';
        break;
      default:
        message = 'Haben Sie Fragen? Ich bin hier, um zu helfen!';
    }

    showChatPopup(message, 5000);
  }, 1500);

    function getSecondMessage() {
  const currentPage = getCurrentPage();
  switch(currentPage) {
    case 'home':
      return '🔎 Haben Sie gefunden was Sie suchen?';
    case 'ueber-uns':
      return '🔎 Möchten Sie etwas über unser Team wissen?';
    case 'bueroreinigung':
      return '🔎 Haben Sie gefunden was Sie suchen?';
    case 'kitareinigung':
      return '🔎 Haben Sie gefunden was Sie suchen?';
    default:
      return 'Kann ich Ihnen bei etwas Bestimmtem helfen?';
  }
}

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = (scrollTop / scrollHeight) * 100;

    maxScrollReached = Math.max(maxScrollReached, scrollTop);

    if (scrollTop > lastScrollTop && !buttonsCollapsed) {
      collapseButtons();
    } else if (scrollTop < lastScrollTop && buttonsCollapsed) {
      expandButtons();
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    if (maxScrollReached > 1300 && !shownPopups.has('second')) {
    showChatPopup(getSecondMessage(), 5000, false, 'second');
    }

    if (scrollPercentage > 90 && !shownPopups.has('Nehmen Sie gerne Kontakt zu uns auf!')) {
      showChatPopup('Nehmen Sie gerne Kontakt zu uns auf!', 7000, true);
    }

    checkForFourthBubble();
  });

  setInterval(checkForFourthBubble, 1000);
    
})();
