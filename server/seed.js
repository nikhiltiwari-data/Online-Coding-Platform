const Problem = require('./models/Problem');

const t = (input, output, hidden = true) => ({ input, output, hidden });

const problems = [
  {
    title: 'Sum of Two Numbers', difficulty: 'Easy',
    description: 'Given two integers A and B, print their sum.',
    inputFormat: 'A single line with two integers A and B separated by space.',
    outputFormat: 'Print A + B.',
    constraints: '-10^9 ≤ A, B ≤ 10^9',
    testCases: [t('2 3\n', '5\n', false), t('-5 10\n', '5\n', false), t('1000000000 1000000000\n', '2000000000\n'), t('0 0\n', '0\n'), t('-7 -8\n', '-15\n')],
  },
  {
    title: 'Even or Odd', difficulty: 'Easy',
    description: 'Given an integer N, print "Even" if it is even, otherwise print "Odd".',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print Even or Odd.',
    constraints: '-10^9 ≤ N ≤ 10^9',
    testCases: [t('4\n', 'Even\n', false), t('7\n', 'Odd\n', false), t('0\n', 'Even\n'), t('-3\n', 'Odd\n'), t('1000000000\n', 'Even\n')],
  },
  {
    title: 'Reverse a String', difficulty: 'Easy',
    description: 'Given a string S (no spaces), print it reversed.',
    inputFormat: 'A single string S.',
    outputFormat: 'Print the reversed string.',
    constraints: '1 ≤ |S| ≤ 1000',
    testCases: [t('hello\n', 'olleh\n', false), t('abc\n', 'cba\n', false), t('a\n', 'a\n'), t('racecar\n', 'racecar\n'), t('OpenAI\n', 'IAnepO\n')],
  },
  {
    title: 'Factorial', difficulty: 'Easy',
    description: 'Given N, print N! (factorial of N).',
    inputFormat: 'A single integer N.',
    outputFormat: 'Print N!.',
    constraints: '0 ≤ N ≤ 15',
    testCases: [t('5\n', '120\n', false), t('0\n', '1\n', false), t('1\n', '1\n'), t('10\n', '3628800\n'), t('15\n', '1307674368000\n')],
  },
  {
    title: 'Palindrome Check', difficulty: 'Medium',
    description: 'Given a string S, print "YES" if it is a palindrome, otherwise "NO". The check is case-sensitive.',
    inputFormat: 'A single string S (no spaces).',
    outputFormat: 'Print YES or NO.',
    constraints: '1 ≤ |S| ≤ 10^5',
    testCases: [t('madam\n', 'YES\n', false), t('hello\n', 'NO\n', false), t('a\n', 'YES\n'), t('abba\n', 'YES\n'), t('Aba\n', 'NO\n')],
  },
  {
    title: 'Maximum in Array', difficulty: 'Medium',
    description: 'Given an array of N integers, print the maximum element.',
    inputFormat: 'First line: N. Second line: N space-separated integers.',
    outputFormat: 'Print the maximum element.',
    constraints: '1 ≤ N ≤ 10^5, -10^9 ≤ a[i] ≤ 10^9',
    testCases: [t('5\n1 5 3 9 2\n', '9\n', false), t('3\n-1 -5 -3\n', '-1\n', false), t('1\n42\n', '42\n'), t('4\n7 7 7 7\n', '7\n'), t('6\n-10 0 10 20 -20 5\n', '20\n')],
  },
];

module.exports = async () => {
  if ((await Problem.countDocuments()) === 0) {
    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} sample problems`);
  }
};
