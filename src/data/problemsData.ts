// src/data/problemsData.ts

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ProblemData {
  id: string;
  title: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  language: string;
  boilerplate?: string; // Optional boilerplate code for the problem
  testCases: TestCase[]; // Required array of test cases
  solutionBoilerplate?: string;
}

export const problems: ProblemData[] = [
  {
    id: "problem-1",
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: `nums = [2,7,11,15], target = 9`,
        output: `[0,1]`,
        explanation: `Because nums[0] + nums[1] == 9, we return [0, 1].`,
      },
      {
        input: `nums = [3,2,4], target = 6`,
        output: `[1,2]`,
      },
    ],
    constraints: [
      `\`2 <= nums.length <= 10^4\``,
      `\`-10^9 <= nums[i] <= 10^9\``,
      `\`-10^9 <= target <= 10^9\``,
      `Only one valid answer exists.`,
    ],
    language: "javascript",
    boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const nums = parsedInput[0];
const target = parsedInput[1];
console.log(JSON.stringify(twoSum(nums, target)));
`,
    testCases: [
      {
        input: `[[2,7,11,15],9]`, // Changed to single JSON array for all parameters
        expectedOutput: `[0,1]`,
      },
      {
        input: `[[3,2,4],6]`,
        expectedOutput: `[1,2]`,
      },
      {
        input: `[[3,3],6]`,
        expectedOutput: `[0,1]`,
      },
      {
        input: `[[1,2,3,4,5,6,7],13]`,
        expectedOutput: `[5,6]`,
      },
    ],
    solutionBoilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return [];
}


// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const nums = parsedInput[0];
const target = parsedInput[1];
console.log(JSON.stringify(twoSum(nums, target)));
`,
  },

  {
    id: "problem-2",
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: `s = ["h","e","l","l","o"]`,
        output: `["o","l","l","e","h"]`,
      },
      {
        input: `s = ["H","a","n","n","a","h"]`,
        output: `["h","a","n","n","a","H"]`,
      },
    ],
    constraints: [
      `\`1 <= s.length <= 10^5\``,
      `\`s[i]\` is a printable ascii character.`,
    ],
    language: "javascript",
    boilerplate: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const s = JSON.parse(inputFromStdin); 
