'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ProblemStatement from '@/components/ProblemStatement';
import CodeEditor from '@/components/CodeEditor';
import OutputConsole from '@/components/OutputConsole';
import { runCodeAction } from './actions';
import { getBoilerplate } from '@/lib/codeSnippets';
import { problems } from '@/data/problemsData';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import clsx from 'clsx';
import { CodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function HomePage() {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const currentProblem = problems[currentProblemIndex] || problems[0];
  const [activeLanguage, setActiveLanguage] = useState(currentProblem.language);


  const [code, setCode] = useState(getBoilerplate(currentProblem.language));
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Effect to update code and reset activeLanguage when current problem changes
  useEffect(() => {
    // When a new problem is selected, reset the activeLanguage to that problem's default
    // and load the corresponding boilerplate.
    if (currentProblem) {
      setActiveLanguage(currentProblem.language);
      setCode(getBoilerplate(currentProblem.language));
      setOutput(''); // Clear output on problem change
    }
  }, [currentProblemIndex, currentProblem]); // Dependency on currentProblem ensures update when problem changes

  const handleRunCode = useCallback(async () => {
    setIsLoading(true);
    setOutput('Running code...');

    try {
      // IMPORTANT: Use activeLanguage for the runCodeAction
      const result = await runCodeAction(code, activeLanguage);

      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        setOutput(result.output || 'No output received.');
      }
    } catch (error: any) {
      console.error("Error calling Server Action:", error);
      setOutput(`Client Error: Could not execute code. Details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [code, activeLanguage]); // Dependency on activeLanguage here

  const handleProblemChange = (index: number) => {
    if (index >= 0 && index < problems.length) {
      setCurrentProblemIndex(index);
    }
  };

  // This handler is called when the user explicitly changes the language in the dropdown
  const handleLanguageChangeByUser = useCallback((newLanguage: string) => {
    setActiveLanguage(newLanguage); // Update the active language state
    setCode(getBoilerplate(newLanguage)); // Load boilerplate for the newly selected language
  }, []); // No dependencies needed as it only sets state and uses a pure function

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
              {/* Pass props to CodeEditor, using activeLanguage now */}
              <CodeEditor
                code={code}
                language={activeLanguage} // Pass the active language
                onCodeChange={setCode}
                onLanguageChange={handleLanguageChangeByUser} // Pass the user-driven language change handler
                onRunCode={handleRunCode}
                isLoading={isLoading}
                readOnly={isLoading}
              />
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-gray-800 hover:bg-gray-700 h-2 transition-colors duration-200" />

            <ResizablePanel defaultSize={50} minSize={30} maxSize={60} className="flex flex-col">
                <OutputConsole output={output} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}