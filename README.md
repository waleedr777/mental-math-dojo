# Soromath 2.0 🧮⚡

> **Modernized Mental Math, Trick Dojo & Flash Anzan Trainer**  
> Inspired by and evolved from [WarpRomo/soromath](https://github.com/WarpRomo/soromath).

Soromath 2.0 takes mental math training to the next level with a brand-new **Mental Math Tricks Dojo**, an **Interactive Japanese Soroban Abacus**, a **Daily Mental Math Quest**, **Chart.js Performance Analytics**, and a **Custom Theme Studio**.

---

## 🌟 What's New & Improved

### 1. 🧠 The Mental Math Tricks Dojo
A dedicated encyclopedia and interactive training ground covering **28 real-world mental math techniques** across:
- **✖️ Multiplication**:
  - Multiply 2-Digit Numbers by 11 *(The Sandwich Method & carry handling)*
  - Squaring Numbers Ending in 5 *(e.g. $75^2 = 5625$)*
  - Multiply by 5, 25, 50, and 125 *(Divide & Shift technique)*
  - Difference of Squares *(Symmetric Distance multiplication)*
  - Squaring Numbers Near 50 *(Base 25 method)*
  - Vedic Nikhilam Near 100 *(Cross-subtraction of deficits)*
  - Matching Tens & Units Adding to 10 *(Vedic Sutra)*
  - Double and Halve Strategy *(Rebalancing even × ends-in-5)*
  - Multiply by 9, 99, 999 *(Base-10 and base-100 offsets)*
  - Multiplying Teens (11 to 19)
  - Multiplying 2-Digit Numbers by 101 *(Double repeat)*
  - Multiplying by 12 *(Shift and double)*
  - Universal Squaring for any 2-digit number
- **➕ Addition**:
  - Left-to-Right Addition *(Front-end mental accumulation)*
  - Making Round Numbers *(Compensation & friendly numbers)*
  - Break and Jump *(Sequential tens & units hopping)*
  - Complements to 100 and 1000 *(Pair matching)*
- **➖ Subtraction**:
  - All from 9 and Last from 10 *(Nikhilam Sutra for powers of 10)*
  - Equal Addition / Same Change Rule *(Zero-borrowing shift)*
  - Cashier's Algorithm *(Counting upwards in friendly strides)*
  - Left-to-Right Subtraction
- **➗ Division**:
  - Dividing by 5, 25, 50 *(Double and slide decimal point)*
  - Chunking / Partition Division *(Friendly chunk decomposition)*
  - Successive Halving for Even Divisors
  - Divisibility Tests for 3 and 9 *(Digit sum tests)*
- **✨ Special Shortcuts**:
  - Reversible Percentages *($x\% \text{ of } y = y\% \text{ of } x$, e.g. 16% of 25 = 25% of 16 = 4)*
  - Fraction Butterfly Method *(Cross-multiplication sum)*
  - Calendar Math / Doomsday Weekday Shortcut *(Modulo 7 date computation)*

#### 🎯 For Every Trick:
1. **Clear Rule & LaTeX Formula**: Rendered cleanly using KaTeX math notation.
2. **Why It Works (The Algebra Secret)**: Concise algebraic insight behind the shortcut.
3. **Interactive Step-by-Step Examples**: Step-by-step walkthroughs.
4. **"Practice This Trick" Arena**:
   - Generates randomized problems crafted **specifically** for that trick.
   - **💡 Interactive Step-by-Step Hint** button reveals tailored hints if you get stuck.
   - **Mastery Streak Counter**: Novice 🌱 $\rightarrow$ Apprentice ⚡ $\rightarrow$ Master 🧠 $\rightarrow$ Grandmaster 🏆.

---

### 2. ⚡ Speed Drills
- **13 Operations Supported**: Addition, Subtraction, Multiplication, Division, Percentages, Exponents/Powers, Square Roots, Fractions, Linear Equations, Day of the Week, Binary to Decimal, Decimal to Binary, °C to °F.
- **Timing & Count Options**: 15s, 30s, 60s, 120s timed drills OR 10, 25, 50 problem quotas.
- **Immediate Feedback**: Live correction banner, error shake animation, and correct pulse.
- **Post-Test Breakdown**: CPM (Correct Per Minute), Raw CPM, Accuracy %, and a list of all mistake items for review.

---

### 3. 🧮 Flash Anzan & Interactive Soroban
- **Flash Anzan Calculation**:
  - Numbers flash sequentially at custom speeds (0.3s to 1.5s).
  - Configurable problem count (3 to 15 numbers) and digits (1 to 3 digits).
  - Sound effects on each number flash.
- **Interactive Soroban Abacus**:
  - Authentic 5-rod Japanese Abacus with 1 upper Heaven bead (value 5) and 4 lower Earth beads (value 1).
  - Click beads to toggle them up or down; calculates total bead value in real-time.
  - Can automatically mirror numbers flashing in Flash Anzan!

---

### 4. 🎯 Daily Mental Math Quest
- A calendar-seeded, deterministic 10-problem daily challenge.
- Maintains and displays your **Daily Streak 🔥**.

---

### 5. 📊 Analytics, CPM Charts & Achievements
- **Chart.js Integration**: Plots CPM and accuracy trends over your last 25 tests.
- **Personal Best Tracker**: Tracks PB CPM, total solved problems, and overall accuracy.
- **Achievement Badges**: Unlocks badges like *First Step*, *Century Club*, *Speed Demon*, *Mental Prodigy*, and *Grandmaster of Tricks*.

---

### 6. 🎨 Themes & Custom Theme Studio
- **8 Built-in Themes**:
  - 🌑 Obsidian Dark (Default modern dark)
  - 💻 Matrix Terminal (Green phosphor terminal)
  - 🌸 Sakura Blossom (Pastel dark pink/purple)
  - 🌊 Deep Ocean (Neon cyan and cobalt)
  - ⚡ Cyberpunk Neon (Yellow and violet)
  - 🔥 Solar Flare (Magma orange and amber)
  - 🔮 Amethyst Night (Deep royal purple)
  - ❄️ Nordic Clean (Crisp minimalist light theme)
- **Custom Theme Studio**: Full color picker controls for Background, Cards, Borders, Text, Accents, and Typography.

---

### 7. 🔊 Sound & Voice Math
- **Dual Audio Engine**: Uses native audio samples with a Web Audio API synthesizer fallback.
- **Speech Synthesis (TTS)**: Can read math problems aloud in natural phrasing.
- **Speech Recognition (Voice Input)**: Speak answers aloud.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Enter` | Submit answer in active input |
| `Esc` | Close modal or reset current drill |
| `R` | Restart speed drill |
| `Space` | Start / Restart Flash Anzan |
| `Tab` | Navigate interactive inputs |

---

## 🚀 How to Run

Simply open `index.html` in any web browser!

Or launch a local development server with Python:

```bash
# In the project directory:
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser.
