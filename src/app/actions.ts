'use server'; 

import axios from 'axios'; 

const languageMap: { [key: string]: string } = {
  javascript: 'node',
  python: 'python',
  cpp: 'cpp',
  java: 'java',
};

const languageVersionMap: { [key: string]: string } = {
  node: '16.14.0',
  python: '3.10.0',
  cpp: '10.2.0',
  java: '15.0.2',
};

export async function runCodeAction(
  code: string,
  language: string
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
        fileName = 'Main.java';
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


    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: runtimeLanguage,
      version: runtimeVersion,
      files: [
        {
          name: fileName, 
          content: code,
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = response.data;
    let output = '';
    let error = '';

    if (data.run) {
      if (data.run.stdout) {
        output = data.run.stdout;
      }
      if (data.run.stderr) {
        error = data.run.stderr;
      }
      if (data.run.code !== 0 && !error) { 
         error = `Runtime Error (Exit Code: ${data.run.code})`;
      }
    } else if (data.compile) {
        if (data.compile.stderr) {
            error = `Compile Error:\n${data.compile.stderr}`;
        } else {
             error = `Compilation failed with no specific error message.`
        }
    } else {
        error = 'Unknown execution error or malformed response.';
    }


    if (error) {
      return { error: error };
    } else {
      return { output: output };
    }

  } catch (axiosError: any) {
    console.error('Piston API Error:', axiosError.response?.data || axiosError.message);
    return { error: `Failed to execute code: ${axiosError.response?.data?.message || axiosError.message}` };
  }
}