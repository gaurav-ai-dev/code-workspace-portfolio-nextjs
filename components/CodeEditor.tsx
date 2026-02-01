"use client"
import { useState, useEffect } from "react";

interface CodeEditorProps {
  content: string;
  fileName: string;
}

const ANIMATION_KEY = "portfolio_animation_played";

export const CodeEditor = ({ content, fileName }: CodeEditorProps) => {
  const [displayContent, setDisplayContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    // Check if animation has already played
    const hasPlayed = sessionStorage.getItem(ANIMATION_KEY);
    
    if (hasPlayed) {
      // Skip animation, show content immediately
      setDisplayContent(content);
      setIsTyping(false);
      return;
    }
    
    // Play animation for first time
    setIsTyping(true);
    setDisplayContent("");
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= content.length) {
        setDisplayContent(content.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        // Mark animation as played
        sessionStorage.setItem(ANIMATION_KEY, "true");
      }
    }, 8);

    return () => clearInterval(typingInterval);
  }, [content]);

  const lines = displayContent.split('\n');

  return (
    <div className="flex-1 bg-editor-bg overflow-auto">
      <div className="flex">
        {/* Line numbers */}
        <div className="select-none text-editor-lineNumber text-right pr-2 sm:pr-3 pl-2 sm:pl-3 py-3 sm:py-4 bg-editor-bg border-r border-border/50">
          {lines.map((_, index) => (
            <div key={index} className="leading-6 text-[10px] sm:text-xs font-mono opacity-70">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Code content */}
        <div className="flex-1 p-2 sm:p-3 md:p-4 font-mono text-[11px] sm:text-xs md:text-sm overflow-x-auto">
          <pre className="leading-6 whitespace-pre-wrap break-words">
            <code dangerouslySetInnerHTML={{ __html: highlightSyntax(displayContent) }} />
            {isTyping && <span className="cursor-blink text-foreground animate-pulse">|</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};

const highlightSyntax = (code: string): string => {
  // Simple syntax highlighting
  return code
    .replace(/\b(const|let|var|function|return|import|export|default|from|class|extends|async|await|if|else|for|while|new|this)\b/g, 
      '<span class="text-syntax-keyword">$1</span>')
    .replace(/(['"`])(.*?)\1/g, 
      '<span class="text-syntax-string">$1$2$1</span>')
    .replace(/\b(\d+)\b/g, 
      '<span class="text-syntax-number">$1</span>')
    .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, 
      '<span class="text-syntax-function">$1</span>')
    .replace(/\/\/(.*?)$/gm, 
      '<span class="text-syntax-comment">//$1</span>')
    .replace(/\/\*(.*?)\*\//g, 
      '<span class="text-syntax-comment">/*$1*/</span>')
    .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
      '<span class="text-syntax-property">$1</span>:')
    .replace(/(\{|\}|\[|\]|\(|\)|;|,|\.)/g, 
      '<span class="text-syntax-operator">$1</span>');
};
