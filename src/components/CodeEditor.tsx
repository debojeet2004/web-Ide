'use client'; 

import React, { useCallback } from 'react';
import Editor from '@monaco-editor/react';
import clsx from 'clsx'; 

// Import Shadcn components
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (value: string) => void;
  onLanguageChange: (newLanguage: string) => void; 
  onRunCode: () => void; 
  isLoading: boolean; 
  readOnly?: boolean;
}

export default function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onRunCode,       
  isLoading,       
  readOnly = false,
}: CodeEditorProps) {
  const handleEditorChange = useCallback((value: string | undefined) => {
    onCodeChange(value || '');
  }, [onCodeChange]);

  return (
    <>
      <div className="flex-shrink-0 flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <h3 className="text-xl font-bold text-gray-300">Code Editor</h3>
        <div className="flex items-center space-x-3">
          <Select value={language} onValueChange={onLanguageChange} disabled={isLoading}>
            <SelectTrigger className="w-[120px] bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={onRunCode}
            disabled={isLoading}
            className={clsx(
              "px-4 py-1.5 rounded-md text-sm font-semibold shadow-md transition duration-300 transform",
              isLoading
                ? "bg-gray-600 cursor-not-allowed animate-pulse"
                : "bg-green-600 hover:bg-green-700 active:scale-95"
            )}
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 10 },
            fontFamily: 'Fira Code, monospace',
            fontLigatures: true,
            readOnly: readOnly,
          }}
        />
      </div>
    </>
  );
}