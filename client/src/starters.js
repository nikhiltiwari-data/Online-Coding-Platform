export const LANGS = [
  { id: 'cpp', label: 'C++' },
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'java', label: 'Java' },
  { id: 'c', label: 'C' },
];

export const STARTERS = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // write your code here
    return 0;
}
`,
  python: `# write your code here
`,
  javascript: `const lines = require('fs').readFileSync(0, 'utf8').split('\\n');
// write your code here
`,
  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // write your code here
    }
}
`,
  c: `#include <stdio.h>

int main() {
    // write your code here
    return 0;
}
`,
};
