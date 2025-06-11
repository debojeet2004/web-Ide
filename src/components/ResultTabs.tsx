import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { TestCase } from '@/data/problemsData';
import { TestRunResult } from '@/app/page';
import { Button } from './ui/button';

interface ResultTabsProps {
  output: string;
  problemTestCases: TestCase[]; 
  testRunResults: TestRunResult[];
}

export default function ResultTabs({ output, problemTestCases, testRunResults }: ResultTabsProps) {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'testcase' | 'output' | 'testresults'>('testcase');
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);

  useEffect(() => {
    setActiveTestCaseIndex(0);
    setActiveConsoleTab('testcase');
  }, [problemTestCases]);

  const selectedProblemTestCase = problemTestCases[activeTestCaseIndex];

  return (
    <div className="flex flex-col h-full">
      <Tabs
        value={activeConsoleTab}
        onValueChange={(value) => setActiveConsoleTab(value as 'testcase' | 'output' | 'testresults')}
        className="flex-1 flex flex-col"
      >
        {/* Tab Navigation (Horizontal, Left-Aligned) */}
        <div className='flex bg-gray-800 rounded-none h-auto p-0 justify-start'>
          <TabsList className="flex bg-gray-800 rounded-none h-auto p-0 justify-start">
            {/* test cases */}
            <TabsTrigger
              value="testcase"
              className="px-6 py-3 text-sm font-medium data-[state=active]:bg-gray-900 data-[state=active]:shadow-none data-[state=active]:text-white data-[state=active]:font-bold rounded-none text-gray-400 transition-all" // Changed text-base to text-sm
            >
              Testcase
            </TabsTrigger>
            {/* output */}
            <TabsTrigger
              value="output"
              className="px-6 py-3 text-sm font-medium data-[state=active]:bg-gray-900 data-[state=active]:shadow-none data-[state=active]:text-white data-[state=active]:font-bold rounded-none text-gray-400 transition-all" // Changed text-base to text-sm
            >
              Output
            </TabsTrigger>
            {/* testresults */}
            <TabsTrigger
              value="testresults"
              className="px-6 py-3 text-sm font-medium data-[state=active]:bg-gray-900 data-[state=active]:shadow-none data-[state=active]:text-white data-[state=active]:font-bold rounded-none text-gray-400 transition-all" // Changed text-base to text-sm
            >
              Test Results ({testRunResults.filter(r => r.passed).length}/{testRunResults.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <TabsContent value="output" className="flex-1 p-6 overflow-y-auto bg-gray-900 data-[state=inactive]:hidden">
          <h2 className="sr-only">Raw Output</h2>
          <Textarea
            readOnly
            className="w-full min-h-[250px] font-mono text-xs shadow-inner resize-none border border-gray-700 bg-gray-800 text-gray-200"
            value={output || 'Click "Run Code" to see raw output from the first test case.'}
          />
        </TabsContent>

        <TabsContent value="testcase" className="flex-1 p-6 overflow-y-auto bg-gray-900 data-[state=inactive]:hidden">
          {/* Test Case Navigation (Case 1, Case 2, etc.) */}
          <div className="flex mb-4 overflow-x-auto pb-2 -mx-1">
            {problemTestCases.map((testCase, index) => {
              const runResult = testRunResults.find(r => r.testCaseId === `case-${index + 1}`);
              const passed = runResult?.passed;

              return (
                <Button
                  key={`problem-test-case-${index}`}
                  variant={activeTestCaseIndex === index ? "default" : "secondary"}
                  size="sm"
                  className={clsx(
                    "mr-2 flex-shrink-0 flex items-center gap-1 text-xs", // Changed text-sm to text-xs for case buttons
                    activeTestCaseIndex === index ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                  )}
                  onClick={() => {
                    setActiveTestCaseIndex(index);
                  }}
                >
                  Case {index + 1}
                  {passed === true && <CheckCircle2 className="w-4 h-4 text-green-400 ml-1" />}
                  {passed === false && <XCircle className="w-4 h-4 text-red-400 ml-1" />}
                </Button>
              );
            })}
          </div>

          {/* Current Test Case Input/Expected Output Fields (Read-Only) */}
          {selectedProblemTestCase ? (
            <>
              <div className="mb-4">
                <Label htmlFor="testCaseInput" className="block text-gray-300 text-xs font-semibold mb-2"> {/* Changed text-sm to text-xs for labels */}
                  Input:
                </Label>
                <Textarea
                  id="testCaseInput"
                  readOnly
                  className="w-full min-h-[80px] shadow-inner resize-none border border-gray-700 bg-gray-800 text-gray-200 text-xs"
                  value={selectedProblemTestCase.input}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="testCaseExpectedOutput" className="block text-gray-300 text-xs font-semibold mb-2"> {/* Changed text-sm to text-xs for labels */}
                  Expected Output:
                </Label>
                <Textarea
                  id="testCaseExpectedOutput"
                  readOnly
                  className="w-full min-h-[60px] shadow-inner resize-none border border-gray-700 bg-gray-800 text-gray-200 text-xs"
                  value={selectedProblemTestCase.expectedOutput}
                />
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-xs">No test cases defined for this problem.</p> // Changed text-sm to text-xs
          )}
        </TabsContent>

        <TabsContent value="testresults" className="flex-1 p-6 bg-gray-900 data-[state=inactive]:hidden">
          <h2 className="text-base font-bold mb-2 -mt-4 text-white ">Test Results</h2> 
          {testRunResults.length === 0 ? (
            <p className="text-gray-400 text-xs">Run your code to see test results.</p> 
          ) : (
            <div className="space-y-4 overflow-y-auto h-[20rem] custom-scrollbar overflow-x-hidden"> 
              {testRunResults.map((result, index) => (
                <Card key={result.testCaseId} className={clsx(
                  result.passed ? "border-green-600 bg-green-900/10" : "border-red-600 bg-red-900/10"
                )}>
                  <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2"> 
                      {result.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                    </CardTitle>
                    <CardDescription className={clsx(
                      "font-medium text-xs", 
                      result.passed ? "text-green-300" : "text-red-300"
                    )}>
                      {result.passed ? "Success" : "Failure"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-xs">
                    <div className="mb-2">
                      <p className="text-gray-300 font-medium text-xs">Input:</p>
                      <pre className="bg-gray-800 p-2 rounded text-[10px] font-mono whitespace-pre-wrap text-gray-200 overflow-x-auto custom-scrollbar">{result.input}</pre>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-300 font-medium text-xs">Expected Output:</p>
                      <pre className="bg-gray-800 p-2 rounded text-[10px] font-mono whitespace-pre-wrap text-gray-200 overflow-x-auto custom-scrollbar">{result.expectedOutput}</pre>
                    </div>
                    <div>
                      <p className="text-gray-300 font-medium text-xs">Your Output:</p>
                      <pre className="bg-gray-800 p-2 rounded text-[10px] font-mono whitespace-pre-wrap text-gray-200 overflow-x-auto custom-scrollbar">
                        {result.actualOutput || (result.error ? `Error: ${result.error}` : 'No output')}
                      </pre>
                    </div>
                    {result.error && (
                      <div className="mt-2 text-red-300 text-xs">
                        <p className="font-medium">Error Details:</p>
                        <pre className="bg-red-900/20 p-2 rounded whitespace-pre-wrap text-[10px] text-red-200 overflow-x-auto custom-scrollbar">{result.error}</pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}