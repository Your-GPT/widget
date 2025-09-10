(function() {
	function loadScript(src, onload) {
		var s = document.createElement('script');
		s.src = src;
		s.async = true;
		if (onload) s.onload = onload;
		s.onerror = function() { console.error('Failed to load script:', src); };
		document.head.appendChild(s);
	}

	function hasAccepted() {
		try { return localStorage.getItem('bp_privacy_accepted') === '1'; } catch(e) { return false; }
	}

	function whenBotpressReady(cb) {
		var tries = 0;
		(function check() {
			tries++;
			if (window.botpress && typeof window.botpress.open === 'function') return cb();
			if (tries > 200) return; // ~10s max
			setTimeout(check, 50);
		})();
	}

	function showPrivacyPrompt(onAccept) {
		var existing = document.getElementById('bp-privacy-consent');
		if (existing) return;

		var overlay = document.createElement('div');
		overlay.id = 'bp-privacy-consent';
		overlay.style.position = 'fixed';
		overlay.style.bottom = '110px';
		overlay.style.right = '20px';
		overlay.style.zIndex = '2147483646';
		overlay.style.background = 'transparent';
		overlay.style.color = '#111';
		overlay.style.borderRadius = '10px';
		overlay.style.maxWidth = '320px';
		overlay.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, sans-serif';
		overlay.style.fontSize = '13px';
		overlay.style.lineHeight = '1.4';

		// Chat-like wrapper
		var wrap = document.createElement('div');
		wrap.style.display = 'flex';
		wrap.style.flexDirection = 'column';
		wrap.style.alignItems = 'flex-end';
		wrap.style.gap = '6px';

		// Bot bubble
		var botBubble = document.createElement('div');
		botBubble.style.position = 'relative';
		botBubble.style.background = '#f2f3f5';
		botBubble.style.color = '#0f1419';
		botBubble.style.padding = '10px 12px';
		botBubble.style.borderRadius = '14px 14px 2px 14px';
		botBubble.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
		botBubble.style.maxWidth = '320px';
		botBubble.style.fontSize = '13px';
		botBubble.style.lineHeight = '1.4';
		botBubble.style.marginBottom = '2px';
		var tail = document.createElement('div');
		tail.style.content = '""';
		tail.style.position = 'absolute';
		tail.style.right = '10px';
		tail.style.bottom = '-6px';
		tail.style.width = '0';
		tail.style.height = '0';
		tail.style.borderLeft = '8px solid transparent';
		tail.style.borderRight = '0 solid transparent';
		tail.style.borderTop = '8px solid #f2f3f5';

		var botTitle = document.createElement('div');
		botTitle.textContent = 'Datenschutz-Einstellungen';
		botTitle.style.fontWeight = '600';
		botTitle.style.marginBottom = '6px';

		var botText = document.createElement('div');
		botText.textContent = 'Wir verwenden notwendige Cookies für den Chat. Optional können Sie Analyse-Cookies erlauben.';
		botText.style.marginBottom = '8px';

		var policy = document.createElement('div');
		policy.style.marginBottom = '8px';
		var link = document.createElement('a');
		link.href = 'https://www.thueringens-sueden.de/datenschutzerklaerung/';
		link.textContent = 'Datenschutzerklärung ansehen';
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		link.style.color = '#0d6efd';
		link.style.textDecoration = 'underline';
		policy.appendChild(link);

		var list = document.createElement('div');
		list.style.display = 'flex';
		list.style.flexDirection = 'column';
		list.style.gap = '6px';

		var necessary = document.createElement('div');
		necessary.textContent = 'Notwendig: Erforderlich für die Funktion des Chats (immer aktiv)';
		necessary.style.color = '#555';
		necessary.style.fontSize = '12px';

		var analyticsRow = document.createElement('label');
		analyticsRow.style.display = 'flex';
		analyticsRow.style.alignItems = 'center';
		analyticsRow.style.gap = '8px';
		analyticsRow.style.cursor = 'pointer';
		var analytics = document.createElement('input');
		analytics.type = 'checkbox';
		analytics.checked = false;
		analytics.setAttribute('aria-label', 'Analyse erlauben');
		var analyticsText = document.createElement('span');
		analyticsText.textContent = 'Analyse (optional)';
		analyticsRow.appendChild(analytics);
		analyticsRow.appendChild(analyticsText);

		list.appendChild(necessary);
		list.appendChild(analyticsRow);

		botBubble.appendChild(botTitle);
		botBubble.appendChild(botText);
		botBubble.appendChild(policy);
		botBubble.appendChild(list);
		botBubble.appendChild(tail);

		// Actions as message-like pills
		var actions = document.createElement('div');
		actions.style.display = 'flex';
		actions.style.gap = '6px';
		actions.style.alignItems = 'center';
		actions.style.justifyContent = 'flex-end';

		var btnAccept = document.createElement('button');
		btnAccept.textContent = 'Akzeptieren';
		btnAccept.style.background = '#0d6efd';
		btnAccept.style.color = '#fff';
		btnAccept.style.border = 'none';
		btnAccept.style.borderRadius = '16px';
		btnAccept.style.padding = '8px 12px';
		btnAccept.style.cursor = 'pointer';
		btnAccept.style.boxShadow = '0 2px 8px rgba(13,110,253,0.3)';

		var btnSave = document.createElement('button');
		btnSave.textContent = 'Ablehnen';
		btnSave.style.background = '#fff';
		btnSave.style.color = '#333';
		btnSave.style.border = '1px solid #d0d7de';
		btnSave.style.borderRadius = '16px';
		btnSave.style.padding = '8px 12px';
		btnSave.style.cursor = 'pointer';

		actions.appendChild(btnSave);
		actions.appendChild(btnAccept);

		wrap.appendChild(botBubble);
		wrap.appendChild(actions);
		overlay.appendChild(wrap);
		document.body.appendChild(overlay);

		function acceptAndOpen() {
			try {
				localStorage.setItem('bp_privacy_accepted', '1');
				var allowAnalytics = (analytics && analytics.checked) === true;
				localStorage.setItem('bp_privacy_analytics', allowAnalytics ? '1' : '0');
			} catch(e) {}
			// Render a tiny user bubble response
			try {
				var userBubble = document.createElement('div');
				userBubble.textContent = 'Akzeptieren';
				userBubble.style.alignSelf = 'flex-end';
				userBubble.style.background = '#0d6efd';
				userBubble.style.color = '#fff';
				userBubble.style.padding = '8px 10px';
				userBubble.style.borderRadius = '14px 2px 14px 14px';
				userBubble.style.boxShadow = '0 4px 14px rgba(13,110,253,0.3)';
				userBubble.style.maxWidth = '220px';
				userBubble.style.fontSize = '13px';
				userBubble.style.marginTop = '4px';
				wrap.appendChild(userBubble);
				setTimeout(function() {
					if (overlay.parentNode) document.body.removeChild(overlay);
					try { window.dispatchEvent(new CustomEvent('bp-privacy-consent', { detail: { analytics: (analytics && analytics.checked) === true } })); } catch(e) {}
					onAccept && onAccept();
				}, 350);
			} catch(e) {
				if (overlay.parentNode) document.body.removeChild(overlay);
				onAccept && onAccept();
			}
		}

		btnAccept.addEventListener('click', function() {
			acceptAndOpen();
		});

		btnSave.addEventListener('click', function() {
			try { localStorage.setItem('bp_privacy_analytics', '0'); } catch(e) {}
			// Do not mark accepted; keep gate active. Close current banner.
			if (overlay.parentNode) document.body.removeChild(overlay);
			try { window.dispatchEvent(new CustomEvent('bp-privacy-consent', { detail: { analytics: false } })); } catch(e) {}
			// Do NOT open the bot
		});
	}

	function installPrivacyGate() {
		if (!window.botpress || typeof window.botpress.open !== 'function') return;
		if (window.botpress.__privacyWrapped) return;
		var originalOpen = window.botpress.open.bind(window.botpress);
		window.botpress.open = function() {
			if (hasAccepted()) return originalOpen();
			showPrivacyPrompt(function() { originalOpen(); });
		};
		window.botpress.__privacyWrapped = true;
	}

	// Intercept when window.botpress is assigned to ensure we always wrap early
	(function interceptAssignment() {
		var _bp = window.botpress;
		try {
			Object.defineProperty(window, 'botpress', {
				configurable: true,
				get: function() { return _bp; },
				set: function(v) {
					_bp = v;
					setTimeout(installPrivacyGate, 0);
				}
			});
			if (_bp) setTimeout(installPrivacyGate, 0);
		} catch(e) {
			// Fallback: poll
			whenBotpressReady(installPrivacyGate);
		}
	})();

	// Capture clicks on default Botpress launcher to gate by consent without custom button
	document.addEventListener('click', function(e) {
		if (hasAccepted()) return;
		var el = e.target;
		var launcher = el && (el.closest && (el.closest('.bpFab') || el.closest('[data-testid="launcher"]') || el.closest('.bpLauncher') || el.closest('.bpw-chat-launcher')));
		if (launcher) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			showPrivacyPrompt(function() {
				if (window.botpress && typeof window.botpress.open === 'function') {
					window.botpress.open();
				}
			});
		}
	}, true);

	// Visual overlay directly on top of the launcher button (no custom button)
	(function installLauncherOverlay() {
		var overlay = null;

		function findLauncher() {
			var selectors = ['.bpFab', '[data-testid="launcher"]', '.bpLauncher', '.bpw-chat-launcher'];
			for (var i = 0; i < selectors.length; i++) {
				var el = document.querySelector(selectors[i]);
				if (el) return el;
			}
			return null;
		}

		function ensureOverlay() {
			if (hasAccepted()) { removeOverlay(); return; }
			var launcher = findLauncher();
			if (!launcher) { removeOverlay(); return; }
			var rect = launcher.getBoundingClientRect();
			if (!overlay) {
				overlay = document.createElement('div');
				overlay.id = 'bp-privacy-launcher-overlay';
				overlay.style.position = 'fixed';
				overlay.style.zIndex = '2147483647';
				overlay.style.background = 'rgba(0,0,0,0)';
				overlay.style.cursor = 'pointer';
				overlay.addEventListener('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					showPrivacyPrompt(function() {
						removeOverlay();
						if (window.botpress && typeof window.botpress.open === 'function') window.botpress.open();
					});
				}, true);
				document.body.appendChild(overlay);
			}
			overlay.style.top = (rect.top) + 'px';
			overlay.style.left = (rect.left) + 'px';
			overlay.style.width = Math.max(1, rect.width) + 'px';
			overlay.style.height = Math.max(1, rect.height) + 'px';
		}

		function removeOverlay() {
			if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
			overlay = null;
		}

		var tick;
		function start() {
			if (tick) return;
			tick = setInterval(ensureOverlay, 250);
			window.addEventListener('scroll', ensureOverlay, true);
			window.addEventListener('resize', ensureOverlay, true);
		}

		start();
	})();

	// Load Botpress embed and bot config
	loadScript('https://cdn.botpress.cloud/webchat/v3.2/inject.js', function() {
		loadScript('https://files.bpcontent.cloud/2025/08/20/14/20250820142456-AMI8TDXN.js', function() {
			whenBotpressReady(installPrivacyGate);
		});
	});

	// Mini page-load popup message near launcher (click opens or triggers consent)
	(function setupMiniPopup() {
		var container = document.createElement('div');
		container.id = 'bp-mini-popup-container';
		container.style.position = 'fixed';
		container.style.bottom = '110px';
		container.style.right = '20px';
		container.style.display = 'flex';
		container.style.flexDirection = 'column-reverse';
		container.style.alignItems = 'flex-end';
		container.style.gap = '0px';
		container.style.zIndex = '2147483645';
		document.body.appendChild(container);

		function isHomePage() {
			var path = window.location.pathname;
			return path === '/' || path === '/index.html';
		}

		function showMiniPopup(message, duration) {
			var popup = document.createElement('div');
			popup.className = 'bp-mini-popup';
			popup.textContent = message;
			popup.style.position = 'relative';
			popup.style.background = '#f2f3f5';
			popup.style.color = '#0f1419';
			popup.style.padding = '10px 12px';
			popup.style.borderRadius = '14px 14px 0 14px';
			popup.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
			popup.style.fontSize = '13px';
			popup.style.maxWidth = '340px';
			popup.style.whiteSpace = 'nowrap';
			popup.style.overflow = 'hidden';
			popup.style.textOverflow = 'ellipsis';
			popup.style.lineHeight = '1.3';
			popup.style.cursor = 'pointer';
			popup.style.opacity = '0';
			popup.style.transform = 'translateY(10px)';
			popup.style.transition = 'opacity .3s ease, transform .3s ease';

			var tail = document.createElement('div');
			tail.style.position = 'absolute';
			tail.style.bottom = '-8px';
			tail.style.right = '20px';
			tail.style.width = '0';
			tail.style.height = '0';
			tail.style.borderLeft = '8px solid transparent';
			tail.style.borderRight = '8px solid transparent';
			tail.style.borderTop = '8px solid #f2f3f5';
			popup.appendChild(tail);

			popup.addEventListener('click', function() {
				if (hasAccepted()) {
					if (window.botpress && typeof window.botpress.open === 'function') window.botpress.open();
				} else {
					showPrivacyPrompt(function() {
						if (window.botpress && typeof window.botpress.open === 'function') window.botpress.open();
					});
				}
			});

			container.insertBefore(popup, container.firstChild);
			requestAnimationFrame(function() {
				popup.style.opacity = '1';
				popup.style.transform = 'translateY(0)';
			});

			setTimeout(function() {
				popup.style.opacity = '0';
				popup.style.transform = 'translateY(10px)';
				setTimeout(function() {
					if (popup.parentNode) popup.parentNode.removeChild(popup);
				}, 300);
			}, duration);
		}

		setTimeout(function() {
			var message = isHomePage()
				? '👋 Willkommen! Wie kann ich Ihnen helfen?'
				: '💭 Haben Sie Fragen? Ich bin hier, um zu helfen!';
			showMiniPopup(message, 5000);
		}, 1500);
	})();
})();


