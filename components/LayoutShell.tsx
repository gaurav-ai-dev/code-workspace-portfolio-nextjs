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


  // ✅ map route -> active file
  const activeFile = useMemo(() => {
    if (pathname === "/") return "home.js";
    if (pathname.startsWith("/about")) return "about.js";
    if (pathname.startsWith("/projects")) return "projects.js";
    if (pathname.startsWith("/experience")) return "experience.js";
    if (pathname.startsWith("/contact")) return "contact.js";
    return "home.js";
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

        <div className="flex items-center gap-4 text-xs sm:text-sm text-white">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-foreground">
            {/* Theme Toggle Button */}
            <ThemeToggleButton />
            {/* <span className="hidden sm:inline text-muted-foreground">Gaurav Garg</span> */}
            {/* <Maximize2 className="w-4 h-4" /> */}
          </div>
          {/* <Maximize2 className="w-4 h-4" /> */}
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
