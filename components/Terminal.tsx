"use client"
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, GripHorizontal } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  height: number;
  onHeightChange: (height: number) => void;
}

export const Terminal = ({ isOpen, onToggle, height, onHeightChange }: TerminalProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "> portfolio start",
    "> initializing UI...",
    "> loading developer data...",
    "> ready ✓",
    "",
    "Welcome to Gaurav's portfolio terminal!",
    "Type 'help' for available commands.",
    "",
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newOutput = [...output, `$ ${cmd}`];
    
    switch (command) {
      case "help":
        newOutput.push(
          "Available commands:",
          "  help       - Show this help message",
          "  about      - Learn more about me",
          "  skills     - View my technical skills",
          "  projects   - See my projects",
          "  contact    - Get in touch",
          "  clear      - Clear terminal",
          "  easteregg  - 👀 Try it!",
          ""
        );
        break;
      case "about":
        newOutput.push(
          "Hi! I'm Gaurav 👋",
          "Full-stack MERN developer passionate about building modern web applications.",
          "I love creating elegant solutions to complex problems.",
          ""
        );
        break;
      case "skills":
        newOutput.push(
          "Tech Stack:",
          "  Frontend: React, TypeScript, Tailwind CSS",
          "  Backend: Node.js, Express.js, MongoDB, PostgreSQL",
          "  DevOps: Docker, AWS, CI/CD",
          ""
        );
        break;
      case "projects":
        newOutput.push(
          "Featured Projects:",
          "  → E-Commerce Platform (React, Node, MongoDB, Stripe)",
          "  → Task Management App (React, Express, PostgreSQL, Socket.io)",
          "  → Social Analytics Dashboard (React, Node, MongoDB, Chart.js)",
          "",
          "Check out the projects.js file for more details!",
          ""
        );
        break;
      case "contact":
        newOutput.push(
          "📧 Email: gaurav@developer.com",
          "🔗 LinkedIn: linkedin.com/in/gaurav",
          "💻 GitHub: github.com/gaurav",
          "",
          "Or use the contact.js file to send a message!",
          ""
        );
        break;
      case "easteregg":
        newOutput.push(
          "🎉 You found the easter egg!",
          "\"Code is poetry written in logic.\"",
          "Keep exploring! 🚀",
          ""
        );
        break;
      case "clear":
        setOutput([]);
        setInput("");
        return;
      default:
        newOutput.push(
          `Command not found: ${cmd}`,
          "Type 'help' for available commands.",
          ""
        );
    }
    
    setOutput(newOutput);
    setInput("");
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight >= 150 && newHeight <= 600) {
        onHeightChange(newHeight);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      ref={terminalRef}
      className="bg-editor-terminal border-t border-border flex flex-col"
      style={{ height: `${height}px` }}
    >
      {/* Drag handle */}
      <div 
        className="h-1 bg-border hover:bg-primary/50 cursor-ns-resize flex items-center justify-center group transition-colors"
        onMouseDown={handleMouseDown}
      >
        <GripHorizontal className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
      </div>

      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <TerminalIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Terminal</span>
          <span className="text-white text-xs hidden sm:inline">
            (Ctrl+` to toggle)
          </span>
        </div>
        <button
          onClick={onToggle}
          className="hover:bg-muted p-1 rounded transition-colors"
          aria-label="Close terminal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Terminal content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 font-mono text-[11px] sm:text-xs md:text-sm text-editor-terminalText">
        {output.map((line, index) => (
          <div key={index} className="leading-relaxed">{line}</div>
        ))}
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-syntax-keyword">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="cursor-blink text-syntax-keyword animate-pulse">|</span>
        </div>
      </div>
    </div>
  );
};
