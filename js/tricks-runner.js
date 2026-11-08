/**
 * Soromath Trick Dojo & Practice Runner
 */
class TrickDojo {
  constructor() {
    this.tricks = window.MENTAL_MATH_TRICKS || [];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeTrick = null;
    this.practiceProblem = null;
    this.practiceStreak = 0;
    this.advanceTimeout = null;

    // Load trick mastery levels from localStorage
    this.mastery = this.loadMastery();

    this.initDOM();
  }

  loadMastery() {
    try {
      return JSON.parse(localStorage.getItem('soromath_trick_mastery')) || {};
    } catch (e) {
      return {};
    }
  }

  saveMastery() {
    localStorage.setItem('soromath_trick_mastery', JSON.stringify(this.mastery));
    if (window.statsManager) {
      window.statsManager.updateTrickMasteryCount();
    }
  }

  getTrickStreak(trickId) {
    return this.mastery[trickId] ? this.mastery[trickId].streak || 0 : 0;
  }

  getMasteryLevel(streak) {
    if (streak >= 10) return { label: 'Grandmaster', badge: 'LVL 4', color: '#f59e0b' };
    if (streak >= 6) return { label: 'Master', badge: 'LVL 3', color: '#10b981' };
    if (streak >= 3) return { label: 'Apprentice', badge: 'LVL 2', color: '#6366f1' };
    return { label: 'Novice', badge: 'LVL 1', color: '#8b949e' };
  }

