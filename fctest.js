(function() {
    
    const styles = `

    :root {
      --widget-button-color: #20BDBE;
      --widget-icon-color: #f2f2f2;
      --widget-button-hover-color: #269b9b;
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
  bottom: 77px;
  right: 20px;
  transform: translateY(calc(100% + 10px));
}

      .cb-widget-buttons {
    gap: 6px;
    bottom: 73px;
      }
      
     .bpFab {
        display: none;
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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <text x="5.5" y="15" fontSize="10" fill="black" stroke="none" textAnchor="middle" dominantBaseline="central">KI</text>
        </svg>
    `;
    document.body.appendChild(chatbotButton);
    
    
      // Create and append elements for WidgetStack and Popup
  const chatPopupContainer = document.createElement('div');
  chatPopupContainer.id = 'cbchatPopupContainer';
  chatPopupContainer.className = 'cb-chat-popup-container';
  document.body.appendChild(chatPopupContainer);


    
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => callback && callback();
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.body.appendChild(script);
    }

    function initializeChatbot() {
        let isChatbotOpen = false;

        chatbotButton.addEventListener('click', function() {
            if (window.botpress) {
                if (isChatbotOpen) {
                    if (typeof window.botpress.close === 'function') {
                        window.botpress.close();
                        isChatbotOpen = false;
                        console.log('Chatbot closed');
                    } else {
                        console.error('Botpress close function is not available');
                    }
                } else {
                    if (typeof window.botpress.open === 'function') {
                        window.botpress.open();
                        isChatbotOpen = true;
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
            loadScript('https://files.bpcontent.cloud/2024/11/28/11/20241128110207-4YHV7PQ4.js', () => {
                // Initialize the chatbot after all scripts are loaded
                initializeChatbot();
            });
        });
    });
    
      // Script logic
  let lastScrollTop = 0;
  let buttonsCollapsed = false;
  let collapseTimeout;
  let shownPopups = new Set();
  let maxScrollReached = 0;
  let pageLoadTime = Date.now();
  let firstTwoBubblesShown = false;

    window.addEventListener('scroll', function() {
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;
  const scrollTop = window.pageYOffset;
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

  lastScrollTop = scrollTop; // Update lastScrollTop after each scroll event

});

    function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
      return 'home';
    } else if (path.includes('aktuelle-immobilienangebote')) {
      return 'immobilien';
    } else if (path.includes('immobilienbewertung')) {
      return 'bewertung';
    } else if (path.includes('immobilien-verkaufen')) {
      return 'verkaufen';
    } else if (path.includes('kontakt')) {
      return 'kontakt';
    } 
    else {
      return 'other';
    }
  }

  function showChatPopup(message, duration, socialIcons = false) {
    if (shownPopups.has(message)) return;
    shownPopups.add(message);

    const popup = document.createElement('div');
    popup.className = 'cb-chat-popup';
    popup.innerHTML = message;

    if (socialIcons) {
      popup.innerHTML += `
        <div class="social-icons">
          <a href="https://www.instagram.com/goost_immobilien/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/Goost.Immobilien/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCnLEXs3sZmUv6zQYIPko6UQ" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/goost-immobilien/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
            </svg>
          </a>
        </div>
      `;
    }

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
          return;
        }
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
          dfMessenger.setAttribute('expand', 'true');
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
      case 'immobilien':
        message = '🏠 Suchen Sie eine bestimmte Immobilie?';
        break;
      case 'kontakt':
        message = '📞 Möchten Sie direkt mit uns in Kontakt treten?';
        break;
      case 'bewertung':
        message = '📊 Gerne bewerten wir Ihre Immobilie für Sie!';
        break;
      case 'verkaufen':
        message = '🧾 Möchten Sie Ihre Immobilie bewerten lassen?';
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
    case 'immobilien':
      return '🔎 Haben Sie gefunden was Sie suchen?';
    case 'kontakt':
      return 'Haben Sie Fragen zu unseren Kontaktmöglichkeiten?';
    case 'bewertung':
      return 'Möchten Sie mehr über unseren Bewertungsprozess wissen?';
    case 'verkaufen':
      return 'Wir bewerten Ihre Immobilie kostenlos für Sie.';
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

    if (scrollPercentage > 90 && !shownPopups.has('Besuchen Sie uns gerne auf Social Media!')) {
      showChatPopup('Besuchen Sie uns gerne auf Social Media!', 7000, true);
    }

    checkForFourthBubble();
  });

  setInterval(checkForFourthBubble, 1000);
    
})();
