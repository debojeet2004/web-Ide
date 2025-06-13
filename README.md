# IDE

**IDE** is a web-based coding environment designed for solving algorithmic and coding problems, inspired by platforms like LeetCode. Built with [Next.js](https://nextjs.org), it provides a seamless experience for writing, running, and testing code directly in your browser.

## Features

- **Multi-language Support**: Write and execute code in multiple programming languages.
- **Secure Code Execution**: Uses the [Piston API](https://github.com/engineer-man/piston) for sandboxed, real-time code execution.
- **Live Output & Error Display**: Instantly view your code's output and error messages.
- **Modern, Responsive UI**: Built with Next.js and styled for performance and usability.
- **Problem Management**: Browse, select, and solve coding problems.
- **Code Editor**: Syntax highlighting, auto-indentation, and customizable themes.
- **Test Case Support**: Add custom input and view output for comprehensive testing.
- **Persistence**: Save your code and progress locally.
- **Keyboard Shortcuts**: Efficient navigation and code editing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

Clone the repository:

```bash
git clone https://github.com/your-repo/ide.git
cd ide
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the IDE.

## Project Structure

```
.
├── components/         # Reusable React components (Editor, Output, ProblemList, etc.)
├── pages/              # Next.js pages (index, api, etc.)
├── public/             # Static assets
├── styles/             # CSS/SCSS files
├── utils/              # Utility functions (API clients, helpers)
├── data/               # Problem definitions and metadata
├── package.json
└── README.md
```

## Code Execution with Piston API

All code execution is handled by the [Piston API](https://github.com/engineer-man/piston), which runs code securely in isolated containers. No code is executed on your local machine or server.

- **Supported Languages**: Python, JavaScript, C++, Java, Go, and more.
- **Custom Input**: Provide your own test cases for each run.
- **Security**: All execution is sandboxed and stateless.

## Customization

- **Add Problems**: Place new problem definitions in the `data/` directory.
- **Add Languages**: Update the language list in the configuration and ensure Piston supports it.
- **UI Themes**: Modify or add styles in the `styles/` directory.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Piston API Documentation](https://github.com/engineer-man/piston)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) (if used for code editing)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes.
4. Push to your fork and open a pull request.

Please open issues for bugs or feature requests.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
