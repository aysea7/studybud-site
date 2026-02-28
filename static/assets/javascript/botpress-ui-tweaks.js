(function () {
  const ROOT_ID = "webchat-root";

  // CSS that will run *inside* the Botpress shadow root
  const TWEAKS_CSS = `
    /* ====== REMOVE HEADER + INTRO MARQUEE ====== */
    .bpHeaderContainer { display: none !important; }
    .bpMessageListMarqueeContainer { display: none !important; }

    /* ====== REMOVE "⚡ by Botpress" FOOTER ====== */
    .bpComposerFooter { display: none !important; }

    /* ====== REMOVE MIC BUTTON ====== */
    .bpComposerVoiceButton { display: none !important; }

    /* ====== OPTIONAL: REMOVE FILE DROP OVERLAY / UPLOAD UI ====== */
    .bpDropzoneOverlay { display: none !important; }
    .bpComposerUploadButton,
    .bpComposerUploadButtonContainer,
    .bpComposerUploadButtonIcon { display: none !important; }

    /* ====== OPTIONAL: REMOVE "Delivered" / delivery status text ====== */
    .bpMessageContainer:after { display: none !important; }

    /* ====== OPTIONAL: REMOVE FEEDBACK THUMBS (if they show) ====== */
    .bpMessageBlocksBubbleFeedbackContainer { display: none !important; }

    /* ====== MAKE IT LOOK LIKE A PLAIN TEXT WINDOW ====== */
    .bpContainer {
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
    }

    .bpMessageListContainer {
      background: transparent !important;
    }

    /* Make bubbles more "plain" */
    .bpMessageBlocksBubble {
      border-radius: 10px !important;
      box-shadow: none !important;
    }

    /* Incoming messages: subtle */
    .bpMessageBlocksBubble[data-direction="incoming"] {
      background: rgba(0,0,0,0.06) !important;
      color: inherit !important;
    }

    /* Outgoing messages: your brand color (or go subtle too) */
    .bpMessageBlocksBubble[data-direction="outgoing"] {
      background: var(--message-bg, #C4392F) !important;
      color: var(--message-text, #fff) !important;
    }

    /* Composer: simpler + flush */
    .bpComposerContainer {
      margin: 0 !important;
      border-radius: 0 !important;
      border-left: none !important;
      border-right: none !important;
      border-bottom: none !important;
    }

    /* Optional: tighter padding */
    .bpMessageListViewport { padding-top: 12px !important; }
  `;

  function injectStyles(shadowRoot) {
    if (!shadowRoot || shadowRoot.__studybudTweaksApplied) return;

    const style = document.createElement("style");
    style.setAttribute("data-studybud-botpress-tweaks", "true");
    style.textContent = TWEAKS_CSS;
    shadowRoot.appendChild(style);

    shadowRoot.__studybudTweaksApplied = true;
  }

  function tryApply() {
    const host = document.getElementById(ROOT_ID);
    if (!host) return false;

    const shadow = host.shadowRoot;
    if (!shadow) return false;

    injectStyles(shadow);
    return true;
  }

  // Try immediately
  if (tryApply()) return;

  // If not ready yet, observe the page until it appears
  const obs = new MutationObserver(() => {
    if (tryApply()) obs.disconnect();
  });

  obs.observe(document.documentElement, { childList: true, subtree: true });
})();