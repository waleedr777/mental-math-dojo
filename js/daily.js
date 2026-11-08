/**
 * Soromath Daily Quest (Daily Mental Math Challenge)
 * Generates a deterministic daily set of 10 problems with instant typing evaluation
 */
class DailyQuestManager {
  constructor() {
    this.todayStr = new Date().toISOString().slice(0, 10);
    this.history = this.loadHistory();
    this.streak = this.calculateStreak();
    this.problems = [];
    this.currentIndex = 0;
    this.score = 0;
    this.startTime = null;
    this.endTime = null;

    this.initProblems();
  }

  loadHistory() {
    try {
      return JSON.parse(localStorage.getItem('soromath_daily_history')) || {};
    } catch (e) {
      return {};
    }
  }

  saveHistory() {
    localStorage.setItem('soromath_daily_history', JSON.stringify(this.history));
  }

  calculateStreak() {
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const str = d.toISOString().slice(0, 10);
      if (this.history[str] && this.history[str].completed) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  }

  pseudoRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  initProblems() {
    let seed = 0;
    for (let i = 0; i < this.todayStr.length; i++) {
      seed = (seed * 31 + this.todayStr.charCodeAt(i)) % 1000000;
    }

    this.problems = [];
    const types = ['add', 'sub', 'mult', 'trick11', 'trickEnd5', 'div', 'percent'];

    for (let i = 0; i < 10; i++) {
      const r = this.pseudoRandom(seed + i * 7);
      const type = types[Math.floor(r * types.length)];

      if (type === 'trick11') {
        const num = Math.floor(this.pseudoRandom(seed + i * 13) * 80) + 12;
        this.problems.push({ display: `${num} × 11`, answer: num * 11, tag: 'Trick 11' });
      } else if (type === 'trickEnd5') {
        const c = [15, 25, 35, 45, 55, 65, 75, 85, 95];
        const num = c[Math.floor(this.pseudoRandom(seed + i * 17) * c.length)];
        this.problems.push({ display: `${num}²`, answer: num * num, tag: 'Square Ending in 5' });
      } else if (type === 'mult') {
        const a = Math.floor(this.pseudoRandom(seed + i * 19) * 20) + 6;
        const b = Math.floor(this.pseudoRandom(seed + i * 23) * 12) + 3;
        this.problems.push({ display: `${a} × ${b}`, answer: a * b, tag: 'Multiplication' });
      } else if (type === 'div') {
        const b = Math.floor(this.pseudoRandom(seed + i * 29) * 8) + 2;
        const ans = Math.floor(this.pseudoRandom(seed + i * 31) * 20) + 4;
        this.problems.push({ display: `${ans * b} ÷ ${b}`, answer: ans, tag: 'Division' });
      } else if (type === 'percent') {
        const base = 50;
        const p = (Math.floor(this.pseudoRandom(seed + i * 37) * 20) + 4) * 2;
        this.problems.push({ display: `${p}% of ${base}`, answer: (p * base) / 100, tag: 'Percentages' });
      } else if (type === 'sub') {
        const a = Math.floor(this.pseudoRandom(seed + i * 41) * 80) + 40;
        const b = Math.floor(this.pseudoRandom(seed + i * 43) * 35) + 12;
        this.problems.push({ display: `${a} - ${b}`, answer: a - b, tag: 'Subtraction' });
      } else {
        const a = Math.floor(this.pseudoRandom(seed + i * 47) * 70) + 25;
        const b = Math.floor(this.pseudoRandom(seed + i * 53) * 70) + 25;
        this.problems.push({ display: `${a} + ${b}`, answer: a + b, tag: 'Addition' });
      }
    }
  }

  isCompletedToday() {
    return !!(this.history[this.todayStr] && this.history[this.todayStr].completed);
  }

  startQuest() {
    this.currentIndex = 0;
    this.score = 0;
    this.startTime = Date.now();
    this.renderCurrentProblem();
  }

  renderCurrentProblem() {
    const display = document.getElementById('daily-problem-text');
    const input = document.getElementById('daily-input');
    const progressText = document.getElementById('daily-progress-text');
    const feedback = document.getElementById('daily-feedback');

    if (this.currentIndex >= this.problems.length) {
      this.finishQuest();
      return;
    }

    const prob = this.problems[this.currentIndex];
    if (progressText) {
      progressText.textContent = `Question ${this.currentIndex + 1} of ${this.problems.length}`;
    }
    if (display) {
      display.textContent = prob.display;
    }
    if (input) {
      input.value = '';
      input.disabled = false;
      input.classList.remove('flash-correct', 'shake');
      input.focus();
    }
    if (feedback) feedback.textContent = '';
  }

  // Instant check while typing
  onInput(val) {
    if (this.currentIndex >= this.problems.length) return;
    const userAns = val.trim().toLowerCase();
    const correctAns = String(this.problems[this.currentIndex].answer).trim().toLowerCase();

    if (userAns.length > 0 && userAns === correctAns) {
      this.handleCorrect();
    }
  }

  onEnter() {
    const input = document.getElementById('daily-input');
    if (!input || this.currentIndex >= this.problems.length) return;

    const userAns = input.value.trim().toLowerCase();
    const correctAns = String(this.problems[this.currentIndex].answer).trim().toLowerCase();

    if (userAns === correctAns) {
      this.handleCorrect();
    } else {
      window.soundEngine.playWrong();
      const feedback = document.getElementById('daily-feedback');
      if (feedback) {
        feedback.textContent = `Incorrect. Correct answer was ${correctAns}`;
        feedback.className = 'text-danger';
      }
      input.classList.add('shake');
      input.disabled = true;
      setTimeout(() => {
        this.currentIndex++;
        this.renderCurrentProblem();
      }, 700);
    }
  }

  handleCorrect() {
    const input = document.getElementById('daily-input');
    const feedback = document.getElementById('daily-feedback');

    window.soundEngine.playCorrect();
    this.score++;
    if (feedback) {
      feedback.textContent = 'Correct!';
      feedback.className = 'text-success';
    }
    if (input) {
      input.classList.add('flash-correct');
      input.disabled = true;
    }

    setTimeout(() => {
      this.currentIndex++;
      this.renderCurrentProblem();
    }, 300);
  }

  finishQuest() {
    this.endTime = Date.now();
    const timeTaken = Math.round((this.endTime - this.startTime) / 1000);

    window.soundEngine.playTrophy();

    this.history[this.todayStr] = {
      completed: true,
      score: this.score,
      time: timeTaken,
      date: this.todayStr
    };
    this.saveHistory();
    this.streak = this.calculateStreak();

    const display = document.getElementById('daily-problem-text');
    const inputRow = document.getElementById('daily-input-row');
    const resultBox = document.getElementById('daily-result-box');

    if (display) display.textContent = 'Daily Quest Complete';
    if (inputRow) inputRow.style.display = 'none';
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <h3>Score: ${this.score} / 10</h3>
        <p>Time Taken: ${timeTaken} seconds</p>
        <p>Current Streak: <strong>${this.streak} Days</strong></p>
        <p class="text-success">Come back tomorrow for the next workout.</p>
      `;
    }

    const streakElem = document.getElementById('header-streak-count');
    if (streakElem) streakElem.textContent = `${this.streak}d`;
  }
}

window.dailyQuestManager = new DailyQuestManager();
