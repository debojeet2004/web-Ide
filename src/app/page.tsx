'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ProblemStatement from '@/components/ProblemStatement';
import CodeEditor from '@/components/CodeEditor';
import { runCodeAction } from './actions';
import { getBoilerplate } from '@/lib/codeSnippets';
import { problems} from '@/data/problemsData';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import clsx from 'clsx';
import { CodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResultTabs from '@/components/ResultTabs';

export interface TestRunResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

export default function HomePage() {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const currentProblem = problems[currentProblemIndex] || problems[0];
  const [activeLanguage, setActiveLanguage] = useState(currentProblem.language);

  const initialBoilerplate = currentProblem.boilerplate || getBoilerplate(currentProblem.language);
  const [code, setCode] = useState(initialBoilerplate);

  const [output, setOutput] = useState(''); // General raw output from the first test run
  const [testRunResults, setTestRunResults] = useState<TestRunResult[]>([]); // New state for detailed test results
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    if (currentProblem) {
      setActiveLanguage(currentProblem.language);
      setCode(currentProblem.boilerplate || getBoilerplate(currentProblem.language));
      setOutput(''); // Clear raw output on problem change
      setTestRunResults([]); // Clear test results on problem change
    }
  }, [currentProblemIndex, currentProblem]);

  const handleRunCode = useCallback(async () => {
    setIsLoading(true);
    setOutput('Running code...'); // Initial message for the raw output tab
    setTestRunResults([]); // Clear previous test results

    const results: TestRunResult[] = [];
    let overallError: string | undefined = undefined; // To capture first error

    for (const [index, testCase] of currentProblem.testCases.entries()) {
      const testCaseId = `case-${index + 1}`; // Simple ID for display

      // --- Keep these logs here, at the start of each test case iteration ---
      console.log(`--- Running ${testCaseId} ---`);
      console.log("Input:", testCase.input);
      // --- END of common test case start logs ---


      try {
        // IMPORTANT: We will update runCodeAction to accept stdin
        const result = await runCodeAction(code, activeLanguage, testCase.input);

        let passed = false;
        let actualOutput = result.output || '';
        let error = result.error;

        if (error) {
          // If there's an error, mark as failed and set the error message
          passed = false;
          // Capture the first error for the general output display
          if (!overallError) {
            overallError = error;
          }
        } else {
          // --- START OF MODIFIED COMPARISON LOGIC ---

          // Get the raw output from the user's code, trim whitespace (like newlines)
          const processedActualOutput = actualOutput.trim();

          // Get the expected output from problemsData.ts, trim whitespace
          let processedExpectedOutput = testCase.expectedOutput.trim();

          // Attempt to parse the expected output as JSON.
          // This will convert '"1"' into '1' (a raw string) for comparison.
          // It also handles cases where expected output might be numbers, booleans, etc.
          try {
            // Only attempt JSON.parse if it looks like a quoted string to avoid errors on raw numbers/booleans
            if (processedExpectedOutput.startsWith('"') && processedExpectedOutput.endsWith('"')) {
              const parsed = JSON.parse(processedExpectedOutput);
              // If successfully parsed and it's a string, use the parsed string value
              // (e.g., '"hello"' becomes 'hello')
              // If it's a number (e.g., JSON.parse('"123"') is 123), it's also fine.
              processedExpectedOutput = parsed;
            }
          } catch (e) {
            // If JSON.parse fails (e.g., if expectedOutput was already '1' without quotes, or invalid JSON),
            // just use the trimmed string as is.
          }

          // Finally, compare the processed outputs.
          // Use String() to ensure consistent type for comparison,
          // as JSON.parse could yield numbers/booleans from JSON string literals.
          passed = String(processedActualOutput) === String(processedExpectedOutput);
          if (passed) {
            console.log(`Test Case ${testCaseId}: PASSED`); // New console.log
          } else {
            console.log(`Test Case ${testCaseId}: FAILED`); // New console.log
            console.log("Expected:", testCase.expectedOutput); // New console.log
            console.log("Actual:", actualOutput); // New console.log
          }
          

          // --- END OF MODIFIED COMPARISON LOGIC ---
        }

        results.push({
          testCaseId,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: actualOutput,
          passed: passed,
          error: error,
        });

      } catch (error: any) {
        console.error(`Error running test case ${testCaseId}:`, error);
        const errorMessage = `Client Error running test case ${testCaseId}: ${error.message}`;
        if (!overallError) {
          overallError = errorMessage;
        }
        results.push({
          testCaseId,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: '', // No actual output on client error
          passed: false,
          error: errorMessage,
        });
        // Continue to next test case even if one fails
      }
    }

    setTestRunResults(results);

    // Update the general output tab with the first test case's raw output or an overall error
    if (overallError) {
      setOutput(`Error during execution:\n${overallError}\n\nDetailed results in 'Test Results' tab.`);
    } else if (results.length > 0) {
      // Show output of the first test case in the general output tab
      setOutput(results[0].actualOutput || 'No output received for first test case.');
    } else {
      setOutput('No test cases defined for this problem, or no output received.');
    }

    setIsLoading(false);
  }, [code, activeLanguage, currentProblem.testCases]); // Add currentProblem.testCases as a dependency

  const handleProblemChange = (index: number) => {
    if (index >= 0 && index < problems.length) {
      setCurrentProblemIndex(index);
    }
  };

  const handleLanguageChangeByUser = useCallback((newLanguage: string) => {
    setActiveLanguage(newLanguage);
    // When user explicitly changes language, load the general boilerplate for that language
    setCode(getBoilerplate(newLanguage));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 overflow-hidden"
      >
        {/* Left Panel -> Problem List and Problem Statements */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50} className="flex">
          <div className="w-10 flex-shrink-0 bg-gray-800 border-r border-gray-700 overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-medium flex justify-center items-center py-3 text-gray-300 border-b border-gray-700 sticky top-0 bg-gray-800 z-10 text-center">
              <CodeIcon className="w-5 h-5" />
            </h3>
            <ul className="py-2">
              {problems.map((problem, index) => (
                <li key={problem.id}>
                  <Button
                    onClick={() => handleProblemChange(index)}
                    className={clsx(
                      "w-full text-center py-2 text-sm transition-all duration-200 focus:outline-none rounded-none",
                      currentProblemIndex === index
                        ? 'bg-blue-600 text-white font-semibold shadow-inner'
                        : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    )}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <ProblemStatement
            title={currentProblem.title}
            description={currentProblem.description}
            examples={currentProblem.examples}
            constraints={currentProblem.constraints}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-gray-800 hover:bg-gray-700 w-2 transition-colors duration-200" />

        {/* Right Panel -> Code Editor and Output (Vertical Split) */}
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={30} className="flex flex-col">
              <CodeEditor
                code={code}
                language={activeLanguage}
                onCodeChange={setCode}
                onLanguageChange={handleLanguageChangeByUser}
                onRunCode={handleRunCode}
                isLoading={isLoading}
                readOnly={isLoading}
                problemId={currentProblem.id}
                problemTitle={currentProblem.title}
              />
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-gray-800 hover:bg-gray-700 h-2 transition-colors duration-200" />

            <ResizablePanel defaultSize={60} minSize={30} maxSize={80} className="flex flex-col">
                <ResultTabs
                  output={output}
                  problemTestCases={currentProblem.testCases} 
                  testRunResults={testRunResults}
                />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}