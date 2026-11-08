/**
 * Soromath Theme Manager & Custom Theme Builder
 */
class ThemeManager {
  constructor() {
    this.themes = [
      { id: 'obsidian', name: 'Obsidian Dark' },
      { id: 'matrix', name: 'Matrix Terminal' },
      { id: 'sakura', name: 'Sakura Blossom' },
      { id: 'ocean', name: 'Deep Ocean' },
      { id: 'cyberpunk', name: 'Cyberpunk Neon' },
      { id: 'fire', name: 'Solar Flare' },
      { id: 'amethyst', name: 'Amethyst Night' },
      { id: 'nordic', name: 'Nordic Clean' },
    ];

    this.currentTheme = localStorage.getItem('soromath_theme') || 'obsidian';
    this.customTheme = this.loadCustomTheme();
    this.applyTheme(this.currentTheme);
  }

  loadCustomTheme() {
    try {
      const saved = localStorage.getItem('soromath_custom_theme');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  saveCustomTheme(customObj) {
    this.customTheme = customObj;
    localStorage.setItem('soromath_custom_theme', JSON.stringify(customObj));
    this.applyCustomTheme(customObj);
  }

  applyTheme(themeId) {
    this.currentTheme = themeId;
    localStorage.setItem('soromath_theme', themeId);

    const root = document.documentElement;

    if (themeId === 'custom' && this.customTheme) {
      this.applyCustomTheme(this.customTheme);
      return;
    }

    root.style.removeProperty('--bg-primary');
    root.style.removeProperty('--bg-secondary');
    root.style.removeProperty('--card-bg');
    root.style.removeProperty('--card-border');
    root.style.removeProperty('--text-primary');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--font-main');

    root.setAttribute('data-theme', themeId);
  }

  applyCustomTheme(c) {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'custom');
    if (c.bg) root.style.setProperty('--bg-primary', c.bg);
    if (c.card) {
      root.style.setProperty('--bg-secondary', c.card);
      root.style.setProperty('--card-bg', c.card);
    }
    if (c.border) root.style.setProperty('--card-border', c.border);
    if (c.text) root.style.setProperty('--text-primary', c.text);
    if (c.accent) {
      root.style.setProperty('--accent', c.accent);
      root.style.setProperty('--accent-glow', c.accent + '55');
      root.style.setProperty('--accent-subtle', c.accent + '22');
    }
    if (c.font) root.style.setProperty('--font-main', c.font);
  }

  cycleTheme() {
    const idx = this.themes.findIndex(t => t.id === this.currentTheme);
    const nextIdx = (idx + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIdx].id);
    return this.themes[nextIdx];
  }
}

window.themeManager = new ThemeManager();
