(function() {
    const styles = `
    :root {
      --widget-icon-color: #f2f2f2;
    }

    /* Emoji Styling */
    .emoji {
      font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-size: 16px;
      line-height: 1.4;
      vertical-align: middle;
      margin-right: 4px;
    }

    /* Privacy Consent Styles */
    .privacy-consent {
      display: none;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      max-width: 400px;
      width: 100%;
      z-index: 10000;
      font-size: 12px;
      line-height: 1.4;
      max-height: calc(100vh - 40px);
      overflow-y: auto;
    }

    .privacy-consent-header {
      margin-bottom: 10px;
    }

    .privacy-consent-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .privacy-consent-text {
      font-size: 10px;
    }

    .privacy-consent-categories {
      margin: 10px 0;
      border-top: 1px solid #eee;
    }

    .privacy-consent-category {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .privacy-consent-category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .privacy-consent-category-title {
      font-weight: 600;
      font-size: 12px;
    }

    .privacy-consent-category-description {
      font-size: 11px;
      color: #666;
    }

    .privacy-consent-toggle {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
    }

    .privacy-consent-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .privacy-consent-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }

    .privacy-consent-toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    .privacy-consent-toggle input:checked + .privacy-consent-toggle-slider {
      background-color: #4CAF50;
    }

    .privacy-consent-toggle input:checked + .privacy-consent-toggle-slider:before {
      transform: translateX(16px);
    }

    .privacy-link {
    text-decoration: underline;
    }

    .privacy-consent.show {
      display: block;
    }

    .privacy-consent-buttons {
      display: flex;
      gap: 6px;
      margin-top: 10px;
      justify-content: center;
    }

    .privacy-consent button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      transition: background-color 0.3s;
      min-width: 110px;
      flex: 1;
    }

    .privacy-consent-accept {
      background-color: #4CAF50;
      color: white;
      font-weight: 500;
    }

    .privacy-consent-accept:hover {
      background-color: #45a049;
    }

    .privacy-consent-decline {
      background-color: #e0e0e0;
      color: #333;
      color: white;
    }

    .privacy-consent-decline:hover {
      background-color: #d0d0d0;
    }

    .privacy-consent-text {
      color: black;
    }

    .privacy-consent-links {
      font-size: 11px;
      margin-bottom: 8px;
      text-align: center;
    }

    .privacy-consent::-webkit-scrollbar {
      width: 6px;
    }

    .privacy-consent::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .privacy-consent::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }

    .privacy-consent::-webkit-scrollbar-thumb:hover {
      background: #666;
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
      z-index: 9998;
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
      border-radius: 20px 20px 0px 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

    .cb-chatbot-button {
      position: fixed;
      bottom: 84px;
      right: 16px;
      transform: translateY(calc(100% + 10px));
      padding: 0;
      width: 60px;
      height: 60px;
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
      z-index: 998;
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
      
    .bpFab {
      display: none;
    }

    
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
    
  `;

  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  // Add meta tag for UTF-8 encoding if not already present
  if (!document.querySelector('meta[charset="UTF-8"]')) {
    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    document.head.insertBefore(metaCharset, document.head.firstChild);
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function revokeConsent() {
    setCookie('chatbot_consent', '', -1);
    hasConsented = false;
    location.reload();
  }
  
  const privacyConsent = document.createElement('div');
  privacyConsent.className = 'privacy-consent';
  privacyConsent.innerHTML = `
      <div class="privacy-consent-header">
        <div class="privacy-consent-title">Chatbot-Datenschutzeinstellungen</div>
        <div class="privacy-consent-text">
          <span style="font-size: 10px;">F&uuml;r die Nutzung unseres Chatbots (betrieben von Singulary in Deutschland) verarbeiten wir Ihre Chatverl&auml;ufe und technische Daten. Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie k&ouml;nnen Ihre Einwilligung jederzeit mit Wirkung f&uuml;r die Zukunft widerrufen.</span>
        </div>
      </div>
      <div class="privacy-consent-categories">
        <div class="privacy-consent-category">
          <div class="privacy-consent-category-header">
            <div class="privacy-consent-category-title">Technisch notwendige Daten</div>
            <label class="privacy-consent-toggle">
              <input type="checkbox" checked disabled>
              <span class="privacy-consent-toggle-slider"></span>
            </label>
          </div>
          <div class="privacy-consent-category-description">
            Technische Daten wie Session-ID und Einwilligungsstatus sind f&uuml;r den Betrieb des Chatbots erforderlich. Diese Daten werden lokal in Ihrem Browser gespeichert.
            <br><br>
            <strong>Speicherdauer:</strong> Session / 1 Jahr f&uuml;r Einwilligungsstatus
          </div>
        </div>
        <div class="privacy-consent-category">
          <div class="privacy-consent-category-header">
            <div class="privacy-consent-category-title">Chatverlauf & Analyse</div>
            <label class="privacy-consent-toggle">
              <input type="checkbox" class="analytics-consent" checked>
              <span class="privacy-consent-toggle-slider"></span>
            </label>
          </div>
          <div class="privacy-consent-category-description">
            Ihre Chatverl&auml;ufe werden gespeichert, um den Kontext Ihrer Konversation zu erhalten und die Qualit&auml;t unseres Chatbots zu verbessern. Die Daten werden auf Servern in der EU verarbeitet.
            <br><br>
            <strong>Speicherdauer:</strong> 30 Tage
          </div>
        </div>
        <div class="privacy-consent-category">
          <div class="privacy-consent-category-header">
            <div class="privacy-consent-category-title">KI-Training & Optimierung</div>
            <label class="privacy-consent-toggle">
              <input type="checkbox" class="marketing-consent" checked>
              <span class="privacy-consent-toggle-slider"></span>
            </label>
          </div>
          <div class="privacy-consent-category-description">
            Mit Ihrer Zustimmung nutzen wir anonymisierte Chatverl&auml;ufe, um unser KI-Modell zu trainieren und die Antworten zu verbessern. Diese Daten werden von Singulary in Deutschland verarbeitet und gespeichert.
            <br><br>
            <strong>Speicherdauer:</strong> 90 Tage
          </div>
        </div>
      </div>
      <div class="privacy-consent-footer">
        <div class="privacy-consent-info">
          <span style="font-size: 10px;">Sie k&ouml;nnen Ihre Einwilligung jederzeit widerrufen, indem Sie auf das Chatbot-Icon klicken und die Einstellungen erneut aufrufen.</span>
        </div>
        <div class="privacy-consent-links">
          <a href="/datenschutz" class="privacy-link" target="_blank">Datenschutzerkl&auml;rung</a>
        </div>
      <div class="privacy-consent-buttons">
          <button class="privacy-consent-decline">Alle ablehnen</button>
          <button class="privacy-consent-save">Auswahl speichern</button>
          <button class="privacy-consent-accept">Alle akzeptieren</button>
      </div>
  `;
  document.body.appendChild(privacyConsent);

  const chatbotButton = document.createElement('button');
  chatbotButton.className = 'cb-widget-button cb-chatbot-button';
  chatbotButton.id = 'chatbotWidgetTrigger';
  chatbotButton.innerHTML = `
      <img src="https://images.squarespace-cdn.com/content/641c5981823d0207a111bb74/999685ce-589d-4f5f-9763-4e094070fb4b/64e9502e4159bed6f8f57b071db5ac7e+%281%29.gif" alt="Chatbot" style="width: 60px; height: 60px;">
  `;
  document.body.appendChild(chatbotButton);
  
  const chatPopupContainer = document.createElement('div');
  chatPopupContainer.id = 'cbchatPopupContainer';
  chatPopupContainer.className = 'cb-chat-popup-container';
  document.body.appendChild(chatPopupContainer);

  let isChatbotOpen = false;
  let hasConsented = false;
  let botScriptsLoaded = false;
  let botInitialized = false;

  // Check for saved consent
  const savedConsent = getCookie('chatbot_consent');
  if (savedConsent === 'true') {
    hasConsented = true;
  }

  // Load bot scripts immediately regardless of consent status
  loadBotScripts(false);

  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => callback && callback();
    script.onerror = () => console.error(`Failed to load script: ${src}`);
    document.body.appendChild(script);
  }

  function initializeBot(openAfterInit = false) {
    if (botInitialized) return;
    
    window.botpress.init({
      "botId": "d63ff1bb-ba5d-4635-a076-7b2c13ae19bc",
      "clientId": "60bc86aa-1f33-4f03-b35a-ec8ff6165a92",
      "configuration": {
        "composerPlaceholder": "Schreiben Sie eine Nachricht...",
        "botName": "VersicherungsGPT",
        "botAvatar": "https://files.bpcontent.cloud/2025/01/20/15/20250120150034-H4MSRURH.gif",
        "botDescription": "Unsere KI beantwortet Ihre Fragen",
        "website": {},
        "email": {},
        "phone": {},
        "termsOfService": {},
        "privacyPolicy": {},
        "color": "#EB6245",
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
    
    botInitialized = true;
    
    // Only open the bot if user has consented AND we want to open after init
    if (openAfterInit && hasConsented) {
      setTimeout(() => {
        if (window.botpress && typeof window.botpress.open === 'function') {
          window.botpress.open();
          isChatbotOpen = true;
        }
      }, 300);
    }
  }

  function loadBotScripts(openAfterLoad = false) {
    if (botScriptsLoaded) {
      // Only open the bot if user has consented
      if (openAfterLoad && hasConsented && !isChatbotOpen) {
        if (botInitialized && window.botpress && typeof window.botpress.open === 'function') {
          window.botpress.open();
          isChatbotOpen = true;
        }
      }
      return;
    }
    
    loadScript('https://your-gpt.github.io/widget/config.js', () => {
      loadScript(config.injectUrl, () => {
        botScriptsLoaded = true;
        initializeBot(openAfterLoad);
      });
    });
  }

  document.querySelector('.privacy-consent-accept').addEventListener('click', function() {
    hasConsented = true;
    document.querySelectorAll('.privacy-consent-toggle input').forEach(toggle => {
      if (!toggle.disabled) toggle.checked = true;
    });
    setCookie('chatbot_consent', 'true', 365); // Store consent for 1 year
    privacyConsent.classList.remove('show');
    
    // Open the bot immediately after consent (scripts should already be loaded)
    if (botScriptsLoaded && botInitialized) {
      if (window.botpress && typeof window.botpress.open === 'function') {
        window.botpress.open();
        isChatbotOpen = true;
      }
    } else {
      // If scripts aren't loaded yet for some reason, load them with open flag
      loadBotScripts(true);
    }
  });

  document.querySelector('.privacy-consent-decline').addEventListener('click', function() {
    setCookie('chatbot_consent', 'false', 365); // Store decline for 1 year
    document.querySelectorAll('.privacy-consent-toggle input').forEach(toggle => {
      if (!toggle.disabled) toggle.checked = false;
    });
    privacyConsent.classList.remove('show');
  });

  document.querySelector('.privacy-consent-save').addEventListener('click', function() {
    const analytics = document.querySelector('.analytics-consent').checked;
    const marketing = document.querySelector('.marketing-consent').checked;
    
    hasConsented = analytics || marketing;
    setCookie('chatbot_consent_analytics', analytics ? 'true' : 'false', 365);
    setCookie('chatbot_consent_marketing', marketing ? 'true' : 'false', 365);
    setCookie('chatbot_consent', hasConsented ? 'true' : 'false', 365);
    
    privacyConsent.classList.remove('show');
    
    if (hasConsented) {
      // Open the bot immediately after consent (scripts should already be loaded)
      if (botScriptsLoaded && botInitialized) {
        if (window.botpress && typeof window.botpress.open === 'function') {
          window.botpress.open();
          isChatbotOpen = true;
        }
      } else {
        // If scripts aren't loaded yet for some reason, load them with open flag
        loadBotScripts(true);
      }
      
      // Ensure the bot opens by adding a fallback
      setTimeout(() => {
        if (hasConsented && botScriptsLoaded && botInitialized && 
            window.botpress && typeof window.botpress.open === 'function' && !isChatbotOpen) {
          window.botpress.open();
          isChatbotOpen = true;
        }
      }, 500);
    }
  });

  chatbotButton.addEventListener('click', function() {
    // Check if user has consented in this session
    if (!hasConsented) {
      // If not consented, only show the consent banner
      privacyConsent.classList.add('show');
      return; // Important: stop here and don't open the bot
    }
    
    // If user has already consented in this session, handle the bot
    if (!botScriptsLoaded) {
      loadBotScripts(true);
      return;
    }

    if (window.botpress && typeof window.botpress.open === 'function') {
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

  function showChatPopup(message, duration, socialIcons = false) {
    if (shownPopups.has(message)) return;
    shownPopups.add(message);

    const popup = document.createElement('div');
    popup.className = 'cb-chat-popup';
    
    // Format emoji properly by wrapping it in a span
    if (message.match(/[\u{1F300}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u)) {
      // Extract emoji and text
      const emojiMatch = message.match(/^([\u{1F300}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u);
      if (emojiMatch) {
        const emoji = emojiMatch[0];
        const text = message.substring(emoji.length);
        popup.innerHTML = `<span class="emoji">${emoji}</span>${text}`;
      } else {
        popup.textContent = message;
      }
    } else {
      popup.textContent = message;
    }

    // Add click handler directly to the popup
    popup.addEventListener('click', function() {
      // Check if user has consented in this session
      if (!hasConsented) {
        // If not consented, only show the consent banner
        privacyConsent.classList.add('show');
        return; // Important: stop here and don't open the bot
      }
      
      // If user has already consented in this session, handle the bot
      if (!botScriptsLoaded) {
        loadBotScripts(true);
        return;
      }

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
        if (popup.parentNode === chatPopupContainer) {
          chatPopupContainer.removeChild(popup);
          const remainingPopups = chatPopupContainer.querySelectorAll('.cb-chat-popup');
          remainingPopups.forEach((remainingPopup, index) => {
            remainingPopup.style.transform = `translateY(-${index * 100}%)`;
          });
        }
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
      : 'Haben Sie Fragen? Ich bin hier, um zu helfen!';
    showChatPopup(message, 5000);
  }, 1500);

  function getSecondMessage() {
    return isHomePage()
      ? 'Haben Sie gefunden was Sie suchen?'
      : 'Kann ich Ihnen bei etwas Bestimmtem helfen?';
  }
})(); 
