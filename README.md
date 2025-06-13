# My LeetCode IDE

My LeetCode IDE is a web-based coding environment built with [Next.js](https://nextjs.org). It allows you to write, run, and test code for LeetCode-style problems directly in your browser.

## Features

- **Multi-language support**: Write code in various programming languages.
- **Code execution**: Run your code instantly using the [Piston API](https://github.com/engineer-man/piston) for secure and fast code execution.
- **Live preview**: See your code output and errors in real time.
- **Modern UI**: Built with Next.js and optimized for performance.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the IDE.

## Code Execution with Piston API

This IDE uses the [Piston API](https://github.com/engineer-man/piston) to execute code securely in multiple languages. No code is executed on your local machine; all execution happens in isolated containers provided by Piston.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Piston API Documentation](https://github.com/engineer-man/piston) - Details on the code execution backend.

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/your-repo/my-leetcode-ide).

## License

This project is licensed under the MIT License.
