"use client"
import { X, FileCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

interface TabBarProps {
  activeFile: string;
}

const tabs = [
  { name: "about.js", path: "/" },
  { name: "skills.js", path: "/skills" },
  { name: "work.js", path: "/work" },
  { name: "experience.js", path: "/experience" },
  { name: "blog.js", path: "/blog" },
  { name: "contact.js", path: "/contact" },
];

export const TabBar = ({ activeFile }: TabBarProps) => {
  const router = useRouter();

  return (
    <div className="flex bg-editor-tabInactive border-b border-border overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      <TooltipProvider>
        {tabs.map((tab) => (
          <Tooltip key={tab.name} delayDuration={500}>
            <TooltipTrigger asChild>
              <div
                className={`flex items-center gap-2 px-4 py-2 border-r border-border cursor-pointer group min-w-[150px] relative transition-all duration-200 ${
                  activeFile === tab.name
                    ? "bg-editor-tabActive text-foreground shadow-sm"
                    : "bg-editor-tabInactive text-white hover:bg-muted/40 hover:text-foreground"
                }`}
                onClick={() => router.push(tab.path)}
              >
                {activeFile === tab.name && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                )}
                <FileCode className={`w-4 h-4 transition-colors ${
                  activeFile === tab.name ? "text-syntax-function" : "text-white"
                }`} />
                <span className="text-sm flex-1 truncate">{tab.name}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {tab.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};
