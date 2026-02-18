"use client"
import { ChevronRight, ChevronDown, Folder, FileCode, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeFile: string;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const files = [
  { name: "about.js", icon: FileCode, path: "/", external: false },
  { name: "skills.js", icon: FileCode, path: "/skills", external: false },
  { name: "work.js", icon: FileCode, path: "/work", external: false },
  { name: "experience.js", icon: FileCode, path: "/experience", external: false },
  { name: "blog.js", icon: FileCode, path: "/blog", external: true },
  { name: "contact.js", icon: FileCode, path: "/contact", external: false },
];

export const Sidebar = ({ activeFile, isMobileMenuOpen, onCloseMobileMenu }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleFileSelect = (path: string, external: boolean) => {
    if (external) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      router.push(path);
    }
    onCloseMobileMenu?.();
  };

  // ✅ Prefetch internal routes for instant tab switching
  useEffect(() => {
    files.forEach((f) => {
      if (!f.external) router.prefetch(f.path);
    });
  }, [router]);


  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 bg-editor-sidebar/90 backdrop-blur-sm border-r border-border h-full flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-3 text-xs uppercase tracking-wider text-white border-b border-border flex items-center justify-between">
          <span>Explorer</span>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobileMenu}
            className="lg:hidden hover:bg-muted/30 p-1 rounded transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="flex items-center gap-1 text-sm w-full hover:bg-muted/30 p-1 rounded transition-colors"
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Folder className="w-4 h-4 text-syntax-function" />
              <span>portfolio</span>
            </button>

            {isOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => handleFileSelect(file.path, file.external)}
                    className={`flex items-center gap-2 text-sm w-full p-1 rounded transition-colors ${activeFile === file.name
                      ? "bg-editor-tabActive text-foreground"
                      : "hover:bg-muted/30 text-white"
                      }`}
                  >
                    <file.icon className="w-4 h-4" />
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 text-xs text-white border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-editor-terminalText animate-pulse" />
            <span>Ready</span>
          </div>

          {/* ✅ Safer hint (because Ctrl+Tab switching isn't implemented yet) */}
          <div className="text-[10px] opacity-50">
            Ctrl+` to toggle terminal
          </div>
        </div>
      </div>
    </>

  );
};
