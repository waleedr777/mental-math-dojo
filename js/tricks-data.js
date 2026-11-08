/**
 * Mental Math Tricks Encyclopedia & Dynamic Problem Generators
 * Complete catalog covering Multiplication, Addition, Subtraction, Division, and Special shortcuts.
 */
const MENTAL_MATH_TRICKS = [
  // ==========================================
  // MULTIPLICATION TRICKS
  // ==========================================
  {
    id: 'mult-11',
    title: 'Multiply 2-Digit Numbers by 11',
    category: 'multiplication',
    badge: 'Speed Classic',
    difficulty: 'Beginner',
    summary: 'Split the two digits and sandwich their sum in the middle.',
    formula: 'ab \\times 11 = a \\; (a + b) \\; b',
    rule: 'To multiply any two-digit number by 11, take the two digits, add them together, and place the result between them. If the sum is 10 or greater, keep the units digit in the middle and carry 1 to the hundreds place.',
    whyItWorks: 'Algebraically, 11 × (10a + b) = (10 + 1)(10a + b) = 100a + 10(a + b) + b. The middle digit is literally the sum of the digits (a + b)!',
    examples: [
      {
        problem: '35 × 11',
        steps: [
          'Separate 3 and 5: 3 _ 5',
          'Add the digits: 3 + 5 = 8',
          'Place 8 in the middle: 385'
        ],
        answer: '385'
      },
      {
        problem: '62 × 11',
        steps: [
          'Separate 6 and 2: 6 _ 2',
          'Add the digits: 6 + 2 = 8',
          'Combine: 682'
        ],
        answer: '682'
      },
      {
        problem: '85 × 11 (with carry)',
        steps: [
          'Separate 8 and 5: 8 _ 5',
          'Add the digits: 8 + 5 = 13 (tens carry!)',
          'Add the carry 1 to 8: (8 + 1) = 9',
          'Combine with 3 and 5: 935'
        ],
        answer: '935'
      }
    ],
    generateProblem: () => {
      const a = Math.floor(Math.random() * 8) + 1; // 1-8
      const b = Math.floor(Math.random() * 9) + 1; // 1-9
      const num = a * 10 + b;
      const ans = num * 11;
      const sum = a + b;
      const stepsHint = sum >= 10
        ? [
            `Split digits: ${a} and ${b}`,
            `Sum of digits: ${a} + ${b} = ${sum}`,
            `Carry 1: (${a} + 1) = ${a + 1}`,
            `Result: ${(a + 1)}${sum % 10}${b}`
          ]
        : [
            `Split digits: ${a} and ${b}`,
            `Sum of digits: ${a} + ${b} = ${sum}`,
            `Result: ${a}${sum}${b}`
          ];
      return { problem: `${num} × 11`, answer: ans, stepsHint };
    }
  },

  {
    id: 'mult-square-ends-5',
    title: 'Squaring Numbers Ending in 5',
    category: 'multiplication',
    badge: 'Instant Trick',
    difficulty: 'Beginner',
    summary: 'Multiply the tens digit by (tens + 1), then attach 25 at the end.',
    formula: '(n5)^2 = [n \\times (n + 1)] \\text{ followed by } 25',
    rule: 'Any square of a number ending in 5 always ends in 25. To find the front digits, take everything before the 5 (let it be n) and multiply it by the next consecutive integer (n + 1). Append 25 to get the exact answer.',
    whyItWorks: '(10n + 5)^2 = 100n^2 + 100n + 25 = 100n(n + 1) + 25. The 100 shifts n(n+1) two positions to the left, leaving room for 25!',
    examples: [
      {
        problem: '35²',
        steps: [
          'The number before 5 is 3.',
          'Multiply 3 by the next number (4): 3 × 4 = 12',
          'Append 25: 1225'
        ],
        answer: '1225'
      },
      {
        problem: '75²',
        steps: [
          'The number before 5 is 7.',
          'Multiply 7 by 8: 7 × 8 = 56',
          'Append 25: 5625'
        ],
        answer: '5625'
      },
      {
        problem: '115²',
        steps: [
          'The front number is 11.',
          'Multiply 11 by 12: 11 × 12 = 132',
          'Append 25: 13225'
        ],
        answer: '13225'
      }
    ],
    generateProblem: () => {
      const candidates = [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125];
      const num = candidates[Math.floor(Math.random() * candidates.length)];
      const front = Math.floor(num / 10);
      const ans = num * num;
      return {
        problem: `${num}²`,
        answer: ans,
        stepsHint: [
          `Front part: ${front} × (${front} + 1) = ${front} × ${front + 1} = ${front * (front + 1)}`,
          `Back part: always 25`,
          `Result: ${front * (front + 1)}25`
        ]
      };
    }
  },

  {
    id: 'mult-div-and-shift',
    title: 'Multiply by 5, 25, 50, and 125',
    category: 'multiplication',
    badge: 'Division Hack',
    difficulty: 'Beginner',
    summary: 'Replace clumsy multiplication with simple division by 2, 4, or 8 and shift decimals.',
    formula: 'n \\times 5 = \\frac{n}{2} \\times 10, \\quad n \\times 25 = \\frac{n}{4} \\times 100',
    rule: 'Multiplication by powers of 5 is easiest by halving or quartering: for ×5, divide by 2 and multiply by 10; for ×50, divide by 2 and multiply by 100; for ×25, divide by 4 and multiply by 100; for ×125, divide by 8 and multiply by 1000.',
    whyItWorks: 'Since 5 = 10/2, 25 = 100/4, 50 = 100/2, and 125 = 1000/8, converting into base 10 division avoids difficult long multiplication.',
    examples: [
      {
        problem: '48 × 5',
        steps: [
          'Halve 48: 48 ÷ 2 = 24',
          'Multiply by 10 (add 0): 240'
        ],
        answer: '240'
      },
      {
        problem: '64 × 25',
        steps: [
          'Quarter 64: 64 ÷ 4 = 16',
          'Multiply by 100: 1600'
        ],
        answer: '1600'
      },
      {
        problem: '36 × 50',
        steps: [
          'Halve 36: 36 ÷ 2 = 18',
          'Multiply by 100: 1800'
        ],
        answer: '1800'
      }
    ],
    generateProblem: () => {
      const multipliers = [5, 25, 50];
      const m = multipliers[Math.floor(Math.random() * multipliers.length)];
      let base;
      if (m === 5 || m === 50) {
        base = (Math.floor(Math.random() * 45) + 6) * 2; // even number
      } else {
        base = (Math.floor(Math.random() * 25) + 3) * 4; // multiple of 4
      }
      const ans = base * m;
      let hint;
      if (m === 5) hint = [`Halve ${base}: ${base / 2}`, `Multiply by 10: ${(base / 2) * 10}`];
      else if (m === 50) hint = [`Halve ${base}: ${base / 2}`, `Multiply by 100: ${(base / 2) * 100}`];
      else hint = [`Divide ${base} by 4: ${base / 4}`, `Multiply by 100: ${(base / 4) * 100}`];
      return { problem: `${base} × ${m}`, answer: ans, stepsHint: hint };
    }
  },

  {
    id: 'mult-diff-squares',
    title: 'Difference of Squares (Symmetric Distance)',
    category: 'multiplication',
    badge: 'Algebra Shortcut',
    difficulty: 'Intermediate',
    summary: 'When numbers center on a round milestone: a × b = m² - d².',
    formula: '(m - d)(m + d) = m^2 - d^2',
    rule: 'If two numbers are equidistant from a round number m with difference d, multiply by squaring m and subtracting d squared.',
    whyItWorks: 'The standard algebraic identity (m - d)(m + d) = m^2 - d^2 eliminates cross terms entirely.',
    examples: [
      {
        problem: '48 × 52',
        steps: [
          'Center is 50, distance d is 2 (50 - 2 and 50 + 2).',
          '50² = 2500',
          'Subtract 2² (4): 2500 - 4 = 2496'
        ],
        answer: '2496'
      },
      {
        problem: '27 × 33',
        steps: [
          'Center is 30, distance is 3.',
          '30² = 900',
          'Subtract 3² (9): 900 - 9 = 891'
        ],
        answer: '891'
      },
      {
        problem: '96 × 104',
        steps: [
          'Center is 100, distance is 4.',
          '100² = 10000',
          'Subtract 4² (16): 10000 - 16 = 9984'
        ],
        answer: '9984'
      }
    ],
    generateProblem: () => {
      const centers = [20, 30, 40, 50, 60, 70, 80, 100];
      const m = centers[Math.floor(Math.random() * centers.length)];
      const d = Math.floor(Math.random() * 5) + 1; // 1-5
      const n1 = m - d;
      const n2 = m + d;
      const ans = n1 * n2;
      return {
        problem: `${n1} × ${n2}`,
        answer: ans,
        stepsHint: [
          `Center is ${m}, offset is ${d}`,
          `${m}² = ${m * m}`,
          `${m * m} - ${d}² = ${m * m} - ${d * d} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'mult-near-50-square',
    title: 'Squaring Numbers Near 50',
    category: 'multiplication',
    badge: 'Mental Speed',
    difficulty: 'Intermediate',
    summary: 'Base 25 method: (25 ± d) in the hundreds, plus d².',
    formula: '(50 \\pm d)^2 = (25 \\pm d) \\times 100 + d^2',
    rule: 'To square any number near 50, find the difference d from 50. Add or subtract d from 25 for the first two digits, then square d for the last two digits (pad with 0 if d² < 10).',
    whyItWorks: '(50 + d)^2 = 2500 + 100d + d^2 = 100(25 + d) + d^2.',
    examples: [
      {
        problem: '54²',
        steps: [
          'Difference from 50 is +4.',
          'First part: 25 + 4 = 29',
          'Second part: 4² = 16',
          'Combine: 2916'
        ],
        answer: '2916'
      },
      {
        problem: '47²',
        steps: [
          'Difference from 50 is -3.',
          'First part: 25 - 3 = 22',
          'Second part: (-3)² = 09',
          'Combine: 2209'
        ],
        answer: '2209'
      }
    ],
    generateProblem: () => {
      const offsets = [-8, -7, -6, -4, -3, -2, -1, 1, 2, 3, 4, 6, 7, 8];
      const d = offsets[Math.floor(Math.random() * offsets.length)];
      const num = 50 + d;
      const front = 25 + d;
      const back = d * d;
      const backStr = back < 10 ? `0${back}` : `${back}`;
      const ans = num * num;
      return {
        problem: `${num}²`,
        answer: ans,
        stepsHint: [
          `Difference from 50 is ${d > 0 ? '+' : ''}${d}`,
          `Front part: 25 ${d >= 0 ? '+' : ''}${d} = ${front}`,
          `Back part: ${Math.abs(d)}² = ${backStr}`,
          `Combine: ${front}${backStr}`
        ]
      };
    }
  },

  {
    id: 'mult-nikhilam-100',
    title: 'Vedic Multiplication Near 100 (Nikhilam)',
    category: 'multiplication',
    badge: 'Vedic Sutra',
    difficulty: 'Intermediate',
    summary: 'Cross-adjust against 100 and multiply deficits.',
    formula: '(100 + a)(100 + b) = 100(100 + a + b) + ab',
    rule: 'For two numbers near 100, calculate their differences from 100 (a and b). The left digits are (first number + b). The right 2 digits are (a × b).',
    whyItWorks: '(100 + a)(100 + b) = 10000 + 100(a + b) + ab = 100(100 + a + b) + ab.',
    examples: [
      {
        problem: '96 × 93',
        steps: [
          'Deficits from 100: 96 is -4, 93 is -7.',
          'Cross-subtract: 96 - 7 = 89 (or 93 - 4 = 89)',
          'Multiply deficits: (-4) × (-7) = 28',
          'Combine: 8928'
        ],
        answer: '8928'
      },
      {
        problem: '104 × 107',
        steps: [
          'Surpluses: +4 and +7',
          'Cross-add: 104 + 7 = 111',
          'Multiply surpluses: 4 × 7 = 28',
          'Combine: 11128'
        ],
        answer: '11128'
      }
    ],
    generateProblem: () => {
      const mode = Math.random() > 0.5 ? 'below' : 'above';
      let n1, n2, d1, d2;
      if (mode === 'below') {
        d1 = -(Math.floor(Math.random() * 8) + 2); // -2 to -9
        d2 = -(Math.floor(Math.random() * 8) + 2);
      } else {
        d1 = Math.floor(Math.random() * 8) + 2; // +2 to +9
        d2 = Math.floor(Math.random() * 8) + 2;
      }
      n1 = 100 + d1;
      n2 = 100 + d2;
      const ans = n1 * n2;
      const left = n1 + d2;
      const right = d1 * d2;
      const rightStr = right < 10 ? `0${right}` : `${right}`;
      return {
        problem: `${n1} × ${n2}`,
        answer: ans,
        stepsHint: [
          `Offsets from 100: ${d1} and ${d2}`,
          `Cross-sum: ${n1} + (${d2}) = ${left}`,
          `Multiply offsets: (${d1}) × (${d2}) = ${rightStr}`,
          `Combine: ${left}${rightStr}`
        ]
      };
    }
  },

  {
    id: 'mult-matching-tens-sum-10',
    title: 'Matching Tens & Units Adding to 10',
    category: 'multiplication',
    badge: 'Vedic Sutra',
    difficulty: 'Intermediate',
    summary: 'If tens match and units add to 10: T × (T+1) followed by U1 × U2.',
    formula: '(10T + u_1)(10T + u_2) = 100T(T + 1) + u_1 u_2',
    rule: 'When two 2-digit numbers have the exact same tens digit T and their units digits add up to 10, multiply T by (T + 1) for the front, and multiply the two unit digits for the two-digit end.',
    whyItWorks: '(10T + u)(10T + (10 - u)) = 100T^2 + 10T(10 - u + u) + u(10 - u) = 100T^2 + 100T + u(10 - u) = 100T(T + 1) + u_1 u_2.',
    examples: [
      {
        problem: '43 × 47',
        steps: [
          'Tens are both 4. Units 3 + 7 = 10.',
          'Front: 4 × (4 + 1) = 4 × 5 = 20',
          'Back: 3 × 7 = 21',
          'Combine: 2021'
        ],
        answer: '2021'
      },
      {
        problem: '72 × 78',
        steps: [
          'Tens 7, units 2 and 8.',
          'Front: 7 × 8 = 56',
          'Back: 2 × 8 = 16',
          'Combine: 5616'
        ],
        answer: '5616'
      },
      {
        problem: '81 × 89',
        steps: [
          'Front: 8 × 9 = 72',
          'Back: 1 × 9 = 09 (two digits!)',
          'Combine: 7209'
        ],
        answer: '7209'
      }
    ],
    generateProblem: () => {
      const tens = Math.floor(Math.random() * 8) + 2; // 2-9
      const u1 = Math.floor(Math.random() * 8) + 1; // 1-8
      const u2 = 10 - u1;
      const n1 = tens * 10 + u1;
      const n2 = tens * 10 + u2;
      const ans = n1 * n2;
      const front = tens * (tens + 1);
      const back = u1 * u2;
      const backStr = back < 10 ? `0${back}` : `${back}`;
      return {
        problem: `${n1} × ${n2}`,
        answer: ans,
        stepsHint: [
          `Tens digit is ${tens}: ${tens} × (${tens} + 1) = ${front}`,
          `Units digits (${u1} × ${u2}) = ${backStr}`,
          `Combine: ${front}${backStr}`
        ]
      };
    }
  },

  {
    id: 'mult-double-and-halve',
    title: 'Double and Halve Strategy',
    category: 'multiplication',
    badge: 'Mental Rebalancing',
    difficulty: 'Beginner',
    summary: 'Halve the even number, double the number ending in 5 to make a clean multiple of 10.',
    formula: '2a \\times b = a \\times 2b',
    rule: 'When multiplying an even number with a number ending in 5 (or 15, 25, 35, 45, etc.), halve the even factor and double the odd factor. The product remains unchanged and becomes trivial.',
    whyItWorks: 'Multiplication is associative: (2 × a) × b = a × (2 × b).',
    examples: [
      {
        problem: '16 × 35',
        steps: [
          'Halve 16 -> 8',
          'Double 35 -> 70',
          '8 × 70 = 560'
        ],
        answer: '560'
      },
      {
        problem: '24 × 15',
        steps: [
          'Halve 24 -> 12',
          'Double 15 -> 30',
          '12 × 30 = 360'
        ],
        answer: '360'
      }
    ],
    generateProblem: () => {
      const evens = [12, 14, 16, 18, 22, 24, 26, 28, 32, 36];
      const fives = [15, 25, 35, 45];
      const even = evens[Math.floor(Math.random() * evens.length)];
      const five = fives[Math.floor(Math.random() * fives.length)];
      const ans = even * five;
      return {
        problem: `${even} × ${five}`,
        answer: ans,
        stepsHint: [
          `Halve ${even} = ${even / 2}`,
          `Double ${five} = ${five * 2}`,
          `${even / 2} × ${five * 2} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'mult-9-99',
    title: 'Multiply by 9, 99, and 999',
    category: 'multiplication',
    badge: 'Base Subtraction',
    difficulty: 'Beginner',
    summary: 'Multiply by 10, 100, or 1000, then subtract the original number once.',
    formula: 'n \\times 99 = n \\times 100 - n',
    rule: 'To multiply any number by 99, add two zeros to the number (multiply by 100) and subtract the original number from it.',
    whyItWorks: '99 = 100 - 1, so by the distributive property, n × 99 = n(100 - 1) = 100n - n.',
    examples: [
      {
        problem: '47 × 99',
        steps: [
          '47 × 100 = 4700',
          'Subtract 47: 4700 - 47 = 4653'
        ],
        answer: '4653'
      },
      {
        problem: '64 × 9',
        steps: [
          '64 × 10 = 640',
          'Subtract 64: 640 - 64 = 576'
        ],
        answer: '576'
      }
    ],
    generateProblem: () => {
      const mult = Math.random() > 0.4 ? 99 : 9;
      const num = Math.floor(Math.random() * 80) + 12;
      const ans = num * mult;
      const base = mult === 9 ? 10 : 100;
      return {
        problem: `${num} × ${mult}`,
        answer: ans,
        stepsHint: [
          `${num} × ${base} = ${num * base}`,
          `${num * base} - ${num} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'mult-teens',
    title: 'Multiplying Teens (11 to 19)',
    category: 'multiplication',
    badge: 'Rapid Teens',
    difficulty: 'Intermediate',
    summary: 'Add the ones digit of the second number to the first, multiply by 10, and add the product of the ones digits.',
    formula: '(10 + a)(10 + b) = (10 + a + b) \\times 10 + ab',
    rule: 'For any two numbers between 11 and 19: take the first number, add the last digit of the second number. Multiply that sum by 10. Then add the product of both unit digits.',
    whyItWorks: '(10 + a)(10 + b) = 100 + 10(a + b) + ab = 10(10 + a + b) + ab.',
    examples: [
      {
        problem: '14 × 17',
        steps: [
          'First number + last digit of second: 14 + 7 = 21',
          'Multiply by 10: 21 × 10 = 210',
          'Product of ones digits: 4 × 7 = 28',
          'Sum: 210 + 28 = 238'
        ],
        answer: '238'
      },
      {
        problem: '13 × 15',
        steps: [
          '13 + 5 = 18',
          '18 × 10 = 180',
          '3 × 5 = 15',
          '180 + 15 = 195'
        ],
        answer: '195'
      }
    ],
    generateProblem: () => {
      const a = Math.floor(Math.random() * 8) + 2; // 2-9
      const b = Math.floor(Math.random() * 8) + 2; // 2-9
      const n1 = 10 + a;
      const n2 = 10 + b;
      const ans = n1 * n2;
      return {
        problem: `${n1} × ${n2}`,
        answer: ans,
        stepsHint: [
          `Base sum: ${n1} + ${b} = ${n1 + b}`,
          `Shift by 10: ${(n1 + b) * 10}`,
          `Units product: ${a} × ${b} = ${a * b}`,
          `Total: ${(n1 + b) * 10} + ${a * b} = ${ans}`
        ]
      };
    }
  },

  // ==========================================
  // ADDITION TRICKS
  // ==========================================
  {
    id: 'add-left-to-right',
    title: 'Left-to-Right Addition (Front-End Mental Sum)',
    category: 'addition',
    badge: 'Mental Core',
    difficulty: 'Beginner',
    summary: 'Add the largest place values first so you can speak or hold the growing total effortlessly.',
    formula: '(a_1 + a_2) \\times 10 + (b_1 + b_2)',
    rule: 'Unlike school math done right-to-left on paper with carries, mental addition is done left-to-right. Add the tens first, then add the units to the running total. You never have to hold carries in your head.',
    whyItWorks: 'Place-value decomposition: (10a + b) + (10c + d) = 10(a + c) + (b + d).',
    examples: [
      {
        problem: '67 + 58',
        steps: [
          'Add tens: 60 + 50 = 110',
          'Add units: 7 + 8 = 15',
          'Combine running total: 110 + 15 = 125'
        ],
        answer: '125'
      },
      {
        problem: '348 + 265',
        steps: [
          'Add hundreds: 300 + 200 = 500',
          'Add tens: 500 + (40 + 60) = 600',
          'Add units: 600 + (8 + 5) = 613'
        ],
        answer: '613'
      }
    ],
    generateProblem: () => {
      const n1 = Math.floor(Math.random() * 70) + 25;
      const n2 = Math.floor(Math.random() * 70) + 25;
      const t1 = Math.floor(n1 / 10) * 10;
      const t2 = Math.floor(n2 / 10) * 10;
      const u1 = n1 % 10;
      const u2 = n2 % 10;
      const ans = n1 + n2;
      return {
        problem: `${n1} + ${n2}`,
        answer: ans,
        stepsHint: [
          `Tens: ${t1} + ${t2} = ${t1 + t2}`,
          `Units: ${u1} + ${u2} = ${u1 + u2}`,
          `Total: ${t1 + t2} + ${u1 + u2} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'add-compensation',
    title: 'Making Round Numbers (Compensation)',
    category: 'addition',
    badge: 'Friendly Numbers',
    difficulty: 'Beginner',
    summary: 'Borrow from one number to round the other to a multiple of 10 or 100, then adjust.',
    formula: 'a + b = (a + k) + (b - k)',
    rule: 'If a number is close to a multiple of 10 or 100 (like ending in 7, 8, 9), take the small difference from the other number to turn it into an easy round milestone.',
    whyItWorks: 'Adding and subtracting the same number k preserves the sum: (a + k) + (b - k) = a + b.',
    examples: [
      {
        problem: '396 + 247',
        steps: [
          '396 is 4 away from 400.',
          'Borrow 4 from 247: 247 - 4 = 243',
          '400 + 243 = 643'
        ],
        answer: '643'
      },
      {
        problem: '88 + 57',
        steps: [
          '88 needs 12 to reach 100.',
          'Take 12 from 57: 57 - 12 = 45',
          '100 + 45 = 145'
        ],
        answer: '145'
      }
    ],
    generateProblem: () => {
      const baseRound = (Math.floor(Math.random() * 8) + 1) * 100; // e.g. 200, 300, 400
      const diff = Math.floor(Math.random() * 5) + 2; // 2-6
      const n1 = baseRound - diff;
      const n2 = Math.floor(Math.random() * 150) + 40;
      const ans = n1 + n2;
      return {
        problem: `${n1} + ${n2}`,
        answer: ans,
        stepsHint: [
          `Round ${n1} up by +${diff} to ${baseRound}`,
          `Subtract ${diff} from ${n2}: ${n2} - ${diff} = ${n2 - diff}`,
          `${baseRound} + ${n2 - diff} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'add-break-and-jump',
    title: 'Break and Jump (Sequential Addition)',
    category: 'addition',
    badge: 'Flow Technique',
    difficulty: 'Beginner',
    summary: 'Keep the first number intact and jump forward in tens then units.',
    formula: 'a + b = (a + \\text{tens of } b) + \\text{ones of } b',
    rule: 'Keep the first number completely solid. Break the second number into tens and units. Leap forward by the tens first, then take the small hop with the units.',
    whyItWorks: 'Directly follows the associative property and simulates walking along a mental number line.',
    examples: [
      {
        problem: '68 + 45',
        steps: [
          'Jump by 40: 68 + 40 = 108',
          'Hop by 5: 108 + 5 = 113'
        ],
        answer: '113'
      },
      {
        problem: '154 + 68',
        steps: [
          'Jump by 60: 154 + 60 = 214',
          'Hop by 8: 214 + 8 = 222'
        ],
        answer: '222'
      }
    ],
    generateProblem: () => {
      const n1 = Math.floor(Math.random() * 80) + 30;
      const n2 = Math.floor(Math.random() * 80) + 20;
      const t2 = Math.floor(n2 / 10) * 10;
      const u2 = n2 % 10;
      const ans = n1 + n2;
      return {
        problem: `${n1} + ${n2}`,
        answer: ans,
        stepsHint: [
          `Keep ${n1}`,
          `Jump tens: ${n1} + ${t2} = ${n1 + t2}`,
          `Hop units: ${n1 + t2} + ${u2} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'add-complements-100',
    title: 'Complements to 100 and 1000',
    category: 'addition',
    badge: 'Pair Matching',
    difficulty: 'Beginner',
    summary: 'Find the pairing number that instantly completes 100 or 1000.',
    formula: '100 - n \\rightarrow (9 - \\text{tens}) \\mid (10 - \\text{units})',
    rule: 'To find what number adds with N to make 100: the tens digits must add to 9, and the units digits must add to 10.',
    whyItWorks: '90 + 10 = 100. Pairing tens to 9 and ones to 10 guarantees an exact total of 100 with zero carry complications.',
    examples: [
      {
        problem: 'What adds with 37 to make 100?',
        steps: [
          'Tens digit: 9 - 3 = 6',
          'Units digit: 10 - 7 = 3',
          'Answer: 63 (37 + 63 = 100)'
        ],
        answer: '63'
      },
      {
        problem: 'What adds with 64 to make 100?',
        steps: [
          'Tens: 9 - 6 = 3',
          'Units: 10 - 4 = 6',
          'Answer: 36 (64 + 36 = 100)'
        ],
        answer: '36'
      }
    ],
    generateProblem: () => {
      const n = Math.floor(Math.random() * 89) + 11;
      const ans = 100 - n;
      const t = Math.floor(n / 10);
      const u = n % 10;
      return {
        problem: `100 - ${n} = ?`,
        answer: ans,
        stepsHint: [
          `Tens: 9 - ${t} = ${9 - t}`,
          `Units: ${u === 0 ? '10 - 0 = 10' : `10 - ${u} = ${10 - u}`}`,
          `Complement is ${ans}`
        ]
      };
    }
  },

  // ==========================================
  // SUBTRACTION TRICKS
  // ==========================================
  {
    id: 'sub-all-from-9-last-10',
    title: 'All from 9 and Last from 10 (Nikhilam Sutra)',
    category: 'subtraction',
    badge: 'Vedic Sutra',
    difficulty: 'Beginner',
    summary: 'Subtract from 1000, 10000, etc., with zero borrowing.',
    formula: '10^k - N \\rightarrow (9 - d_1)(9 - d_2)\\dots(10 - d_k)',
    rule: 'When subtracting any number from a power of 10 (100, 1000, 10000, 100000), subtract every digit from 9, and subtract the final non-zero unit digit from 10.',
    whyItWorks: '1000 = 999 + 1. Since 999 - xyz requires zero borrows (every digit ≤ 9), adding back 1 turns the last subtraction into 10 - z.',
    examples: [
      {
        problem: '1000 - 347',
        steps: [
          'First digit: 9 - 3 = 6',
          'Second digit: 9 - 4 = 5',
          'Last digit: 10 - 7 = 3',
          'Combine: 653'
        ],
        answer: '653'
      },
      {
        problem: '10000 - 4281',
        steps: [
          '9 - 4 = 5',
          '9 - 2 = 7',
          '9 - 8 = 1',
          '10 - 1 = 9',
          'Combine: 5719'
        ],
        answer: '5719'
      }
    ],
    generateProblem: () => {
      const base = 1000;
      const n = Math.floor(Math.random() * 850) + 120;
      const ans = base - n;
      const d1 = Math.floor(n / 100);
      const d2 = Math.floor((n % 100) / 10);
      const d3 = n % 10;
      return {
        problem: `1000 - ${n}`,
        answer: ans,
        stepsHint: [
          `9 - ${d1} = ${9 - d1}`,
          `9 - ${d2} = ${9 - d2}`,
          `10 - ${d3} = ${10 - d3}`,
          `Result: ${ans}`
        ]
      };
    }
  },

  {
    id: 'sub-equal-addition',
    title: 'Equal Addition / Same Change Rule',
    category: 'subtraction',
    badge: 'No Borrowing',
    difficulty: 'Beginner',
    summary: 'Add the same amount to both numbers to turn the subtrahend into a round multiple of 10.',
    formula: 'a - b = (a + k) - (b + k)',
    rule: 'The distance between two numbers never changes if you shift both by the same amount. If the bottom number ends in 7, 8, or 9, add 1, 2, or 3 to BOTH numbers so the bottom ends in 0.',
    whyItWorks: '(a + k) - (b + k) = a + k - b - k = a - b. The difference is mathematically invariant.',
    examples: [
      {
        problem: '84 - 38',
        steps: [
          'Add 2 to both numbers: 38 becomes 40.',
          '84 + 2 = 86',
          '38 + 2 = 40',
          'Now subtract: 86 - 40 = 46'
        ],
        answer: '46'
      },
      {
        problem: '143 - 79',
        steps: [
          'Add 1 to both: 79 becomes 80.',
          '144 - 80 = 64'
        ],
        answer: '64'
      }
    ],
    generateProblem: () => {
      const n2_tens = Math.floor(Math.random() * 5) + 2;
      const n2_unit = Math.random() > 0.5 ? 8 : 9;
      const n2 = n2_tens * 10 + n2_unit;
      const n1 = n2 + Math.floor(Math.random() * 50) + 15;
      const shift = 10 - n2_unit;
      const ans = n1 - n2;
      return {
        problem: `${n1} - ${n2}`,
        answer: ans,
        stepsHint: [
          `Add ${shift} to both sides`,
          `${n1} + ${shift} = ${n1 + shift}`,
          `${n2} + ${shift} = ${n2 + shift}`,
          `${n1 + shift} - ${n2 + shift} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'sub-cashier-adding-up',
    title: 'Cashier Algorithm (Adding Up)',
    category: 'subtraction',
    badge: 'Real World Secret',
    difficulty: 'Beginner',
    summary: 'Instead of subtracting backwards, count upwards in friendly steps from the smaller number to the target.',
    formula: 'b + (x_1 + x_2 + x_3) = a \\implies a - b = \\sum x_i',
    rule: 'Think like a cashier making change: start at the smaller number, add enough to hit the nearest ten, then add to hit the hundred, then step to the target. Sum up your steps.',
    whyItWorks: 'Addition is cognitive forward motion; reversing subtraction into cumulative forward intervals reduces working memory load by 50%.',
    examples: [
      {
        problem: '100 - 64',
        steps: [
          '64 + 6 = 70',
          '70 + 30 = 100',
          'Sum of steps: 6 + 30 = 36'
        ],
        answer: '36'
      },
      {
        problem: '93 - 47',
        steps: [
          '47 + 3 = 50',
          '50 + 40 = 90',
          '90 + 3 = 93',
          'Sum of steps: 3 + 40 + 3 = 46'
        ],
        answer: '46'
      }
    ],
    generateProblem: () => {
      const target = Math.floor(Math.random() * 60) + 40;
      const start = target - (Math.floor(Math.random() * 30) + 12);
      const ans = target - start;
      const nextTen = Math.ceil(start / 10) * 10;
      const step1 = nextTen - start;
      const step2 = target - nextTen;
      return {
        problem: `${target} - ${start}`,
        answer: ans,
        stepsHint: [
          `Step 1: ${start} + ${step1} = ${nextTen}`,
          `Step 2: ${nextTen} + ${step2} = ${target}`,
          `Total change: ${step1} + ${step2} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'sub-left-to-right',
    title: 'Left-to-Right Subtraction',
    category: 'subtraction',
    badge: 'Mental Flow',
    difficulty: 'Intermediate',
    summary: 'Subtract the tens first, then subtract the units.',
    formula: 'a - (10t + u) = (a - 10t) - u',
    rule: 'Subtract the largest place value first. If you have 83 - 47, do 83 - 40 = 43, then 43 - 7 = 36.',
    whyItWorks: 'Direct sequential evaluation avoids holding a phantom carry over the tens column.',
    examples: [
      {
        problem: '83 - 47',
        steps: [
          'Subtract 40: 83 - 40 = 43',
          'Subtract 7: 43 - 7 = 36'
        ],
        answer: '36'
      },
      {
        problem: '165 - 88',
        steps: [
          'Subtract 80: 165 - 80 = 85',
          'Subtract 8: 85 - 8 = 77'
        ],
        answer: '77'
      }
    ],
    generateProblem: () => {
      const n2 = Math.floor(Math.random() * 50) + 25;
      const n1 = n2 + Math.floor(Math.random() * 50) + 15;
      const t2 = Math.floor(n2 / 10) * 10;
      const u2 = n2 % 10;
      const ans = n1 - n2;
      return {
        problem: `${n1} - ${n2}`,
        answer: ans,
        stepsHint: [
          `Subtract tens: ${n1} - ${t2} = ${n1 - t2}`,
          `Subtract units: ${n1 - t2} - ${u2} = ${ans}`
        ]
      };
    }
  },

  // ==========================================
  // DIVISION TRICKS
  // ==========================================
  {
    id: 'div-by-5-25',
    title: 'Dividing by 5, 25, and 50',
    category: 'division',
    badge: 'Double and Shift',
    difficulty: 'Beginner',
    summary: 'Double the dividend and divide by 10 (or quadruple and divide by 100).',
    formula: 'n \\div 5 = \\frac{2n}{10}, \\quad n \\div 25 = \\frac{4n}{100}',
    rule: 'Never do long division by 5! Simply double the number and slide the decimal point one place to the left. For dividing by 25, multiply by 4 and slide the decimal two places left.',
    whyItWorks: 'n / 5 = n / (10 / 2) = (2n) / 10.',
    examples: [
      {
        problem: '340 ÷ 5',
        steps: [
          'Double 340: 340 × 2 = 680',
          'Shift decimal: 680 ÷ 10 = 68'
        ],
        answer: '68'
      },
      {
        problem: '425 ÷ 5',
        steps: [
          'Double 425: 425 × 2 = 850',
          'Shift decimal: 85'
        ],
        answer: '85'
      },
      {
        problem: '350 ÷ 25',
        steps: [
          'Quadruple 350: 350 × 4 = 1400',
          'Shift decimal by 2: 14'
        ],
        answer: '14'
      }
    ],
    generateProblem: () => {
      const mode = Math.random() > 0.4 ? 5 : 25;
      let ans, num;
      if (mode === 5) {
        ans = Math.floor(Math.random() * 80) + 12;
        num = ans * 5;
      } else {
        ans = Math.floor(Math.random() * 30) + 4;
        num = ans * 25;
      }
      return {
        problem: `${num} ÷ ${mode}`,
        answer: ans,
        stepsHint: mode === 5
          ? [
              `Double ${num}: ${num * 2}`,
              `Divide by 10: ${(num * 2) / 10} = ${ans}`
            ]
          : [
              `Multiply ${num} by 4: ${num * 4}`,
              `Divide by 100: ${(num * 4) / 100} = ${ans}`
            ]
      };
    }
  },

  {
    id: 'div-chunking',
    title: 'Chunking / Partition Division',
    category: 'division',
    badge: 'Friendly Chunks',
    difficulty: 'Intermediate',
    summary: 'Decompose the numerator into obvious multiples of the denominator.',
    formula: '\\frac{A + B}{d} = \\frac{A}{d} + \\frac{B}{d}',
    rule: 'Split the dividend into a large friendly chunk that is an effortless multiple of the divisor, plus whatever remainder is left.',
    whyItWorks: 'Distributive property of division over addition.',
    examples: [
      {
        problem: '294 ÷ 7',
        steps: [
          '280 is an obvious multiple of 7 (7 × 40 = 280).',
          '294 = 280 + 14',
          '280 ÷ 7 = 40',
          '14 ÷ 7 = 2',
          'Total: 40 + 2 = 42'
        ],
        answer: '42'
      },
      {
        problem: '516 ÷ 6',
        steps: [
          '516 = 480 + 36',
          '480 ÷ 6 = 80',
          '36 ÷ 6 = 6',
          'Total: 80 + 6 = 86'
        ],
        answer: '86'
      }
    ],
    generateProblem: () => {
      const divisors = [4, 6, 7, 8, 9];
      const d = divisors[Math.floor(Math.random() * divisors.length)];
      const chunk1_factor = (Math.floor(Math.random() * 7) + 3) * 10; // e.g. 30, 40, 50
      const chunk2_factor = Math.floor(Math.random() * 8) + 1; // 1-8
      const ans = chunk1_factor + chunk2_factor;
      const num = ans * d;
      const chunk1 = chunk1_factor * d;
      const chunk2 = chunk2_factor * d;
      return {
        problem: `${num} ÷ ${d}`,
        answer: ans,
        stepsHint: [
          `Chunk 1: ${chunk1} ÷ ${d} = ${chunk1_factor}`,
          `Chunk 2: ${chunk2} ÷ ${d} = ${chunk2_factor}`,
          `Combine: ${chunk1_factor} + ${chunk2_factor} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'div-successive-halving',
    title: 'Successive Halving for Even Divisors',
    category: 'division',
    badge: 'Binary Collapse',
    difficulty: 'Beginner',
    summary: 'When dividing by 4, 8, or 16, just halve the number repeatedly.',
    formula: '\\frac{n}{2^k} = (((n \\div 2) \\div 2) \\dots)',
    rule: 'To divide by 4, halve twice. To divide by 8, halve three times. To divide by 16, halve four times.',
    whyItWorks: 'Powers of two factorize cleanly into repeated divisions by 2.',
    examples: [
      {
        problem: '216 ÷ 8',
        steps: [
          'First halving: 216 ÷ 2 = 108',
          'Second halving: 108 ÷ 2 = 54',
          'Third halving: 54 ÷ 2 = 27'
        ],
        answer: '27'
      },
      {
        problem: '336 ÷ 4',
        steps: [
          'Half of 336 = 168',
          'Half of 168 = 84'
        ],
        answer: '84'
      }
    ],
    generateProblem: () => {
      const divisor = Math.random() > 0.5 ? 4 : 8;
      const ans = Math.floor(Math.random() * 50) + 12;
      const num = ans * divisor;
      const hint = divisor === 4
        ? [`Half of ${num} = ${num / 2}`, `Half of ${num / 2} = ${ans}`]
        : [`Half 1: ${num / 2}`, `Half 2: ${num / 4}`, `Half 3: ${ans}`];
      return { problem: `${num} ÷ ${divisor}`, answer: ans, stepsHint: hint };
    }
  },

  // ==========================================
  // SPECIAL POWERS & PERCENTAGES
  // ==========================================
  {
    id: 'spec-reversible-percentages',
    title: 'Reversible Percentages (x% of y = y% of x)',
    category: 'special',
    badge: 'Mind Bender',
    difficulty: 'Intermediate',
    summary: 'Flip difficult percentages into trivial ones: 16% of 25 is just 25% of 16!',
    formula: 'x\\% \\times y = y\\% \\times x',
    rule: 'Whenever you see an awkward percentage of a friendly number (like 50, 25, 20, 10), flip them around! "18% of 50" looks hard, but "50% of 18" is just half of 18, which is 9!',
    whyItWorks: 'x% × y = (x × y) / 100 = (y × x) / 100 = y% × x. Commutative property of multiplication.',
    examples: [
      {
        problem: '16% of 25',
        steps: [
          'Flip: calculate 25% of 16 instead.',
          '25% is just one quarter (÷ 4).',
          '16 ÷ 4 = 4'
        ],
        answer: '4'
      },
      {
        problem: '18% of 50',
        steps: [
          'Flip: 50% of 18',
          '50% is half (÷ 2).',
          '18 ÷ 2 = 9'
        ],
        answer: '9'
      },
      {
        problem: '64% of 75',
        steps: [
          'Flip: 75% of 64',
          '75% is 3/4 of 64.',
          '64 ÷ 4 = 16, and 16 × 3 = 48'
        ],
        answer: '48'
      }
    ],
    generateProblem: () => {
      const bases = [50, 25, 20];
      const base = bases[Math.floor(Math.random() * bases.length)];
      let other;
      if (base === 50) {
        other = (Math.floor(Math.random() * 30) + 4) * 2; // even
      } else if (base === 25) {
        other = (Math.floor(Math.random() * 20) + 3) * 4; // mult of 4
      } else {
        other = (Math.floor(Math.random() * 20) + 3) * 5; // mult of 5
      }
      const ans = (other * base) / 100;
      return {
        problem: `${other}% of ${base}`,
        answer: ans,
        stepsHint: [
          `Flip: calculate ${base}% of ${other}`,
          `${base}% is ${base === 50 ? 'half (÷ 2)' : base === 25 ? 'quarter (÷ 4)' : 'one fifth (÷ 5)'}`,
          `Result: ${ans}`
        ]
      };
    }
  },

  {
    id: 'spec-butterfly-fractions',
    title: 'Fraction Butterfly Method (Cross-Sum)',
    category: 'special',
    badge: 'Visual Shortcut',
    difficulty: 'Intermediate',
    summary: 'Multiply along the diagonals for the top, multiply denominators for the bottom.',
    formula: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}',
    rule: 'To add or subtract two fractions without finding the least common multiple: multiply diagonal 1 (a × d) and diagonal 2 (b × c). Add or subtract these for the numerator. Multiply denominators (b × d) for the denominator.',
    whyItWorks: 'Standard cross-multiplication to common denominator bd: a/b = ad/bd, c/d = bc/bd.',
    examples: [
      {
        problem: '2/3 + 1/5',
        steps: [
          'Diagonal 1: 2 × 5 = 10',
          'Diagonal 2: 3 × 1 = 3',
          'Numerator: 10 + 3 = 13',
          'Denominator: 3 × 5 = 15',
          'Answer: 13/15'
        ],
        answer: '13/15'
      },
      {
        problem: '3/4 - 2/7',
        steps: [
          'Diagonal 1: 3 × 7 = 21',
          'Diagonal 2: 4 × 2 = 8',
          'Numerator: 21 - 8 = 13',
          'Denominator: 4 × 7 = 28',
          'Answer: 13/28'
        ],
        answer: '13/28'
      }
    ],
    generateProblem: () => {
      const d1 = Math.floor(Math.random() * 4) + 2; // 2-5
      const d2 = Math.floor(Math.random() * 5) + 3; // 3-7
      if (d1 === d2) return { problem: '1/3 + 1/4', answer: '7/12', stepsHint: ['1×4 + 3×1 = 7', '3×4 = 12', '7/12'] };
      const n1 = 1;
      const n2 = 1;
      const num = n1 * d2 + n2 * d1;
      const den = d1 * d2;
      return {
        problem: `${n1}/${d1} + ${n2}/${d2}`,
        answer: `${num}/${den}`,
        stepsHint: [
          `Cross 1: ${n1} × ${d2} = ${n1 * d2}`,
          `Cross 2: ${n2} × ${d1} = ${n2 * d1}`,
          `Numerator: ${n1 * d2} + ${n2 * d1} = ${num}`,
          `Denominator: ${d1} × ${d2} = ${den}`,
          `Fraction: ${num}/${den}`
        ]
      };
    }
  },

  {
    id: 'spec-day-of-week',
    title: 'Doomsday / Calendar Mental Day of Week',
    category: 'special',
    badge: 'Genius Feat',
    difficulty: 'Master',
    summary: 'Determine the exact day of the week for any date in seconds using modular math.',
    formula: '\\text{Day} = (\\text{Century} + \\text{Year} + \\text{Month} + \\text{Day}) \\pmod 7',
    rule: 'Every month has a key (e.g. standard Gregorian: Jan=0, Feb=3, Mar=3, Apr=6, May=1, Jun=4, Jul=6, Aug=2, Sep=5, Oct=0, Nov=3, Dec=5). Add the Century code + Year code + Month key + Day of month, and take remainder modulo 7 (0=Sunday, 1=Monday, ..., 6=Saturday).',
    whyItWorks: 'Days cycle every 7 days. Because normal years have 365 days = 52 weeks + 1 day, the day shifts by 1 day each year (and 2 on leap years). Century leap rules make century shifts periodic.',
    examples: [
      {
        problem: 'October 14, 2023',
        steps: [
          'Century 2000s code = 6',
          'Year 23: 23 + floor(23/4) = 23 + 5 = 28 mod 7 = 0',
          'Month key for October = 0',
          'Day number = 14 mod 7 = 0',
          'Total: 6 + 0 + 0 + 0 = 6 = Saturday!'
        ],
        answer: 'Saturday'
      }
    ],
    generateProblem: () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const y = Math.floor(Math.random() * 25) + 2000;
      const mIdx = Math.floor(Math.random() * 12);
      const d = Math.floor(Math.random() * 28) + 1;
      const date = new Date(y, mIdx, d);
      const ans = days[date.getDay()];
      return {
        problem: `${months[mIdx]} ${d}, ${y}`,
        answer: ans,
        stepsHint: [
          `Calculate modulo 7 offsets for year ${y}`,
          `Add month code for ${months[mIdx]}`,
          `Add day ${d}`,
          `Result: ${ans}`
        ]
      };
    }
  },

  {
    id: 'mult-101',
    title: 'Multiplying 2-Digit Numbers by 101',
    category: 'multiplication',
    badge: 'Double Repeat',
    difficulty: 'Beginner',
    summary: 'Any 2-digit number multiplied by 101 simply repeats itself: ab × 101 = abab.',
    formula: 'ab \\times 101 = abab',
    rule: 'To multiply any two-digit number by 101, write the two-digit number twice in a row.',
    whyItWorks: '101 × ab = (100 + 1) × ab = 100(ab) + ab = ab00 + ab = abab.',
    examples: [
      {
        problem: '47 × 101',
        steps: [
          'Repeat 47 twice: 4747'
        ],
        answer: '4747'
      },
      {
        problem: '83 × 101',
        steps: [
          'Repeat 83 twice: 8383'
        ],
        answer: '8383'
      }
    ],
    generateProblem: () => {
      const num = Math.floor(Math.random() * 88) + 11;
      const ans = num * 101;
      return {
        problem: `${num} × 101`,
        answer: ans,
        stepsHint: [
          `Repeat the two digits: ${num}${num}`,
          `Result: ${ans}`
        ]
      };
    }
  },

  {
    id: 'mult-12',
    title: 'Multiplying by 12 (Shift and Double)',
    category: 'multiplication',
    badge: 'Base 10 + 2',
    difficulty: 'Beginner',
    summary: 'Multiply by 10 (add a zero), then add double the original number.',
    formula: 'n \\times 12 = 10n + 2n',
    rule: 'To multiply any number by 12, take 10 times the number and add twice the number.',
    whyItWorks: 'Distributive property: 12 × n = (10 + 2) × n = 10n + 2n.',
    examples: [
      {
        problem: '35 × 12',
        steps: [
          '35 × 10 = 350',
          '35 × 2 = 70',
          '350 + 70 = 420'
        ],
        answer: '420'
      },
      {
        problem: '48 × 12',
        steps: [
          '48 × 10 = 480',
          '48 × 2 = 96',
          '480 + 96 = 576'
        ],
        answer: '576'
      }
    ],
    generateProblem: () => {
      const num = Math.floor(Math.random() * 70) + 12;
      const ans = num * 12;
      return {
        problem: `${num} × 12`,
        answer: ans,
        stepsHint: [
          `${num} × 10 = ${num * 10}`,
          `${num} × 2 = ${num * 2}`,
          `${num * 10} + ${num * 2} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'mult-general-square',
    title: 'Squaring Any 2-Digit Number',
    category: 'multiplication',
    badge: 'Universal Master',
    difficulty: 'Master',
    summary: 'Square tens, square units, and add double the cross-product.',
    formula: '(a + b)^2 = a^2 + 2ab + b^2',
    rule: 'Split into tens (a) and units (b). Compute a² (in hundreds), 2×a×b (in tens), and b² (in ones). Add them together mentally.',
    whyItWorks: '(10a + b)^2 = 100a^2 + 20ab + b^2.',
    examples: [
      {
        problem: '32²',
        steps: [
          'a = 30, b = 2',
          '30² = 900',
          '2 × 30 × 2 = 120',
          '2² = 4',
          '900 + 120 + 4 = 1024'
        ],
        answer: '1024'
      },
      {
        problem: '43²',
        steps: [
          '40² = 1600',
          '2 × 40 × 3 = 240',
          '3² = 9',
          '1600 + 240 + 9 = 1849'
        ],
        answer: '1849'
      }
    ],
    generateProblem: () => {
      const tens = Math.floor(Math.random() * 6) + 2; // 2-7
      const units = Math.floor(Math.random() * 4) + 1; // 1-4 for clean mental calc
      const num = tens * 10 + units;
      const ans = num * num;
      const a2 = (tens * 10) * (tens * 10);
      const ab2 = 2 * (tens * 10) * units;
      const b2 = units * units;
      return {
        problem: `${num}²`,
        answer: ans,
        stepsHint: [
          `(${tens * 10})² = ${a2}`,
          `2 × ${tens * 10} × ${units} = ${ab2}`,
          `${units}² = ${b2}`,
          `${a2} + ${ab2} + ${b2} = ${ans}`
        ]
      };
    }
  },

  {
    id: 'div-rules-3-9',
    title: 'Divisibility Test for 3 and 9',
    category: 'division',
    badge: 'Instant Check',
    difficulty: 'Beginner',
    summary: 'A number is divisible by 3 (or 9) if the sum of its digits is divisible by 3 (or 9).',
    formula: '\\sum d_i \\equiv N \\pmod 9',
    rule: 'Add up the digits of the number. If the digit sum is 3, 6, 9, 12..., the number divides cleanly by 3. If the sum is 9, 18, 27..., it divides cleanly by 9.',
    whyItWorks: 'Powers of 10 leave remainder 1 modulo 9 and 3: 10^k = 99..9 + 1 = 1 mod 9. Hence every place value contributes only its digit!',
    examples: [
      {
        problem: 'Is 258 divisible by 3? If so, what is 258 ÷ 3?',
        steps: [
          'Sum of digits: 2 + 5 + 8 = 15.',
          '15 is divisible by 3, so 258 divides cleanly by 3.',
          '240 ÷ 3 = 80, 18 ÷ 3 = 6 -> 86'
        ],
        answer: '86'
      }
    ],
    generateProblem: () => {
      const q = Math.floor(Math.random() * 70) + 15;
      const num = q * 3;
      return {
        problem: `${num} ÷ 3`,
        answer: q,
        stepsHint: [
          `Sum of digits: ${String(num).split('').join(' + ')} = ${String(num).split('').reduce((s, d) => s + parseInt(d), 0)}`,
          `Since sum is divisible by 3, division has no remainder`,
          `Result: ${q}`
        ]
      };
    }
  }
];

window.MENTAL_MATH_TRICKS = MENTAL_MATH_TRICKS;
