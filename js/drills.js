/**
 * Soromath Speed Drills Engine
 * Full suite of mental math drill modes with instant typing evaluation
 */
class DrillEngine {
  constructor() {
    this.currentMode = 'multiplication';
    this.currentDifficulty = 'easy';
    this.testType = 'timed'; // 'timed' or 'problems'
    this.timeLimit = 60000; // ms
    this.problemLimit = 20;

    this.isRunning = false;
    this.timerInterval = null;
    this.startTime = null;
    this.endTime = null;
    this.timeRemaining = 60000;

    this.currentProblem = null;
    this.stats = {
      correct: 0,
      wrong: 0,
      totalChars: 0,
      wrongAnswers: []
    };

    this.liveCorrections = localStorage.getItem('soromath_live_corrections') !== 'false';
    this.voiceMode = localStorage.getItem('soromath_voice_mode') === 'true';

    this.initModes();
  }

  initModes() {
    this.modes = {
      addition: {
        name: 'Addition',
        generate: (diff) => {
          let min = 1, max = 9;
          if (diff === 'medium') { min = 10; max = 99; }
          if (diff === 'hard') { min = 100; max = 999; }
          const a = Math.floor(Math.random() * (max - min + 1)) + min;
          const b = Math.floor(Math.random() * (max - min + 1)) + min;
          return { display: `${a} + ${b}`, answer: a + b, text: `${a} plus ${b}` };
        }
      },
      subtraction: {
        name: 'Subtraction',
        generate: (diff) => {
          let min = 1, max = 9;
          if (diff === 'medium') { min = 10; max = 99; }
          if (diff === 'hard') { min = 100; max = 999; }
          let a = Math.floor(Math.random() * (max - min + 1)) + min;
          let b = Math.floor(Math.random() * (max - min + 1)) + min;
          if (a < b) [a, b] = [b, a];
          return { display: `${a} - ${b}`, answer: a - b, text: `${a} minus ${b}` };
        }
      },
      multiplication: {
        name: 'Multiplication',
        generate: (diff) => {
          let min = 2, max = 9;
          if (diff === 'medium') { min = 11; max = 49; }
          if (diff === 'hard') { min = 50; max = 150; }
          const a = Math.floor(Math.random() * (max - min + 1)) + min;
          const b = (diff === 'easy') 
            ? Math.floor(Math.random() * 8) + 2 
            : Math.floor(Math.random() * 15) + 3;
          return { display: `${a} × ${b}`, answer: a * b, text: `${a} times ${b}` };
        }
      },
      division: {
        name: 'Division',
        generate: (diff) => {
          let min = 2, max = 9;
          if (diff === 'medium') { min = 6; max = 25; }
          if (diff === 'hard') { min = 12; max = 60; }
          const divisor = Math.floor(Math.random() * (diff === 'easy' ? 8 : 15)) + 2;
          const quotient = Math.floor(Math.random() * (max - min + 1)) + min;
          const dividend = divisor * quotient;
          return { display: `${dividend} ÷ ${divisor}`, answer: quotient, text: `${dividend} divided by ${divisor}` };
        }
      },
      percentages: {
        name: 'Percentages',
        generate: () => {
          const percents = [5, 10, 15, 20, 25, 30, 40, 50, 75];
          const p = percents[Math.floor(Math.random() * percents.length)];
          const base = (Math.floor(Math.random() * 30) + 2) * 20;
          const ans = (base * p) / 100;
          return { display: `${p}% of ${base}`, answer: ans, text: `${p} percent of ${base}` };
        }
      },
      exponents: {
        name: 'Powers & Squares',
        generate: (diff) => {
          if (diff === 'easy') {
            const n = Math.floor(Math.random() * 20) + 2;
            return { display: `${n}²`, answer: n * n, text: `${n} squared` };
          }
          if (diff === 'medium') {
            const n = Math.floor(Math.random() * 30) + 15;
            return { display: `${n}²`, answer: n * n, text: `${n} squared` };
          }
          const bases = [2, 3, 5];
          const b = bases[Math.floor(Math.random() * bases.length)];
          const p = b === 2 ? Math.floor(Math.random() * 6) + 4 : Math.floor(Math.random() * 3) + 3;
          return { display: `${b}^${p}`, answer: Math.pow(b, p), text: `${b} to the power of ${p}` };
        }
      },
      roots: {
        name: 'Square Roots',
        generate: () => {
          const root = Math.floor(Math.random() * 25) + 3;
          const square = root * root;
          return { display: `√${square}`, answer: root, text: `square root of ${square}` };
        }
      },
      fractions: {
        name: 'Fraction Sums',
        generate: () => {
          const d1 = Math.floor(Math.random() * 4) + 2;
          const d2 = Math.floor(Math.random() * 4) + 3;
          if (d1 === d2) return { display: '1/2 + 1/4', answer: '3/4', text: 'one half plus one fourth' };
          const num = d2 + d1;
          const den = d1 * d2;
          return { display: `1/${d1} + 1/${d2}`, answer: `${num}/${den}`, text: `1 over ${d1} plus 1 over ${d2}` };
        }
      },
      linear: {
        name: 'Linear Equations',
        generate: () => {
          const a = Math.floor(Math.random() * 7) + 2;
          const x = Math.floor(Math.random() * 12) + 1;
          const b = Math.floor(Math.random() * 20) + 1;
          const c = a * x + b;
          return { display: `${a}x + ${b} = ${c}`, answer: x, text: `${a} x plus ${b} equals ${c}, find x` };
        }
      },
      day_of_week: {
        name: 'Day of the Week',
        generate: () => {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const y = Math.floor(Math.random() * 20) + 2010;
          const m = Math.floor(Math.random() * 12);
          const d = Math.floor(Math.random() * 28) + 1;
          const date = new Date(y, m, d);
          return { 
            display: `${months[m]} ${d}, ${y}`, 
            answer: days[date.getDay()],
            text: `${months[m]} ${d}, ${y}` 
          };
        }
      },
      binary_to_dec: {
        name: 'Binary to Decimal',
        generate: () => {
          const dec = Math.floor(Math.random() * 63) + 1;
          const bin = dec.toString(2);
          return { display: `Bin: ${bin}`, answer: dec, text: `Binary ${bin} to decimal` };
        }
      },
      dec_to_binary: {
        name: 'Decimal to Binary',
        generate: () => {
          const dec = Math.floor(Math.random() * 31) + 1;
          const bin = dec.toString(2);
          return { display: `Dec: ${dec}`, answer: bin, text: `Decimal ${dec} to binary` };
        }
      },
      c_to_f: {
        name: '°C to °F',
        generate: () => {
          const c = (Math.floor(Math.random() * 10) + 1) * 5;
          const f = (c * 9) / 5 + 32;
          return { display: `${c}°C to °F`, answer: f, text: `${c} degrees celsius to fahrenheit` };
        }
      }
    };
  }

