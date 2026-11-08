/**
 * Soromath Audio Engine
 * Combines native wav assets with modern Web Audio API synthesizer fallbacks
 */
class SoundEngine {
  constructor() {
    this.muted = localStorage.getItem('soromath_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('soromath_volume') || '0.35');
    this.audioCtx = null;

    // Load wav elements
    this.wavClick = new Audio('flashanzaneqs/anzanclick.wav');
    this.wavCorrect = new Audio('flashanzaneqs/anzancorrect.wav');
    this.wavWrong = new Audio('flashanzaneqs/anzanwrong.wav');
    this.wavBeep = new Audio('flashanzaneqs/anzanbeep.wav');

    // Pre-set volumes
    [this.wavClick, this.wavCorrect, this.wavWrong, this.wavBeep].forEach(a => {
      a.volume = this.volume;
      a.preload = 'auto';
    });

    // Lazy init audio context on first user action
    const unlock = () => {
      this.initCtx();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
  }

  initCtx() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('soromath_muted', this.muted);
    return this.muted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('soromath_volume', this.volume);
    [this.wavClick, this.wavCorrect, this.wavWrong, this.wavBeep].forEach(a => {
      a.volume = this.volume;
    });
  }

  // Safe playback for clone
  safePlayWav(audio) {
    if (this.muted) return;
    try {
      const clone = audio.cloneNode();
      clone.volume = this.volume;
      const promise = clone.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Fallback handled via synth
        });
      }
    } catch (e) {}
  }

  playClick() {
    if (this.muted) return;
    this.safePlayWav(this.wavClick);
    this.synthClick();
  }

  playCorrect() {
    if (this.muted) return;
    this.safePlayWav(this.wavCorrect);
    this.synthChime([587.33, 880]); // D5, A5
  }

  playWrong() {
    if (this.muted) return;
    this.safePlayWav(this.wavWrong);
    this.synthBuzz(160);
  }

  playBeep() {
    if (this.muted) return;
    this.safePlayWav(this.wavBeep);
    this.synthTone(800, 0.08, 'sine');
  }

  playTick() {
    if (this.muted) return;
    this.synthTone(600, 0.03, 'sine');
  }

  playTrophy() {
    if (this.muted) return;
    this.synthChime([523.25, 659.25, 783.99, 1046.50]); // C5, E5, G5, C6
  }

  // --- Web Audio Synthesizer Fallbacks & Effects ---
  synthTone(freq, duration = 0.1, type = 'sine') {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  synthClick() {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.audioCtx.currentTime + 0.03);

      gain.gain.setValueAtTime(this.volume * 0.25, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.035);
    } catch (e) {}
  }

  synthChime(notes = [523.25, 659.25, 783.99]) {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

          gain.gain.setValueAtTime(this.volume * 0.25, this.audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.25);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start();
          osc.stop(this.audioCtx.currentTime + 0.25);
        } catch (e) {}
      }, idx * 60);
    });
  }

  synthBuzz(freq = 150) {
    if (this.muted) return;
    this.initCtx();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, this.audioCtx.currentTime + 0.18);

      gain.gain.setValueAtTime(this.volume * 0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.2);
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();
