"use client"
import { useState, useEffect } from "react";
import { X, FileCode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TabBarProps {
  activeFile: string;
}

const allTabs = [
  { name: "about.js", path: "/", external: false },
  { name: "skills.js", path: "/skills", external: false },
  { name: "work.js", path: "/work", external: false },
  { name: "experience.js", path: "/experience", external: false },
  { name: "blog.js", path: "/blog", external: true },
  { name: "contact.js", path: "/contact", external: false },
];

const tabByName = Object.fromEntries(allTabs.map((t) => [t.name, t]));

export const TabBar = ({ activeFile }: TabBarProps) => {
  const router = useRouter();

  // Only about.js is open by default — new tabs open as the user navigates
  const [openTabs, setOpenTabs] = useState<string[]>(["about.js"]);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // When the active file changes (sidebar click / URL change), ensure its tab is open
  useEffect(() => {
    if (activeFile && !openTabs.includes(activeFile)) {
      setOpenTabs((prev) => [...prev, activeFile]);
    }
  }, [activeFile]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = (e: React.MouseEvent, tabName: string) => {
    e.stopPropagation();
    const remaining = openTabs.filter((t) => t !== tabName);
    setOpenTabs(remaining);

    // If closing the active tab, navigate to the nearest remaining tab
    if (activeFile === tabName && remaining.length > 0) {
      const closedIdx = openTabs.indexOf(tabName);
      const nextTab = remaining[Math.min(closedIdx, remaining.length - 1)];
      router.push(tabByName[nextTab].path);
    }
  };

  const visibleTabs = allTabs.filter((t) => openTabs.includes(t.name));

  return (
    <div className="flex bg-editor-tabInactive border-b border-border overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      <TooltipProvider>
        <AnimatePresence initial={false}>
          {visibleTabs.map((tab) => {
            const isActive = activeFile === tab.name;
            const isHovered = hoveredTab === tab.name;

            return (
              <Tooltip key={tab.name} delayDuration={500}>
                <TooltipTrigger asChild>
                  <motion.div
                    layout
                    initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                    animate={{ opacity: 1, width: "auto", paddingLeft: 12, paddingRight: 12 }}
                    exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0, overflow: "hidden" }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className={`flex items-center gap-2 py-2 border-r border-border cursor-pointer min-w-0 relative transition-colors duration-150 ${isActive
                        ? "bg-editor-tabActive text-foreground shadow-sm"
                        : "bg-editor-tabInactive text-white hover:bg-muted/40 hover:text-foreground"
                      }`}
                    onClick={() =>
                      tab.external
                        ? window.open(tab.path, "_blank")
                        : router.push(tab.path)
                    }
                    onMouseEnter={() => setHoveredTab(tab.name)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    {/* Active top-border indicator */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                    )}

                    <FileCode
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-syntax-function" : "text-white"
                        }`}
                    />

                    <span className="text-sm whitespace-nowrap">{tab.name}</span>

                    {/* Close X — visible on hover or when active */}
                    <motion.button
                      animate={{
                        opacity: isHovered || isActive ? 1 : 0,
                        scale: isHovered || isActive ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.12 }}
                      onClick={(e) => handleClose(e, tab.name)}
                      className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-sm hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Close ${tab.name}`}
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {tab.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </AnimatePresence>
      </TooltipProvider>
    </div>
  );
};
