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

  const [output, setOutput] = useState('');
  const [testRunResults, setTestRunResults] = useState<TestRunResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    if (currentProblem) {
      setActiveLanguage(currentProblem.language);
      setCode(currentProblem.boilerplate || getBoilerplate(currentProblem.language));
      setOutput('');
      setTestRunResults([]);
    }
  }, [currentProblemIndex, currentProblem]);

  const handleRunCode = useCallback(async () => {
    setIsLoading(true);
    setOutput('Running code...');
    setTestRunResults([]); 

    const results: TestRunResult[] = [];
    let overallError: string | undefined = undefined;
    for (const [index, testCase] of currentProblem.testCases.entries()) {
      const testCaseId = `case-${index + 1}`;

      try {
        // IMPORTANT: We will update runCodeAction to accept stdin
        const result = await runCodeAction(code, activeLanguage, testCase.input);

        let passed = false;
        let actualOutput = result.output || '';
        let error = result.error;

        if (error) {
          passed = false;
          if (!overallError) {
            overallError = error;
          }
        } else { 
          const processedActualOutput = actualOutput.trim();
          let processedExpectedOutput = testCase.expectedOutput.trim();
          try {
            if (processedExpectedOutput.startsWith('"') && processedExpectedOutput.endsWith('"')) {
              const parsed = JSON.parse(processedExpectedOutput);
              processedExpectedOutput = parsed;
            }
          } catch (e) {}
          //  compare the processed outputs.
          passed = String(processedActualOutput) === String(processedExpectedOutput);
          // if (passed) {
          //   console.log(`Test Case ${testCaseId}: PASSED`); // New console.log
          // } else {
          //   console.log(`Test Case ${testCaseId}: FAILED`); // New console.log
          //   console.log("Expected:", testCase.expectedOutput); // New console.log
          //   console.log("Actual:", actualOutput); // New console.log
          // }
        }
        results.push({
          testCaseId,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: actualOutput,
          passed: passed,
          error: error,
        });

        console.log(`--- Running ${testCaseId} ---`);
        console.log("Input:", testCase.input);
        console.log("expectedOutput:", testCase.expectedOutput);
        console.log("Output:", result.output);
        console.log("error:", result.error);

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
          actualOutput: '',
          passed: false,
          error: errorMessage,
        });
      }
    }
    setTestRunResults(results);

    // Update the general output tab with the first test case's raw output or an overall error
    if (overallError) {
      setOutput(`Error during execution:\n${overallError}`);
    } else if (results.length > 0) {
      // Show output of the first test case in the general output tab
      setOutput(results[0].actualOutput || 'No output received for first test case.');
    } else {
      setOutput('No test cases defined for this problem, or no output received.');
    }
    setIsLoading(false);
  }, [code, activeLanguage, currentProblem.testCases]); 


  // Function for problem change
  const handleProblemChange = (index: number) => {
    if (index >= 0 && index < problems.length) {
      setCurrentProblemIndex(index);
    }
  };

  // Function for Lnaguage change
  const handleLanguageChangeByUser = useCallback((newLanguage: string) => {
    setActiveLanguage(newLanguage);
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