  setMode(modeKey) {
    if (this.modes[modeKey]) {
      this.currentMode = modeKey;
      this.resetTest();
    }
  }

  setDifficulty(diff) {
    this.currentDifficulty = diff;
    this.resetTest();
  }

  setTimeLimit(seconds) {
    this.testType = 'timed';
    this.timeLimit = seconds * 1000;
    this.resetTest();
  }

  setProblemLimit(count) {
    this.testType = 'problems';
    this.problemLimit = count;
    this.resetTest();
  }

  toggleLiveCorrections(val) {
    this.liveCorrections = val;
    localStorage.setItem('soromath_live_corrections', val);
  }

  toggleVoiceMode(val) {
    this.voiceMode = val;
    localStorage.setItem('soromath_voice_mode', val);
    if (val && this.currentProblem) {
      window.speechEngine.speak(this.currentProblem.text || this.currentProblem.display);
    }
  }

  resetTest() {
    this.stopTest();
    this.stats = { correct: 0, wrong: 0, totalChars: 0, wrongAnswers: [] };
    this.timeRemaining = this.timeLimit;
    this.updateStatsUI();
    this.nextProblem();

    const input = document.getElementById('drill-input');
    if (input) {
      input.value = '';
      input.disabled = false;
      input.focus();
    }

    const finishScreen = document.getElementById('drill-finish-screen');
    if (finishScreen) finishScreen.style.display = 'none';

    const timerBar = document.getElementById('drill-timer-bar');
    if (timerBar) timerBar.style.width = '100%';

    const timerText = document.getElementById('drill-timer-text');
    if (timerText) {
      if (this.testType === 'timed') {
        timerText.textContent = `${Math.ceil(this.timeLimit / 1000)}s`;
      } else {
        timerText.textContent = `0 / ${this.problemLimit}`;
      }
    }
  }

