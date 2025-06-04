// src/lib/codeSnippets.ts

interface LanguageBoilerplates {
  [key: string]: string;
}

export const codeSnippets: LanguageBoilerplates = {
  javascript: `function solve() {
  // Write your JavaScript code here
  console.log("Hello from JavaScript!");
  // Example for Two Sum problem:
  // const nums = [2, 7, 11, 15];
  // const target = 9;
  // const result = [0, 1];
  // console.log("Expected:", result);
  }

  solve();`,

  python: `def solve():
    # Write your Python code here
    print("Hello from Python!")
    # Example for Two Sum problem:
    # nums = [2, 7, 11, 15]
    # target = 9
    # result = [0, 1]
    # print("Expected:", result)

# Call the solve function
solve()`,
  cpp: `#include <iostream>
  using namespace std;

  void solve() {
      // Write your C++ code here
      cout << "Hello from C++!" << endl;
      // Example for Two Sum problem:
      // vector<int> nums = {2, 7, 11, 15};
      // int target = 9;
      // vector<int> result = 
      // {0, 1};
      // cout << "Expected: [0, 1]" << endl;
  }

  int main() {
      solve();
      return 0;
  }`,
  java: `public class Solution {
    public static void solve() {
        // Write your Java code here
        System.out.println("Hello from Java!");
        // Example for Two Sum problem:
        // int[] nums = {2, 7, 11, 15};
        // int target = 9;
        // int[] result = {0, 1};
        // System.out.println("Expected: [0, 1]");
    }

    public static void main(String[] args) {
        solve();
    }
  }`,
  // You can add more languages here
};

export const getBoilerplate = (language: string): string => {
  return codeSnippets[language] || codeSnippets.javascript; // Fallback to JavaScript
};