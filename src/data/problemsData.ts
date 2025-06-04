// src/data/problemsData.ts

export interface ProblemData {
  id: string;
  title: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  language: string;
}

export const problems: ProblemData[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: `nums = [2,7,11,15], target = 9`,
        output: `[0,1]`,
        explanation: `Because nums[0] + nums[1] == 9, we return [0, 1].`
      },
      {
        input: `nums = [3,2,4], target = 6`,
        output: `[1,2]`
      }
    ],
    constraints: [
      `\`2 <= nums.length <= 10^4\``,
      `\`-10^9 <= nums[i] <= 10^9\``,
      `\`-10^9 <= target <= 10^9\``,
      `Only one valid answer exists.`
    ],
    language: 'javascript'
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: `s = ["h","e","l","l","o"]`,
        output: `["o","l","l","e","h"]`
      },
      {
        input: `s = ["H","a","n","n","a","h"]`,
        output: `["h","a","n","n","a","H"]`
      }
    ],
    constraints: [
      `\`1 <= s.length <= 10^5\``,
      `\`s[i]\` is a printable ascii character.`,
    ],
    language: 'javascript'
  },
  {
    id: "python-example",
    title: "Python Example",
    description: `This is a simple Python example to demonstrate language switching.`,
    examples: [
      {
        input: `print("Hello from Python")`,
        output: `Hello from Python`
      }
    ],
    constraints: [],
    language: 'python'
  },
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".`,
    examples: [
      {
        input: `strs = ["flower","flow","flight"]`,
        output: `"fl"`,
        explanation: `The common prefix is "fl".`
      },
      {
        input: `strs = ["dog","racecar","car"]`,
        output: `""`,
        explanation: `There is no common prefix among the input strings.`
      }
    ],
    constraints: [
      `\`1 <= strs.length <= 200\``,
      `\`0 <= strs[i].length <= 200\``,
      `\`strs[i]\` consists of only lowercase English letters.`,
    ],
    language: 'javascript'
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: `s = "()"`,
        output: `true`
      },
      {
        input: `s = "()[]{}"`,
        output: `true`
      },
      {
        input: `s = "(]"`,
        output: `false`
      }
    ],
    constraints: [
      `\`1 <= s.length <= 10^4\``,
      `\`s\` consists of parentheses only '()[]{}'.`,
    ],
    language: 'javascript'
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into a single **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: `list1 = [1,2,4], list2 = [1,3,4]`,
        output: `[1,1,2,3,4,4]`
      },
      {
        input: `list1 = [], list2 = []`,
        output: `[]`
      },
      {
        input: `list1 = [], list2 = [0]`,
        output: `[0]`
      }
    ],
    constraints: [
      `The number of nodes in both lists is in the range \`[0, 50]\`.`,
      `\`-100 <= Node.val <= 100\``,
      `Both \`list1\` and \`list2\` are sorted in non-decreasing order.`,
    ],
    language: 'javascript'
  },
  {
    id: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    description: `Given an integer array \`nums\` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same. Then return the number of unique elements in \`nums\`.

Consider the number of unique elements of \`nums\` to be \`k\`. To be accepted, you need to return \`k\`.

Your solution must use O(1) extra space.`,
    examples: [
      {
        input: `nums = [1,1,2]`,
        output: `2, nums = [1,2,_]`,
        explanation: `Your function should return \`k = 2\`, with the first two elements of \`nums\` being \`1\` and \`2\` respectively.
It does not matter what you leave beyond the returned \`k\` (hence they are underscores).`
      },
      {
        input: `nums = [0,0,1,1,1,2,2,3,3,4]`,
        output: `5, nums = [0,1,2,3,4,_,_,_,_,_]`,
        explanation: `Your function should return \`k = 5\`, with the first five elements of \`nums\` being \`0, 1, 2, 3, and 4\` respectively.
It does not matter what you leave beyond the returned \`k\` (hence they are underscores).`
      }
    ],
    constraints: [
      `\`0 <= nums.length <= 3 * 10^4\``,
      `\`-100 <= nums[i] <= 100\``,
      `\`nums\` is sorted in **non-decreasing order**.`,
    ],
    language: 'javascript'
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
        output: `[3,4]`
      }
    ],
    constraints: [],
    language: 'javascript'
  },
  {
    id: "problem-9",
    title: "Search Insert Position",
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: `nums = [1,3,5,6], target = 5`,
        output: `2`
      }
    ],
    constraints: [],
    language: 'javascript'
  },
  {
    id: "problem-10",
    title: "Combination Sum",
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

The same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    examples: [
      {
        input: `candidates = [2,3,6,7], target = 7`,
        output: `[[2,2,3],[7]]`
      }
    ],
    constraints: [],
    language: 'javascript'
  },
  {
    id: "problem-11",
    title: "Valid Sudoku",
    description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.`,
    examples: [
      // Sudoku examples are usually large, omitting for brevity
      { input: `board = [["5","3",".", ... ]`, output: `true` }
    ],
    constraints: [],
    language: 'javascript'
  },
  {
    id: "problem-12",
    title: "Count and Say",
    description: `The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
\`countAndSay(1) = "1"\`
\`countAndSay(n)\` is the way you would "say" the digit string from \`countAndSay(n-1)\`, which is then converted into a different digit string.`,
    examples: [
      { input: `n = 4`, output: `"1211"` }
    ],
    constraints: [],
    language: 'javascript'
  },
  {
    id: "cpp-hello-world", // Give it a unique ID
    title: "C++ Hello World",
    description: `Write a C++ program that prints "Hello, World!" to the console.`,
    examples: [
      {
        input: `(No input needed)`,
        output: `Hello, World!`
      }
    ],
    constraints: [],
    language: 'cpp' // *** THIS IS THE KEY CHANGE ***
  },
  {
    id: "sum-of-two-cpp",
    title: "C++ Sum of Two Numbers",
    description: `Given two integers 'a' and 'b', return their sum.`,
    examples: [
      {
        input: `a = 5, b = 3`,
        output: `8`
      },
      {
        input: `a = -1, b = 1`,
        output: `0`
      }
    ],
    constraints: [
      `\`-1000 <= a, b <= 1000\``
    ],
    language: 'cpp' // Another C++ example
  },
  // ... (add more problems or existing ones)
];