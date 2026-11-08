/**
 * Soromath Analytics, CPM Graph, and Achievements System
 */
class StatsManager {
  constructor() {
    this.history = this.loadHistory();
    this.chart = null;
    this.achievements = [
      { id: 'first_drill', title: 'First Step', code: '1ST', desc: 'Complete your first math drill.' },
      { id: 'century', title: 'Century Club', code: '100', desc: 'Solve 100 problems in total.' },
      { id: 'speed_demon', title: 'Speed Demon', code: '40+', desc: 'Reach 40 CPM in any mode.' },
      { id: 'math_wizard', title: 'Mental Prodigy', code: '70+', desc: 'Reach 70 CPM in any mode.' },
      { id: 'trick_initiate', title: 'Trick Apprentice', code: 'TRK', desc: 'Master at least 3 mental math tricks.' },
      { id: 'trick_grandmaster', title: 'Grandmaster of Tricks', code: 'MAS', desc: 'Master 10 or more mental math tricks.' },
      { id: 'streak_3', title: 'Habit Builder', code: 'STR', desc: 'Maintain a 3-day daily quest streak.' }
    ];
  }

  loadHistory() {
    try {
      return JSON.parse(localStorage.getItem('soromath_test_history')) || [];
    } catch (e) {
      return [];
    }
  }

  saveHistory() {
    localStorage.setItem('soromath_test_history', JSON.stringify(this.history));
  }

  recordTest(run) {
    this.history.push(run);
    if (this.history.length > 150) {
      this.history.shift();
    }
    this.saveHistory();
    this.checkAchievements();
  }

  getPBs() {
    let maxCpm = 0;
    let totalCorrect = 0;
    let totalAttempts = 0;
    let totalTests = this.history.length;

    this.history.forEach(h => {
      if (h.cpm > maxCpm) maxCpm = h.cpm;
      totalCorrect += (h.correct || 0);
      totalAttempts += ((h.correct || 0) + (h.wrong || 0));
    });

    const overallAcc = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100;
    return {
      maxCpm,
      totalCorrect,
      totalTests,
      overallAcc
    };
  }

  updateTrickMasteryCount() {
    const mastery = JSON.parse(localStorage.getItem('soromath_trick_mastery') || '{}');
    let masteredCount = 0;
    Object.keys(mastery).forEach(k => {
      if (mastery[k].streak >= 6) masteredCount++;
    });

    const badgeElem = document.getElementById('header-tricks-count');
    if (badgeElem) badgeElem.textContent = `${masteredCount} Mastered`;

    this.checkAchievements();
  }

  checkAchievements() {
    const unlocked = JSON.parse(localStorage.getItem('soromath_achievements') || '[]');
    const pbs = this.getPBs();
    const mastery = JSON.parse(localStorage.getItem('soromath_trick_mastery') || '{}');
    let masteredTricks = 0;
    Object.keys(mastery).forEach(k => {
      if (mastery[k].streak >= 6) masteredTricks++;
    });

    const dailyStreak = window.dailyQuestManager ? window.dailyQuestManager.streak : 0;

    const toUnlock = [];

    if (pbs.totalTests >= 1) toUnlock.push('first_drill');
    if (pbs.totalCorrect >= 100) toUnlock.push('century');
    if (pbs.maxCpm >= 40) toUnlock.push('speed_demon');
    if (pbs.maxCpm >= 70) toUnlock.push('math_wizard');
    if (masteredTricks >= 3) toUnlock.push('trick_initiate');
    if (masteredTricks >= 10) toUnlock.push('trick_grandmaster');
    if (dailyStreak >= 3) toUnlock.push('streak_3');

    let newlyUnlocked = false;
    toUnlock.forEach(id => {
      if (!unlocked.includes(id)) {
        unlocked.push(id);
        newlyUnlocked = true;
        const ach = this.achievements.find(a => a.id === id);
        if (ach && window.app) {
          window.app.showToast(`Achievement Unlocked: ${ach.title}`, 'toast-success');
        }
      }
    });

    if (newlyUnlocked) {
      localStorage.setItem('soromath_achievements', JSON.stringify(unlocked));
    }
  }

  renderStatsTab() {
    const pbs = this.getPBs();
    const pbElem = document.getElementById('stats-pb-cpm');
    const testsElem = document.getElementById('stats-total-tests');
    const solvedElem = document.getElementById('stats-total-solved');
    const accElem = document.getElementById('stats-overall-acc');

    if (pbElem) pbElem.textContent = `${pbs.maxCpm} CPM`;
    if (testsElem) testsElem.textContent = `${pbs.totalTests}`;
    if (solvedElem) solvedElem.textContent = `${pbs.totalCorrect}`;
    if (accElem) accElem.textContent = `${pbs.overallAcc}%`;

    this.renderChart();
    this.renderAchievementsGrid();
  }

  renderChart() {
    const canvas = document.getElementById('stats-cpm-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    const runs = this.history.slice(-25);

    const labels = runs.map((_, idx) => `#${idx + 1}`);
    const dataCpm = runs.map(r => r.cpm);

    if (this.chart) {
      this.chart.destroy();
    }

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6366f1';

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length > 0 ? labels : ['No tests yet'],
        datasets: [
          {
            label: 'CPM (Correct Per Min)',
            data: dataCpm.length > 0 ? dataCpm : [0],
            borderColor: accentColor,
            backgroundColor: accentColor + '20',
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#8b949e' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#8b949e' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#f0f6fc', font: { weight: 'bold' } }
          }
        }
      }
    });
  }

  renderAchievementsGrid() {
    const grid = document.getElementById('stats-achievements-grid');
    if (!grid) return;

    const unlocked = JSON.parse(localStorage.getItem('soromath_achievements') || '[]');

    grid.innerHTML = this.achievements.map(ach => {
      const isUnlocked = unlocked.includes(ach.id);
      return `
        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'} card">
          <div class="ach-icon-badge">${ach.code}</div>
          <div class="ach-info">
            <h4>${ach.title} <span class="ach-status">${isUnlocked ? 'Completed' : 'Locked'}</span></h4>
            <p>${ach.desc}</p>
          </div>
        </div>
      `;
    }).join('');
  }
}

window.statsManager = new StatsManager();
