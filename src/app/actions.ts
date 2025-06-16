// src/app/actions.ts

'use server';

import axios from 'axios';

const languageMap: { [key: string]: string } = {
  javascript: 'javascript',
  python: 'python',
  cpp: 'cpp',
  java: 'java',
};

const languageVersionMap: { [key: string]: string } = {
  javascript: '18.15.0',
  python: '3.10.0',
  cpp: '10.2.0',
  java: '15.0.2',
};

export async function runCodeAction(
  code: string,
  language: string,
  stdin: string 
): Promise<{ output?: string; error?: string }> {
  try {
    const runtimeLanguage = languageMap[language];
    const runtimeVersion = languageVersionMap[runtimeLanguage];

    if (!runtimeLanguage || !runtimeVersion) {
      return { error: `Unsupported language: ${language}` };
    }

    let fileName: string;
    switch (language) {
      case 'java':
        fileName = 'Solution.java';
        break;
      case 'cpp':
        fileName = 'main.cpp';
        break;
      case 'python':
        fileName = 'main.py';
        break;
      case 'javascript':
        fileName = 'index.js';
        break;
      default:
        fileName = 'main.txt';
    }

    console.log('stdin:', stdin)

    //  // --- NEW ADDITION: Define arguments for the runtime ---
    // let programArgs: string[] = [];
    // if (runtimeLanguage === 'deno') {
    //   // For Deno, we need to explicitly allow read access to /dev/stdin
    //   programArgs.push('--allow-read');
    // }
    // // --- END NEW ADDITION ---

    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: runtimeLanguage,
      version: runtimeVersion,
      files: [
        {
          name: fileName,
          content: code,
        },
      ],
      stdin: stdin,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = response.data;
    let output = '';
    let error = '';

    // Handle compilation errors
    if (data.compile && data.compile.stderr) {
      error = `Compile Error:\n${data.compile.stderr}`;
    }
    // Handle runtime errors
    else if (data.run) {
      if (data.run.stdout) {
        output = data.run.stdout;
        console.log('Run Output:', output); 
      }
      if (data.run.stderr) {
        error = data.run.stderr;
        console.error('Run Error:', error); 
      }
      if (data.run.code !== 0 && !error) {
        error = `Runtime Error (Exit Code: ${data.run.code})`;
        console.log('Run Exit Code:', data.run.code);
      }
    } else {
      error = 'Unknown execution error or malformed response.';
    }

    if (error) {
      return { error: error, output: output }; 
    } else {
      return { output: output };
    }

  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axiosError: any
  ) {
    console.error('Piston API Error:', axiosError.response?.data || axiosError.message);
    let errorMessage = `Failed to execute code: ${axiosError.message}`;
    if (axiosError.response?.data?.message) {
        errorMessage = `Failed to execute code: ${axiosError.response.data.message}`;
    } else if (axiosError.response?.data) {
        errorMessage = `Failed to execute code: ${JSON.stringify(axiosError.response.data)}`;
    }
    return { error: errorMessage };
  }
}