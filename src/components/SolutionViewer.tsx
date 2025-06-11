"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { problems } from "@/data/problemsData";
import Editor from "@monaco-editor/react";

interface SolutionViewerProps {
  problemId: string;
  problemTitle: string;
}

export default function SolutionViewer({
  problemId,
  problemTitle,
}: SolutionViewerProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [solutionCode, setSolutionCode] = useState<string>("// Solution loading...");
  const [solutionLanguage, setSolutionLanguage] = useState<string>("javascript");
const [copied, setCopied] = useState(false)

  const SOLUTION_COST = 25;

  const handleConfirmViewSolution = async () => {
    const problem = problems.find((p) => p.id === problemId);

    if (problem) {
      setSolutionCode(
        problem.solutionBoilerplate || "// Solution not available yet."
      );
      setSolutionLanguage(problem.language);
    } else {
      setSolutionCode("// Error: Problem not found or solution unavailable.");
      setSolutionLanguage("plaintext");
    }

    setShowConfirmation(false);
    setShowSolutionModal(true);
  };

  return (
    <>
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogTrigger asChild>
          <Button className="px-4 py-1.5 rounded-md text-sm font-semibold shadow-md transition duration-300 transform bg-blue-600 hover:bg-blue-700 active:scale-95">
            View Solution
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-gray-800 text-gray-100 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-100">
              Confirm Solution View
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to view the solution for "
              <strong>{problemTitle}</strong>"?
              <br />
              <br />
              <span className="font-bold text-red-400">
                Viewing this solution will cost {SOLUTION_COST} credits.
              </span>
              <br />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmViewSolution}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Solution ({SOLUTION_COST} Credits)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showSolutionModal} onOpenChange={setShowSolutionModal}>
        <DialogContent className="min-w-[70vw] h-[80vh] flex flex-col bg-gray-800 text-gray-100 border-gray-700 p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b border-gray-700 flex-shrink-0">
            <DialogTitle className="text-2xl font-bold text-gray-100">
              Solution for {problemTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              This is the optimal solution for the problem.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Direct Monaco Editor usage here */}
            <Editor
              height="100%" // Take full height of its container
              language={solutionLanguage}
              theme="vs-dark"
              value={solutionCode}
              options={{
                readOnly: true, // Make it read-only
                minimap: { enabled: false }, // Disable minimap for a cleaner look
                fontSize: 16,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                padding: { top: 10 },
                fontFamily: "Fira Code, monospace", // Use consistent font
                fontLigatures: true,
              }}
            />
          </div>
          <div className="p-4 border-t border-gray-700 flex justify-end flex-shrink-0">
            <Button
              onClick={() => setShowSolutionModal(false)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-100"
            >
              Close
            </Button>
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(solutionCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white flex items-center"
              disabled={copied}
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 mr-1 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                "Copy Solution"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
