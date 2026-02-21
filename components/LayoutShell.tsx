"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { TabBar } from "@/components/TabBar";
import { Terminal } from "@/components/Terminal";
import { Code2, Maximize2, Menu } from "lucide-react";
import { ThemeToggleButton } from "./ThemeSelector";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  // map route → active file (must match tab names in TabBar exactly)
  const activeFile = useMemo(() => {
    if (pathname === "/" || pathname.startsWith("/about")) return "about.js";
    if (pathname.startsWith("/skills")) return "skills.js";
    if (pathname.startsWith("/work")) return "work.js";
    if (pathname.startsWith("/experience")) return "experience.js";
    if (pathname.startsWith("/blog")) return "blog.js";
    if (pathname.startsWith("/contact")) return "contact.js";
    return "about.js";
  }, [pathname]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(300);

  const toggleTerminal = () => setIsTerminalOpen((v) => !v);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Top bar */}
      <div className="h-10 bg-secondary/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden hover:bg-muted/30 p-1 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Code2 className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm sm:text-base">gaurav.ai</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
          {/* Theme Toggle Button */}
          <ThemeToggleButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar
          activeFile={activeFile}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TabBar activeFile={activeFile} />

          <div id="main-scroll-container" className="flex-1 overflow-auto bg-editor-bg/90 backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>

      <Terminal
        isOpen={isTerminalOpen}
        onToggle={toggleTerminal}
        height={terminalHeight}
        onHeightChange={setTerminalHeight}
      />
    </div>
  );
}