reverseString(s);
console.log(JSON.stringify(s)); 
`,
    testCases: [
      {
        input: `["h","e","l","l","o"]`,
        expectedOutput: `["o","l","l","e","h"]`,
      },
      {
        input: `["H","a","n","n","a","h"]`,
        expectedOutput: `["h","a","n","n","a","H"]`,
      },
      {
        input: `["a"]`,
        expectedOutput: `["a"]`,
      },
      {
        input: `["a","b"]`,
        expectedOutput: `["b","a"]`,
      },
    ],
    solutionBoilerplate: `
    /**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Swap characters
        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;

        // Move pointers
        left++;
        right--;
    }
}
  

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const s = JSON.parse(inputFromStdin); 
reverseString(s);
console.log(JSON.stringify(s)); 
    `,
  },

  {
    id: "problem-3",
    title: "Python Example",
    description: `This is a simple Python example to demonstrate language switching. It takes a name as input and prints a greeting.`,
    examples: [
      {
        input: `print("Hello from Python")`,
        output: `Hello from Python`,
      },
    ],
    constraints: [],
    language: "python",
    boilerplate: `import sys

def greet(name):
    # Your logic here
    

# --- Input/Output Handling for Backend ---
# Do not touch this part of the code.
name_input = sys.stdin.read().strip()
greet(name_input)
`,
    testCases: [
      {
        input: `World`,
        expectedOutput: `Hello, World!`,
      },
      {
        input: `Prepverse`,
        expectedOutput: `Hello, Prepverse!`,
      },
    ],
    solutionBoilerplate: `import sys
def greet(name):
    # Your logic here
    print(f"Hello, {name}!")

# --- Input/Output Handling for Backend ---
# Do not touch this part of the code.
name_input = sys.stdin.read().strip()
greet(name_input)`,
  },

  {
    id: "problem-4",
    title: "Longest Common Prefix",
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".`,
    examples: [
      {
        input: `strs = ["flower","flow","flight"]`,
        output: `"fl"`,
        explanation: `The common prefix is "fl".`,
      },
      {
        input: `strs = ["dog","racecar","car"]`,
        output: `""`,
        explanation: `There is no common prefix among the input strings.`,
      },
    ],
    constraints: [
      `\`1 <= strs.length <= 200\``,
      `\`0 <= strs[i].length <= 200\``,
      `\`strs[i]\` consists of only lowercase English letters.`,
    ],
    language: "javascript",
    boilerplate: `/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const strs = JSON.parse(inputFromStdin); // Input is a JSON string representing an array of strings
console.log(longestCommonPrefix(strs));
`,
    testCases: [
      {
        input: `["flower","flow","flight"]`,
        expectedOutput: `fl`,
      },
      {
        input: `["dog","racecar","car"]`,
        expectedOutput: `""`,
      },
      {
        input: `["apple","apricot","apply"]`,
        expectedOutput: `ap`,
      },
    ],
    solutionBoilerplate: `
    /**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") {
                return "";
            }
        }
    }

    return prefix;
}


// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const strs = JSON.parse(inputFromStdin); // Input is a JSON string representing an array of strings
console.log(longestCommonPrefix(strs));
`,
  },

  {
    id: "problem-5",
    title: "Valid Parentheses",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: `s = "()"`,
        output: `true`,
      },
      {
        input: `s = "()[]{}"`,
        output: `true`,
      },
      {
        input: `s = "(]"`,
        output: `false`,
      },
    ],
    constraints: [
      `\`1 <= s.length <= 10^4\``,
      `\`s\` consists of parentheses only '()[]{}'.`,
    ],
    language: "javascript",
    boilerplate: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const s = JSON.parse(inputFromStdin);
console.log(isValid(s));
`,
    testCases: [
      {
        input: `"()"`,
        expectedOutput: `true`,
      },
      {
        input: `"()[]{}"`,
        expectedOutput: `true`,
      },
      {
        input: `"(]"`,
        expectedOutput: `false`,
      },
      {
        input: `"([{}])"`,
        expectedOutput: `true`,
      },
      {
        input: `"{[]}"`,
        expectedOutput: `true`,
      },
    ],
    solutionBoilerplate: `
    /**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const map = {
        "(": ")",
        "{": "}",
        "[": "]",
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (map[char]) {
            // It's an opening bracket
            stack.push(char);
        } else {
            // It's a closing bracket
            if (stack.length === 0) {
                return false; // No opening bracket to match
            }

            const lastOpen = stack.pop();
            if (map[lastOpen] !== char) {
                return false; // Mismatched brackets
            }
        }
    }

    return stack.length === 0; // True if all brackets are matched
}


// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const s = JSON.parse(inputFromStdin);
console.log(isValid(s));
    `,
  },

  {
    id: "problem-6",
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into a single **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: `list1 = [1,2,4], list2 = [1,3,4]`,
        output: `[1,1,2,3,4,4]`,
      },
      {
        input: `list1 = [], list2 = []`,
        output: `[]`,
      },
      {
        input: `list1 = [], list2 = [0]`,
        output: `[0]`,
      },
    ],
    constraints: [
      `The number of nodes in both lists is in the range \`[0, 50]\`.`,
      `\`-100 <= Node.val <= 100\``,
      `Both \`list1\` and \`list2\` are sorted in non-decreasing order.`,
    ],
    language: "javascript",
    boilerplate: `
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Your logic here
    // Implement the merging of two sorted linked lists.
}

// --- Helper functions for Linked List (for Input/Output handling) ---
// Do not touch this part of the code.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
// The following functions are for internal test environment use only.
// They convert arrays to linked lists and vice-versa for input/output processing.
function arrayToLinkedList(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}
function linkedListToArray(head) {
    const arr = [];
    let current = head;
    while (current) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const arr1 = parsedInput[0];
const arr2 = parsedInput[1];
const list1 = arrayToLinkedList(arr1);
const list2 = arrayToLinkedList(arr2);
const mergedList = mergeTwoLists(list1, list2);
console.log(JSON.stringify(linkedListToArray(mergedList)));
    `,
    testCases: [
      {
        input: `[[1,2,4],[1,3,4]]`, // Changed to single JSON array for all parameters
        expectedOutput: `[1,1,2,3,4,4]`,
      },
      {
        input: `[[],[]]`,
        expectedOutput: `[]`,
      },
      {
        input: `[[],[0]]`,
        expectedOutput: `[0]`,
      },
    ],
    solutionBoilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    let head;
    if (list1.val <= list2.val) {
        head = list1;
        list1 = list1.next;
    } else {
        head = list2;
        list2 = list2.next;
    }

    let current = head;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    if (list1) {
        current.next = list1;
    } else if (list2) {
        current.next = list2;
    }

    return head;
}


// --- Helper functions for Linked List (for Input/Output handling) ---
// Do not touch this part of the code.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
// The following functions are for internal test environment use only.
// They convert arrays to linked lists and vice-versa for input/output processing.
function arrayToLinkedList(arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}
function linkedListToArray(head) {
    const arr = [];
    let current = head;
    while (current) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const arr1 = parsedInput[0];
const arr2 = parsedInput[1];
const list1 = arrayToLinkedList(arr1);
const list2 = arrayToLinkedList(arr2);
const mergedList = mergeTwoLists(list1, list2);
console.log(JSON.stringify(linkedListToArray(mergedList)));  
`,
  },

  {
    id: "problem-7",
    title: "Remove Duplicates from Sorted Array",
    description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same. Then return the number of unique elements in \`nums\`.

Consider the number of unique elements of \`nums\` to be \`k\`. To be accepted, you need to return \`k\`.

Your solution must use O(1) extra space.`,
    examples: [
      {
        input: `nums = [1,1,2]`,
        output: `2, nums = [1,2,_]`,
        explanation: `Your function should return \`k = 2\`, with the first two elements of \`nums\` being \`1\` and \`2\` respectively.
It does not matter what you leave beyond the returned \`k\` (hence they are underscores).`,
      },
      {
        input: `nums = [0,0,1,1,1,2,2,3,3,4]`,
        output: `5, nums = [0,1,2,3,4,_,_,_,_,_]`,
        explanation: `Your function should return \`k = 5\`, with the first five elements of \`nums\` being \`0, 1, 2, 3, and 4\` respectively.
It does not matter what you leave beyond the returned \`k\` (hence they are underscores).`,
      },
    ],
    constraints: [
      `\`0 <= nums.length <= 3 * 10^4\``,
      `\`-100 <= nums[i] <= 100\``,
      `\`nums\` is sorted in **non-decreasing order**.`,
    ],
    language: "javascript",
    boilerplate: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const nums = JSON.parse(inputFromStdin); 
const k = removeDuplicates(nums);
console.log(k);
`,
    testCases: [
      {
        input: `[1,1,2]`,
        expectedOutput: `2`,
      },
      {
        input: `[0,0,1,1,1,2,2,3,3,4]`,
        expectedOutput: `5`,
      },
      {
        input: `[1,1,1,1,1]`,
        expectedOutput: `1`,
      },
    ],
    solutionBoilerplate: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    if (nums.length === 0) {
        return 0;
    }

    let i = 0; // Pointer for unique elements
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1; // k unique elements
}


// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const nums = JSON.parse(inputFromStdin); 
const k = removeDuplicates(nums);
console.log(k);
  `,
  },

  {
    id: "problem-8",
    title: "Find First and Last Position of Element in Sorted Array",
    description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.

If \`target\` is not found in the array, return \`[-1, -1]\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: `nums = [5,7,7,8,8,10], target = 8`,
        output: `[3,4]`,
      },
    ],
    constraints: [],
    language: "javascript",
    boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const nums = parsedInput[0];
const target = parsedInput[1];
console.log(JSON.stringify(searchRange(nums, target)));
`,
    testCases: [
      {
        input: `[[5,7,7,8,8,10],8]`, // Changed to single JSON array for all parameters
        expectedOutput: `[3,4]`,
      },
      {
        input: `[[5,7,7,8,8,10],6]`,
        expectedOutput: `[-1,-1]`,
      },
      {
        input: `[[],0]`,
        expectedOutput: `[-1,-1]`,
      },
    ],
    solutionBoilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    const findFirst = (arr, target) => {
        let low = 0;
        let high = arr.length - 1;
        let result = -1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (arr[mid] === target) {
                result = mid;
                high = mid - 1; // Try to find an even earlier occurrence
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    };

    const findLast = (arr, target) => {
        let low = 0;
        let high = arr.length - 1;
        let result = -1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (arr[mid] === target) {
                result = mid;
                low = mid + 1; // Try to find an even later occurrence
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    };

    const first = findFirst(nums, target);
    const last = findLast(nums, target);

    return [first, last];
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const nums = parsedInput[0];
const target = parsedInput[1];
console.log(JSON.stringify(searchRange(nums, target)));


  `,
  },

  {
    id: "problem-9",
    title: "Search Insert Position",
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: `nums = [1,3,5,6], target = 5`,
        output: `2`,
      },
    ],
    constraints: [],
    language: "javascript",
    boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const nums = parsedInput[0];
const target = parsedInput[1];
console.log(searchInsert(nums, target));
`,
    testCases: [
      {
        input: `[[1,3,5,6],5]`, // Changed to single JSON array for all parameters
        expectedOutput: `2`,
      },
      {
        input: `[[1,3,5,6],2]`,
        expectedOutput: `1`,
      },
      {
        input: `[[1,3,5,6],7]`,
        expectedOutput: `4`,
      },
    ],
    solutionBoilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return low; // When loop ends, low is the correct insert position
}


// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const nums = parsedInput[0];
const target = parsedInput[1];
console.log(searchInsert(nums, target));
  `,
  },

  {
    id: "problem-10",
    title: "Combination Sum",
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

The same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    examples: [
      {
        input: `candidates = [2,3,6,7], target = 7`,
        output: `[[2,2,3],[7]]`,
      },
    ],
    constraints: [],
    language: "javascript",
    boilerplate: `
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    // Your logic here
}


// --- Input/Output Handling for Backend ---
// --- Do not touch this part of the code. ---
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const candidates = parsedInput[0];
const target = parsedInput[1];
const result = combinationSum(candidates, target);
result.forEach(arr => arr.sort((a, b) => a - b));
result.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
console.log(JSON.stringify(result));
    `,
    testCases: [
      {
        input: `[[2,3,6,7],7]`, // Changed to single JSON array for all parameters
        expectedOutput: `[[2,2,3],[7]]`,
      },
      {
        input: `[[2,3,5],8]`,
        expectedOutput: `[[2,2,2,2],[2,3,3],[3,5]]`, // Order must be canonical due to JSON.stringify comparison
      },
    ],
    solutionBoilerplate: `
    /**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(combination, remaining, start) {
        if (remaining === 0) {
            result.push([...combination]);
            return;
        }
        if (remaining < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            combination.push(candidates[i]);
            // Allow the same number to be chosen again (i, not i + 1)
            backtrack(combination, remaining - candidates[i], i);
            combination.pop(); // Backtrack
        }
    }

    // Sort candidates to handle duplicates if they were allowed (though problem says distinct)
    // and for canonical output sorting if needed in other contexts.
    // For this specific problem, sorting is not strictly necessary for correctness
    // but can help with uniqueness if you were to implement additional pruning.
    candidates.sort((a, b) => a - b);
    backtrack([], target, 0);
    return result;
}

// --- Input/Output Handling for Backend ---
// --- Do not touch this part of the code. ---
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const parsedInput = JSON.parse(inputFromStdin);
const candidates = parsedInput[0];
const target = parsedInput[1];
const result = combinationSum(candidates, target);
result.forEach(arr => arr.sort((a, b) => a - b));
result.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
console.log(JSON.stringify(result));
    `,
  },

  {
    id: "problem-11",
    title: "Valid Sudoku",
    description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.`,
    examples: [
      {
        input: `board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
        output: `true`,
      },
      {
        input: `board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
        output: `false`,
      },
    ],
    constraints: [],
    language: "javascript",
    boilerplate: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const board = JSON.parse(inputFromStdin);
console.log(isValidSudoku(board));
`,
    testCases: [
      {
        input: `[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]`,
        expectedOutput: `true`,
      },
    ],
    solutionBoilerplate: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    const rows = new Array(9).fill(0).map(() => new Set());
    const cols = new Array(9).fill(0).map(() => new Set());
    const boxes = new Array(9).fill(0).map(() => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const char = board[r][c];
            if (char === '.') {
                continue;
            }

            const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            if (rows[r].has(char) || cols[c].has(char) || boxes[boxIndex].has(char)) {
                return false;
            }

            rows[r].add(char);
            cols[c].add(char);
            boxes[boxIndex].add(char);
        }
    }

    return true;
}


// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const board = JSON.parse(inputFromStdin);
console.log(isValidSudoku(board));
    `,
  },

  {
    id: "problem-12",
    title: "Count and Say",
    description: `The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
\`countAndSay(1) = "1"\`
\`countAndSay(n)\` is the way you would "say" the digit string from \`countAndSay(n-1)\`, which is then converted into a different digit string.`,
    examples: [{ input: `n = 4`, output: `"1211"` }],
    constraints: [],
    language: "javascript",
    boilerplate: `/**
 * @param {number} n
 * @return {string}
 */
