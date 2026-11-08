/**
 * Soromath Flash Anzan Engine (Mental Abacus Flasher)
 * Instant evaluation upon typing the correct sum
 */
class FlashAnzanEngine {
  constructor() {
    this.speed = parseFloat(localStorage.getItem('soromath_anzan_speed') || '0.7');
    this.amount = parseInt(localStorage.getItem('soromath_anzan_amount') || '7', 10);
    this.digits = parseInt(localStorage.getItem('soromath_anzan_digits') || '1', 10);
    this.allowNegative = false;

    this.isRunning = false;
    this.numbers = [];
    this.currentIndex = 0;
    this.targetSum = 0;
    this.intervalId = null;

    this.syncSoroban = true;
  }

  setSpeed(s) {
    this.speed = s;
    localStorage.setItem('soromath_anzan_speed', s);
  }

  setAmount(a) {
    this.amount = a;
    localStorage.setItem('soromath_anzan_amount', a);
  }

  setDigits(d) {
    this.digits = d;
    localStorage.setItem('soromath_anzan_digits', d);
  }

  generateNumbers() {
    this.numbers = [];
    this.targetSum = 0;

    let min = Math.pow(10, this.digits - 1);
    let max = Math.pow(10, this.digits) - 1;
    if (this.digits === 1) min = 1;

    for (let i = 0; i < this.amount; i++) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (this.allowNegative && i > 0 && Math.random() > 0.6 && (this.targetSum - num) > 0) {
        num = -num;
      }
      this.numbers.push(num);
      this.targetSum += num;
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.generateNumbers();
    this.currentIndex = 0;

    const display = document.getElementById('anzan-display-text');
    const startBtn = document.getElementById('anzan-start-btn');
    const inputArea = document.getElementById('anzan-input-area');
    const feedback = document.getElementById('anzan-feedback');

    if (startBtn) startBtn.style.display = 'none';
    if (inputArea) inputArea.style.display = 'none';
    if (feedback) feedback.textContent = '';

    if (display) display.textContent = 'Ready';
    window.soundEngine.playBeep();

    setTimeout(() => {
      display.textContent = '3';
      window.soundEngine.playTick();
    }, 400);

    setTimeout(() => {
      display.textContent = '2';
      window.soundEngine.playTick();
    }, 900);

    setTimeout(() => {
      display.textContent = '1';
      window.soundEngine.playTick();
    }, 1400);

    setTimeout(() => {
      this.runFlashLoop();
    }, 1900);
  }

  runFlashLoop() {
    const display = document.getElementById('anzan-display-text');
    const flashInterval = this.speed * 1000;

    this.intervalId = setInterval(() => {
      if (this.currentIndex >= this.numbers.length) {
        clearInterval(this.intervalId);
        this.finishFlashing();
        return;
      }

      const num = this.numbers[this.currentIndex];
      if (display) display.innerHTML = '&nbsp;';

      setTimeout(() => {
        if (display) {
          display.textContent = (num > 0 && this.allowNegative ? '+' : '') + num;
        }
        window.soundEngine.playClick();

        if (this.syncSoroban && window.sorobanAbacus) {
          window.sorobanAbacus.setNumber(num);
        }
      }, 60);

      this.currentIndex++;
    }, flashInterval);
  }

  finishFlashing() {
    this.isRunning = false;
    const display = document.getElementById('anzan-display-text');
    const inputArea = document.getElementById('anzan-input-area');
    const input = document.getElementById('anzan-answer-input');

    if (display) display.textContent = 'Sum?';
    if (inputArea) inputArea.style.display = 'flex';
    if (input) {
      input.value = '';
      input.disabled = false;
      input.focus();
    }
  }

  onInput(val) {
    if (this.isRunning) return;
    const trimmed = val.trim();
    if (trimmed.length === 0) return;

    const userAns = parseInt(trimmed, 10);
    if (!isNaN(userAns) && userAns === this.targetSum) {
      this.checkAnswer();
    }
  }

  checkAnswer() {
    const input = document.getElementById('anzan-answer-input');
    const feedback = document.getElementById('anzan-feedback');
    const startBtn = document.getElementById('anzan-start-btn');
    if (!input) return;

    const userAns = parseInt(input.value.trim(), 10);

    if (userAns === this.targetSum) {
      window.soundEngine.playCorrect();
      if (feedback) {
        feedback.textContent = `Correct! Sum is ${this.targetSum}.`;
        feedback.className = 'anzan-feedback text-success';
      }
    } else {
      window.soundEngine.playWrong();
      if (feedback) {
        feedback.textContent = `Incorrect. The actual sum was ${this.targetSum}.`;
        feedback.className = 'anzan-feedback text-danger';
      }
    }

    input.disabled = true;
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.textContent = 'Next Flash Anzan';
      startBtn.focus();
    }
  }

  reset() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.isRunning = false;
    const display = document.getElementById('anzan-display-text');
    const startBtn = document.getElementById('anzan-start-btn');
    const inputArea = document.getElementById('anzan-input-area');
    const feedback = document.getElementById('anzan-feedback');

    if (display) display.textContent = 'Press Start';
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.textContent = 'Start Flash Anzan';
    }
    if (inputArea) inputArea.style.display = 'none';
    if (feedback) feedback.textContent = '';
  }
}

window.flashAnzanEngine = new FlashAnzanEngine();