  initDOM() {
    this.container = document.getElementById('tricks-grid');
    this.searchInput = document.getElementById('trick-search');
    this.filterButtons = document.querySelectorAll('.trick-filter-btn');
    this.modal = document.getElementById('trick-modal');

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderGrid();
      });
    }

    if (this.filterButtons) {
      this.filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentCategory = btn.getAttribute('data-cat');
          this.renderGrid();
        });
      });
    }

    this.renderGrid();
  }

  renderGrid() {
    if (!this.container) return;

    const filtered = this.tricks.filter(t => {
      const matchCat = this.currentCategory === 'all' || t.category === this.currentCategory;
      const matchQuery = !this.searchQuery || 
        t.title.toLowerCase().includes(this.searchQuery) ||
        t.summary.toLowerCase().includes(this.searchQuery) ||
        t.category.toLowerCase().includes(this.searchQuery);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-tricks-state">
          <p>No mental math tricks found matching "${this.searchQuery}".</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = filtered.map(trick => {
      const streak = this.getTrickStreak(trick.id);
      const mastery = this.getMasteryLevel(streak);

      return `
        <div class="trick-card card" onclick="window.trickDojo.openTrick('${trick.id}')">
          <div class="trick-card-top">
            <span class="trick-cat-badge">${trick.category}</span>
            <span class="trick-mastery-tag" style="color: ${mastery.color}">
              ${mastery.badge} ${mastery.label} (${streak})
            </span>
          </div>
          <h3 class="trick-title">${trick.title}</h3>
          <p class="trick-summary">${trick.summary}</p>
          <div class="trick-card-bottom">
            <span class="trick-diff-badge diff-${trick.difficulty.toLowerCase()}">${trick.difficulty}</span>
            <span class="trick-open-link">Learn & Practice →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  openTrick(trickId) {
    const trick = this.tricks.find(t => t.id === trickId);
    if (!trick) return;

    this.activeTrick = trick;
    this.practiceStreak = this.getTrickStreak(trick.id);

    const titleElem = document.getElementById('trick-modal-title');
    const bodyElem = document.getElementById('trick-modal-body');

    if (titleElem) {
      titleElem.innerHTML = `<span>${trick.title}</span>`;
    }

    if (bodyElem) {
      bodyElem.innerHTML = `
        <div class="trick-detail-content">
          <!-- Overview Banner -->
          <div class="trick-banner">
            <span class="trick-badge">${trick.badge}</span>
            <p class="trick-summary-lg">${trick.summary}</p>
          </div>

          <!-- Rule & Formula -->
          <div class="trick-section">
            <h4 class="trick-heading">The Rule & Formula</h4>
            <div class="trick-formula-box">
              <code>${trick.formula}</code>
            </div>
            <p class="trick-rule-text">${trick.rule}</p>
          </div>

          <!-- Why it Works -->
          <div class="trick-section">
            <h4 class="trick-heading">Why It Works (Algebraic Insight)</h4>
            <div class="trick-why-box">
              <p>${trick.whyItWorks}</p>
            </div>
          </div>

          <!-- Step-by-Step Examples -->
          <div class="trick-section">
            <h4 class="trick-heading">Step-by-Step Examples</h4>
            <div class="trick-examples-grid">
              ${trick.examples.map((ex, idx) => `
                <div class="trick-example-card">
                  <div class="ex-header">Example ${idx + 1}: <strong>${ex.problem}</strong></div>
                  <ul class="ex-steps">
                    ${ex.steps.map(step => `<li>${step}</li>`).join('')}
                  </ul>
                  <div class="ex-answer">Answer: <strong>${ex.answer}</strong></div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Practice Arena -->
          <div class="trick-section practice-arena-section" id="trick-practice-section">
            <div class="practice-arena-header">
              <h4 class="trick-heading">Practice This Trick</h4>
              <div class="practice-streak-counter" id="practice-streak-tag">
                Streak: <strong>${this.practiceStreak}</strong>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-problem-display" id="practice-problem-text">Loading...</div>
              
              <div class="practice-input-row">
                <input 
                  type="text" 
                  id="practice-input" 
                  class="practice-input" 
                  placeholder="Type answer..." 
                  autocomplete="off"
                  oninput="window.trickDojo.onPracticeInput(this.value)"
                  onkeydown="if(event.key==='Enter') window.trickDojo.onPracticeEnter()"
                />
                <button class="btn btn-secondary" id="practice-hint-btn" onclick="window.trickDojo.toggleHint()">Show Steps</button>
              </div>

              <div id="practice-hint-box" class="practice-hint-box" style="display: none;"></div>
              <div id="practice-feedback" class="practice-feedback"></div>
            </div>
          </div>
        </div>
      `;

      // Render math formulas if KaTeX is loaded
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(bodyElem, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ]
          });
        } catch (e) {}
      }

      this.nextPracticeProblem();

      const pInput = document.getElementById('practice-input');
      if (pInput) {
        setTimeout(() => pInput.focus(), 250);
      }
    }

    if (this.modal) {
      this.modal.classList.add('active');
    }
  }

  closeModal() {
    if (this.advanceTimeout) {
      clearTimeout(this.advanceTimeout);
      this.advanceTimeout = null;
    }
    if (this.modal) {
      this.modal.classList.remove('active');
    }
    this.renderGrid();
  }

  nextPracticeProblem() {
    if (!this.activeTrick || !this.activeTrick.generateProblem) return;

    this.practiceProblem = this.activeTrick.generateProblem();
    const probDisplay = document.getElementById('practice-problem-text');
    const pInput = document.getElementById('practice-input');
    const hintBox = document.getElementById('practice-hint-box');
    const feedback = document.getElementById('practice-feedback');

    if (probDisplay) probDisplay.textContent = this.practiceProblem.problem;
    if (pInput) {
      pInput.value = '';
      pInput.disabled = false;
      pInput.classList.remove('flash-correct', 'shake');
      pInput.focus();
    }
    if (hintBox) {
      hintBox.style.display = 'none';
      hintBox.innerHTML = '';
    }
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'practice-feedback';
    }
  }

  toggleHint() {
    const hintBox = document.getElementById('practice-hint-box');
    if (!hintBox || !this.practiceProblem) return;

    if (hintBox.style.display === 'none') {
      hintBox.style.display = 'block';
      hintBox.innerHTML = `
        <strong>Step-by-step breakdown:</strong>
        <ul>
          ${this.practiceProblem.stepsHint.map(s => `<li>${s}</li>`).join('')}
        </ul>
      `;
    } else {
      hintBox.style.display = 'none';
    }
  }

  // INSTANT AUTO-EVALUATION AS USER TYPES (NO BUTTON PRESS REQUIRED)
  onPracticeInput(rawVal) {
    if (!this.practiceProblem) return;
    const userVal = rawVal.trim().toLowerCase();
    const targetVal = String(this.practiceProblem.answer).trim().toLowerCase();

    if (userVal.length === 0) return;

    if (userVal === targetVal) {
      this.triggerSuccess();
    }
  }

  onPracticeEnter() {
    const pInput = document.getElementById('practice-input');
    if (!pInput || !this.practiceProblem) return;

    const userVal = pInput.value.trim().toLowerCase();
    const targetVal = String(this.practiceProblem.answer).trim().toLowerCase();

    if (userVal === targetVal) {
      this.triggerSuccess();
    } else {
      // Wrong submission on Enter
      window.soundEngine.playWrong();
      this.practiceStreak = 0;
      const feedback = document.getElementById('practice-feedback');
      const streakTag = document.getElementById('practice-streak-tag');

      if (feedback) {
        feedback.textContent = `Incorrect. Correct answer: ${this.practiceProblem.answer}`;
        feedback.className = 'practice-feedback feedback-wrong';
      }
      if (streakTag) {
        streakTag.innerHTML = `Streak: <strong>0</strong>`;
      }
      pInput.classList.add('shake');
      setTimeout(() => pInput.classList.remove('shake'), 300);
      this.toggleHint();
    }
  }

  triggerSuccess() {
    const pInput = document.getElementById('practice-input');
    const feedback = document.getElementById('practice-feedback');
    const streakTag = document.getElementById('practice-streak-tag');

    window.soundEngine.playCorrect();
    this.practiceStreak++;

    if (!this.mastery[this.activeTrick.id]) {
      this.mastery[this.activeTrick.id] = { streak: 0, totalSolved: 0 };
    }
    this.mastery[this.activeTrick.id].streak = Math.max(
      this.mastery[this.activeTrick.id].streak || 0,
      this.practiceStreak
    );
    this.mastery[this.activeTrick.id].totalSolved = 
      (this.mastery[this.activeTrick.id].totalSolved || 0) + 1;
    this.saveMastery();

    if (pInput) {
      pInput.classList.add('flash-correct');
      pInput.disabled = true;
    }
    if (feedback) {
      feedback.textContent = 'Correct!';
      feedback.className = 'practice-feedback feedback-correct';
    }
    if (streakTag) {
      streakTag.innerHTML = `Streak: <strong>${this.practiceStreak}</strong>`;
    }

    // Auto-advance immediately without requiring user action
    this.advanceTimeout = setTimeout(() => {
      this.nextPracticeProblem();
    }, 350);
  }
}

// Global initialization
window.trickDojo = new TrickDojo();
