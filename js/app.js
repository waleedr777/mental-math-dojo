/**
 * Soromath Master Application Controller
 */
class AppController {
  constructor() {
    this.currentTab = 'tricks';
    this.init();
  }

  init() {
    this.setupTabs();
    this.setupGlobalHotkeys();
    this.setupSettingsUI();

    if (window.SorobanAbacus) {
      window.sorobanAbacus = new SorobanAbacus('soroban-container', 5);
    }

    if (window.statsManager) {
      window.statsManager.updateTrickMasteryCount();
    }

    const savedTab = localStorage.getItem('soromath_active_tab') || 'tricks';
    this.switchTab(savedTab);

    const streakElem = document.getElementById('header-streak-count');
    if (streakElem && window.dailyQuestManager) {
      streakElem.textContent = `${window.dailyQuestManager.streak}d`;
    }

    this.syncMuteButton();
  }

  setupTabs() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    localStorage.setItem('soromath_active_tab', tabId);

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(`view-${tabId}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    if (tabId === 'drills') {
      if (window.drillEngine) {
        window.drillEngine.resetTest();
      }
    } else if (tabId === 'tricks') {
      if (window.trickDojo) {
        window.trickDojo.renderGrid();
      }
    } else if (tabId === 'stats') {
      if (window.statsManager) {
        window.statsManager.renderStatsTab();
      }
    } else if (tabId === 'daily') {
      if (window.dailyQuestManager && !window.dailyQuestManager.isCompletedToday()) {
        window.dailyQuestManager.startQuest();
      }
    }
  }

  setupGlobalHotkeys() {
    window.addEventListener('keydown', (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay.active');
        if (modal && window.trickDojo) {
          window.trickDojo.closeModal();
          return;
        }

        if (this.currentTab === 'drills' && window.drillEngine) {
          window.drillEngine.resetTest();
        }
      }

      if (!isInput) {
        if (e.key === ' ' && this.currentTab === 'anzan') {
          e.preventDefault();
          if (window.flashAnzanEngine) {
            if (window.flashAnzanEngine.isRunning) {
              window.flashAnzanEngine.reset();
            } else {
              window.flashAnzanEngine.start();
            }
          }
        } else if (e.key === 'r' && this.currentTab === 'drills') {
          e.preventDefault();
          if (window.drillEngine) window.drillEngine.resetTest();
        }
      }
    });
  }

  setupSettingsUI() {
    const themeSelect = document.getElementById('settings-theme-select');
    if (themeSelect && window.themeManager) {
      themeSelect.value = window.themeManager.currentTheme;
      themeSelect.addEventListener('change', (e) => {
        window.themeManager.applyTheme(e.target.value);
        this.showToast(`Applied ${e.target.value} theme`, 'toast-info');
      });
    }

    const volSlider = document.getElementById('settings-vol-slider');
    if (volSlider && window.soundEngine) {
      volSlider.value = window.soundEngine.volume * 100;
      volSlider.addEventListener('input', (e) => {
        window.soundEngine.setVolume(e.target.value / 100);
      });
    }

    const liveCorrCheck = document.getElementById('settings-live-corr');
    if (liveCorrCheck && window.drillEngine) {
      liveCorrCheck.checked = window.drillEngine.liveCorrections;
      liveCorrCheck.addEventListener('change', (e) => {
        window.drillEngine.toggleLiveCorrections(e.target.checked);
      });
    }

    const voiceModeCheck = document.getElementById('settings-voice-mode');
    if (voiceModeCheck && window.drillEngine) {
      voiceModeCheck.checked = window.drillEngine.voiceMode;
      voiceModeCheck.addEventListener('change', (e) => {
        window.drillEngine.toggleVoiceMode(e.target.checked);
      });
    }

    const applyCustomBtn = document.getElementById('apply-custom-theme-btn');
    if (applyCustomBtn && window.themeManager) {
      applyCustomBtn.addEventListener('click', () => {
        const bg = document.getElementById('custom-color-bg').value;
        const card = document.getElementById('custom-color-card').value;
        const border = document.getElementById('custom-color-border').value;
        const text = document.getElementById('custom-color-text').value;
        const accent = document.getElementById('custom-color-accent').value;
        const font = document.getElementById('custom-font-select').value;

        window.themeManager.saveCustomTheme({ bg, card, border, text, accent, font });
        this.showToast('Custom theme saved and applied', 'toast-success');
      });
    }
  }

  toggleSound() {
    if (window.soundEngine) {
      const isMuted = window.soundEngine.toggleMute();
      this.syncMuteButton();
      this.showToast(isMuted ? 'Muted' : 'Sound Enabled', 'toast-info');
    }
  }

  syncMuteButton() {
    const btn = document.getElementById('header-sound-btn');
    if (btn && window.soundEngine) {
      const isMuted = window.soundEngine.muted;
      btn.innerHTML = isMuted 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      btn.title = isMuted ? 'Unmute sounds' : 'Mute sounds';
    }
  }

  cycleTheme() {
    if (window.themeManager) {
      const nextTheme = window.themeManager.cycleTheme();
      this.showToast(`Theme: ${nextTheme.name}`, 'toast-info');
      const themeSelect = document.getElementById('settings-theme-select');
      if (themeSelect) themeSelect.value = nextTheme.id;
    }
  }

  showToast(msg, type = 'toast-info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