  startTest() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = Date.now();

    if (this.testType === 'timed') {
      const startAt = Date.now();
      this.timerInterval = setInterval(() => {
        const elapsed = Date.now() - startAt;
        this.timeRemaining = Math.max(0, this.timeLimit - elapsed);

        const timerBar = document.getElementById('drill-timer-bar');
        const timerText = document.getElementById('drill-timer-text');

        const pct = (this.timeRemaining / this.timeLimit) * 100;
        if (timerBar) timerBar.style.width = `${pct}%`;
        if (timerText) timerText.textContent = `${Math.ceil(this.timeRemaining / 1000)}s`;

        if (this.timeRemaining <= 0) {
          this.finishTest();
        }
      }, 100);
    }
  }

  stopTest() {
    this.isRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  nextProblem() {
    const modeObj = this.modes[this.currentMode] || this.modes.multiplication;
    this.currentProblem = modeObj.generate(this.currentDifficulty);

    const probElem = document.getElementById('drill-problem-display');
    if (probElem) {
      probElem.textContent = this.currentProblem.display;
    }

    if (this.voiceMode) {
      window.speechEngine.speak(this.currentProblem.text || this.currentProblem.display);
    }
  }

  // INSTANT AUTO-EVALUATION WHILE TYPING
  handleInput(inputVal) {
    if (!this.isRunning && inputVal.length > 0) {
      this.startTest();
    }

    if (!this.currentProblem) return;

    const userAns = inputVal.trim().toLowerCase();
    const correctAns = String(this.currentProblem.answer).trim().toLowerCase();

    // Instant match! No need to press enter or answer button
    if (userAns.length > 0 && userAns === correctAns) {
      this.recordSuccess(correctAns);
    }
  }

  // Called if user hits Enter to submit (e.g. to skip or submit wrong answer)
  checkAnswer() {
    const input = document.getElementById('drill-input');
    const correctionElem = document.getElementById('drill-live-correction');
    if (!input || !this.currentProblem) return;

    const userAns = input.value.trim().toLowerCase();
    const correctAns = String(this.currentProblem.answer).trim().toLowerCase();

    if (userAns.length === 0) return;

    if (userAns === correctAns) {
      this.recordSuccess(correctAns);
    } else {
      // Wrong answer on enter
      window.soundEngine.playWrong();
      this.stats.wrong++;
      this.stats.wrongAnswers.push({
        problem: this.currentProblem.display,
        userAns: userAns,
        correctAns: correctAns
      });

      input.value = '';
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 300);

      if (this.liveCorrections && correctionElem) {
        correctionElem.textContent = `Correction: ${this.currentProblem.display} = ${this.currentProblem.answer}`;
        correctionElem.style.display = 'block';
      }

      this.updateStatsUI();
      this.checkLimitsAndAdvance();
    }
  }

  recordSuccess(correctAns) {
    const input = document.getElementById('drill-input');
    const correctionElem = document.getElementById('drill-live-correction');

    window.soundEngine.playCorrect();
    this.stats.correct++;
    this.stats.totalChars += correctAns.length;

    if (input) {
      input.value = '';
      input.classList.remove('shake');
      input.classList.add('flash-correct');
      setTimeout(() => input.classList.remove('flash-correct'), 200);
    }
    if (correctionElem) correctionElem.style.display = 'none';

    this.updateStatsUI();
    this.checkLimitsAndAdvance();
  }

  checkLimitsAndAdvance() {
    if (this.testType === 'problems') {
      const totalAttempted = this.stats.correct + this.stats.wrong;
      const timerText = document.getElementById('drill-timer-text');
      if (timerText) timerText.textContent = `${totalAttempted} / ${this.problemLimit}`;

      if (totalAttempted >= this.problemLimit) {
        this.finishTest();
        return;
      }
    }
    this.nextProblem();
  }

  updateStatsUI() {
    const cCount = document.getElementById('drill-stat-correct');
    const wCount = document.getElementById('drill-stat-wrong');
    const accElem = document.getElementById('drill-stat-acc');

    if (cCount) cCount.textContent = this.stats.correct;
    if (wCount) wCount.textContent = this.stats.wrong;

    const total = this.stats.correct + this.stats.wrong;
    const acc = total > 0 ? Math.round((this.stats.correct / total) * 100) : 100;
    if (accElem) accElem.textContent = `${acc}%`;
  }

  finishTest() {
    this.stopTest();
    this.endTime = Date.now();

    window.soundEngine.playTrophy();

    const durationSec = Math.max(1, Math.round((this.endTime - this.startTime) / 1000));
    const cpm = Math.round((this.stats.correct / durationSec) * 60);
    const rawCpm = Math.round(((this.stats.correct + this.stats.wrong) / durationSec) * 60);
    const total = this.stats.correct + this.stats.wrong;
    const acc = total > 0 ? Math.round((this.stats.correct / total) * 100) : 100;

    // Record in global stats manager
    if (window.statsManager) {
      window.statsManager.recordTest({
        mode: this.currentMode,
        difficulty: this.currentDifficulty,
        correct: this.stats.correct,
        wrong: this.stats.wrong,
        duration: durationSec,
        cpm: cpm,
        accuracy: acc,
        date: new Date().toISOString()
      });
    }

    // Populate Finish Screen
    const finishScreen = document.getElementById('drill-finish-screen');
    const resCpm = document.getElementById('finish-cpm');
    const resRawCpm = document.getElementById('finish-raw-cpm');
    const resAcc = document.getElementById('finish-accuracy');
    const resCorrect = document.getElementById('finish-correct');
    const resWrong = document.getElementById('finish-wrong');
    const resMistakesList = document.getElementById('finish-mistakes-list');

    if (resCpm) resCpm.textContent = `${cpm} CPM`;
    if (resRawCpm) resRawCpm.textContent = `${rawCpm} raw`;
    if (resAcc) resAcc.textContent = `${acc}%`;
    if (resCorrect) resCorrect.textContent = `${this.stats.correct}`;
    if (resWrong) resWrong.textContent = `${this.stats.wrong}`;

    if (resMistakesList) {
      if (this.stats.wrongAnswers.length === 0) {
        resMistakesList.innerHTML = '<p class="text-success">Flawless run! Zero mistakes.</p>';
      } else {
        resMistakesList.innerHTML = `
          <h4>Mistake Breakdown:</h4>
          <ul>
            ${this.stats.wrongAnswers.map(m => `
              <li>${m.problem} — Entered ${m.userAns} (Correct: <strong>${m.correctAns}</strong>)</li>
            `).join('')}
          </ul>
        `;
      }
    }

    if (finishScreen) finishScreen.style.display = 'flex';
  }
}

window.drillEngine = new DrillEngine();
