import React from 'react';

interface OutputConsoleProps {
  output: string;
}

export default function OutputConsole({ output }: OutputConsoleProps) {
  return (
    <div className="p-6 overflow-y-auto custom-scrollbar h-full"> {/* Added h-full */}
      <h2 className="text-2xl font-bold mb-4 text-white">Output</h2>
      <div className="bg-gray-800 p-4 rounded-lg min-h-[150px] font-mono text-sm whitespace-pre-wrap shadow-inner text-gray-200">
        {output || 'Click "Run Code" to see output.'}
      </div>
    </div>
  );
}