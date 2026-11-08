/**
 * Soromath Speech Engine (TTS & Voice Input)
 */
class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.recognition = null;
    this.voiceActive = false;
    this.speechLang = localStorage.getItem('soromath_speech_lang') || 'en-US';
    this.speechRate = parseFloat(localStorage.getItem('soromath_speech_rate') || '1.1');
    this.isListening = false;
    this.onResultCallback = null;

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = this.speechLang;

        this.recognition.onresult = (event) => {
          const last = event.results.length - 1;
          const transcript = event.results[last][0].transcript.trim().toLowerCase();
          this.handleSpeechResult(transcript);
        };

        this.recognition.onerror = () => {
          this.isListening = false;
        };

        this.recognition.onend = () => {
          if (this.voiceActive) {
            try {
              this.recognition.start();
            } catch (e) {}
          } else {
            this.isListening = false;
          }
        };
      } catch (e) {}
    }
  }

  handleSpeechResult(transcript) {
    // Map words to numbers: "forty two" -> 42, "negative five" -> -5
    let cleaned = transcript
      .replace(/minus|negative/g, '-')
      .replace(/plus/g, '+')
      .replace(/zero/g, '0')
      .replace(/one/g, '1')
      .replace(/two/g, '2')
      .replace(/three/g, '3')
      .replace(/four/g, '4')
      .replace(/five/g, '5')
      .replace(/six/g, '6')
      .replace(/seven/g, '7')
      .replace(/eight/g, '8')
      .replace(/nine/g, '9')
      .replace(/ten/g, '10')
      .replace(/[^0-9\-.]/g, '');

    if (this.onResultCallback && cleaned.length > 0) {
      this.onResultCallback(cleaned);
    }
  }

  speak(text) {
    if (!this.synth) return;
    this.synth.cancel();

    // Natural speech pronunciation for math symbols
    const spokenText = String(text)
      .replace(/\*/g, ' times ')
      .replace(/x/g, ' times ')
      .replace(/×/g, ' times ')
      .replace(/\+/g, ' plus ')
      .replace(/÷/g, ' divided by ')
      .replace(/\//g, ' over ')
      .replace(/-/g, ' minus ')
      .replace(/=/g, ' equals ')
      .replace(/\^2/g, ' squared ')
      .replace(/\^3/g, ' cubed ');

    const utter = new SpeechSynthesisUtterance(spokenText);
    utter.lang = this.speechLang;
    utter.rate = this.speechRate;
    this.synth.speak(utter);
  }

  stopSpeaking() {
    if (this.synth) this.synth.cancel();
  }

  startListening(callback) {
    this.onResultCallback = callback;
    if (this.recognition && !this.isListening) {
      try {
        this.voiceActive = true;
        this.recognition.start();
        this.isListening = true;
      } catch (e) {}
    }
  }

  stopListening() {
    this.voiceActive = false;
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }
}

window.speechEngine = new SpeechEngine();