function countAndSay(n) {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const nFromStdin = parseInt(inputFromStdin);
console.log(countAndSay(nFromStdin));
`,
    testCases: [
      {
        input: `1`,
        expectedOutput: `"1"`,
      },
      {
        input: `2`,
        expectedOutput: `"11"`,
      },
      {
        input: `3`,
        expectedOutput: `"21"`,
      },
      {
        input: `4`,
        expectedOutput: `"1211"`,
      },
    ],
    solutionBoilerplate: `/**
 * @param {number} n
 * @return {string}
 */
function countAndSay(n) {
    if (n === 1) {
        return "1";
    }

    let prev = countAndSay(n - 1);
    let result = "";
    let count = 0;

    for (let i = 0; i < prev.length; i++) {
        count++;
        // If it's the last character or the next character is different
        if (i === prev.length - 1 || prev[i] !== prev[i + 1]) {
            result += count + prev[i];
            count = 0; // Reset count for the next sequence
        }
    }
    return result;
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
const inputFromStdin = require('fs').readFileSync(0, 'utf8').trim();
const nFromStdin = parseInt(inputFromStdin);
console.log(countAndSay(nFromStdin));
`,
  },

  {
    id: "problem-13",
    title: "C++ Hello World",
    description: `Write a C++ program that prints "Hello, World!" to the console.`,
    examples: [
      {
        input: `(No input needed)`,
        output: `Hello, World!`,
      },
    ],
    constraints: [],
    language: "cpp",
    boilerplate: `#include <iostream>

void solve() {
// Your logic here (or directly in main for simple print)
}
      
// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
int main() {
    solve();
    return 0;
}
`,
    testCases: [
      {
        input: ``, // No input needed for Hello World
        expectedOutput: `Hello, World!`,
      },
    ],
    solutionBoilerplate: `#include <iostream>

void solve() {
    std::cout << "Hello, World!" << std::endl;
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
int main() {
    solve();
    return 0;
}
`,
  },
  
  {
    id: "problem-14",
    title: "C++ Sum of Two Numbers",
    description: `Given two integers 'a' and 'b', return their sum. The input will be provided on two separate lines.`,
    examples: [
      {
        input: `a = 5, b = 3`,
        output: `8`,
      },
      {
        input: `a = -1, b = 1`,
        output: `0`,
      },
    ],
    constraints: [`\`-1000 <= a, b <= 1000\``],
    language: "cpp",
    boilerplate: `#include <iostream>
#include <string> // For getline if needed, but cin >> handles spaces/newlines

using namespace std;

// Your logic will go here
void solve() {
    // Your logic here
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
int main() {
    solve();
    return 0;
}
`,
    testCases: [
      {
        input: `5 3`, // Changed to space-separated, no \n
        expectedOutput: `8`,
      },
      {
        input: `-1 1`, // Changed to space-separated, no \n
        expectedOutput: `0`,
      },
      {
        input: `100 200`, // Changed to space-separated, no \n
        expectedOutput: `300`,
      },
    ],
    solutionBoilerplate: `#include <iostream>
#include <string> // For getline if needed, but cin >> handles spaces/newlines

using namespace std;

void solve() {
    int a, b;
    cin >> a >> b; // Read two integers from standard input
    cout << a + b << endl; // Print their sum
}

// --- Input/Output Handling for Backend ---
// Do not touch this part of the code.
int main() {
    solve();
    return 0;
}
  `
  },

  {
    id: "problem-15", // Adding a Python two-sum example for multi-param
    title: "Python Sum of Two Numbers",
    description: `Given two integers 'a' and 'b', return their sum. The input will be provided as a JSON array.`,
    examples: [
      {
        input: `a = 5, b = 3`,
        output: `8`,
      },
      {
        input: `a = -1, b = 1`,
        output: `0`,
      },
    ],
    constraints: [`\`-1000 <= a, b <= 1000\``],
    language: "python",
    boilerplate: `import sys
import json

def sum_two_numbers(a, b):
    # Your logic here
    pass # Placeholder

# --- Input/Output Handling for Backend ---
# Do not touch this part of the code.
input_str = sys.stdin.read().strip()
parsed_input = json.loads(input_str)
a = parsed_input[0]
b = parsed_input[1]

print(sum_two_numbers(a, b))
`,
    testCases: [
      {
        input: `[5,3]`, // Single JSON array for all parameters
        expectedOutput: `8`,
      },
      {
        input: `[-1,1]`,
        expectedOutput: `0`,
      },
      {
        input: `[100,200]`,
        expectedOutput: `300`,
      },
    ],
    solutionBoilerplate: `import sys
import json

def sum_two_numbers(a, b):
    return a + b

# --- Input/Output Handling for Backend ---
# Do not touch this part of the code.
input_str = sys.stdin.read().strip()
parsed_input = json.loads(input_str)
a = parsed_input[0]
b = parsed_input[1]

print(sum_two_numbers(a, b))
`,
  },

  {
    id: "problem-16", // Adding a Java hello world
    title: "Java Hello World",
    description: `Write a Java program that prints "Hello, World!" to the console.`,
    examples: [
      {
        input: `(No input needed)`,
        output: `Hello, World!`,
      },
    ],
    constraints: [],
    language: "java",
    boilerplate: `public class Main {
    public static void main(String[] args) {
        // Your logic here
        System.out.println("Hello, World!");
    }
}
`,
    testCases: [
      {
        input: ``,
        expectedOutput: `Hello, World!`,
      },
    ],
    solutionBoilerplate: `public class Main {
  public static void main(String[] args) {
      System.out.println("Hello, World!");
  }
}
`,
  },
];
