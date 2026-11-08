/**
 * Interactive Japanese Soroban Abacus
 * 1 Heaven bead (value 5) & 4 Earth beads (value 1) per rod
 */
class SorobanAbacus {
  constructor(containerId, rodsCount = 5) {
    this.container = document.getElementById(containerId);
    this.rodsCount = rodsCount;
    // Each rod: { upper: 0 or 1, lower: 0 to 4 }
    this.state = Array.from({ length: rodsCount }, () => ({ upper: 0, lower: 0 }));
    this.onChangeCallback = null;
    this.render();
  }

  setNumber(num) {
    const s = String(Math.abs(Math.floor(num))).padStart(this.rodsCount, '0');
    const startIdx = Math.max(0, s.length - this.rodsCount);
    const cropped = s.slice(startIdx);

    for (let i = 0; i < this.rodsCount; i++) {
      const digit = parseInt(cropped[i], 10) || 0;
      this.state[i].upper = digit >= 5 ? 1 : 0;
      this.state[i].lower = digit % 5;
    }
    this.render();
  }

  getValue() {
    let total = 0;
    for (let i = 0; i < this.rodsCount; i++) {
      const digit = this.state[i].upper * 5 + this.state[i].lower;
      total = total * 10 + digit;
    }
    return total;
  }

  reset() {
    this.state = Array.from({ length: this.rodsCount }, () => ({ upper: 0, lower: 0 }));
    this.render();
  }

  toggleUpper(rodIdx) {
    this.state[rodIdx].upper = this.state[rodIdx].upper === 1 ? 0 : 1;
    window.soundEngine.playClick();
    this.render();
    if (this.onChangeCallback) this.onChangeCallback(this.getValue());
  }

  setLower(rodIdx, count) {
    if (this.state[rodIdx].lower === count) {
      this.state[rodIdx].lower = count - 1;
    } else {
      this.state[rodIdx].lower = count;
    }
    window.soundEngine.playClick();
    this.render();
    if (this.onChangeCallback) this.onChangeCallback(this.getValue());
  }

  render() {
    if (!this.container) return;

    let html = `
      <div class="soroban-frame">
        <div class="soroban-reckoning-beam"></div>
        <div class="soroban-rods-container">
    `;

    for (let i = 0; i < this.rodsCount; i++) {
      const { upper, lower } = this.state[i];
      const digit = upper * 5 + lower;

      html += `
        <div class="soroban-rod">
          <div class="soroban-rod-line"></div>

          <!-- Upper Deck (Heaven Bead: 5) -->
          <div class="soroban-deck soroban-upper-deck">
            <div class="soroban-bead upper-bead ${upper === 1 ? 'bead-active' : ''}" 
                 onclick="window.sorobanAbacus.toggleUpper(${i})">
            </div>
          </div>

          <!-- Beam Spacer with reckoning dot -->
          <div class="soroban-beam-node ${i === this.rodsCount - 1 || i === this.rodsCount - 4 ? 'unit-dot' : ''}"></div>

          <!-- Lower Deck (4 Earth Beads: 1 each) -->
          <div class="soroban-deck soroban-lower-deck">
            ${[1, 2, 3, 4].map(idx => `
              <div class="soroban-bead lower-bead ${lower >= idx ? 'bead-active' : ''}" 
                   onclick="window.sorobanAbacus.setLower(${i}, ${idx})">
              </div>
            `).join('')}
          </div>

          <!-- Digit Display -->
          <div class="soroban-digit">${digit}</div>
        </div>
      `;
    }

    html += `
        </div>
      </div>
      <div class="soroban-value-readout">
        Total Value: <strong>${this.getValue()}</strong>
      </div>
    `;

    this.container.innerHTML = html;
  }
}

window.SorobanAbacus = SorobanAbacus;
