import React from 'react';

interface ProblemStatementProps {
  title: string; 
  description: string; 
  examples: { input: string; output: string; explanation?: string }[]; 
  constraints: string[]; 
}


export default function ProblemStatement({
  title,
  description,
  examples,
  constraints,
}: ProblemStatementProps) {

  const renderDescription = (text: string) => {
    if (!text) return null; // Handle case where description might be empty
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: paragraph.replace(/`(.*?)`/g, '<code>$1</code>') }}></p>
    ));
  };

  return (
    <div className="p-6 overflow-y-auto custom-scrollbar h-full flex-1">
      <h2 className="text-2xl font-bold mb-4 text-white">Problem Statement: {title}</h2>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        {renderDescription(description)}

        {examples && examples.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-blue-300">Examples:</h3>
            {examples.map((example, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg shadow-inner mb-4">
                <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words">
                  <code>
                    <span className="text-yellow-300">Example {index + 1}:</span><br/>
                    <span className="text-gray-400">Input:</span> {example.input}<br/>
                    <span className="text-gray-400">Output:</span> {example.output}
                    {example.explanation && (
                      <>
                        <br/>
                        <span className="text-gray-400">Explanation:</span>{' '}
                        {example.explanation}
                      </>
                    )}
                  </code>
                </pre>
              </div>
            ))}
          </>
        )}

        {constraints && constraints.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-blue-300">Constraints:</h3>
            <ul className="list-disc list-inside text-gray-300">
              {constraints.map((constraint, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: constraint.replace(/`(.*?)`/g, '<code>$1</code>') }}></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}