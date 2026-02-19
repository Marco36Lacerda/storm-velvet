import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { StoryList } from "./components/StoryList";
import { Tabs } from "./components/Tabs";
import type { StoryType } from "./types";

export const App = () => {
  const [activeTab, setActiveTab] = useState<StoryType>("top");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed navbar at top */}
      <Navbar />

      {/* Fixed tabs below navbar */}
      <div className="shrink-0">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Scrollable content area - takes remaining space */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6">
          <StoryList key={activeTab} type={activeTab} limit={10} />
        </div>
      </div>

      {/* Fixed footer at bottom */}
      <footer className="shrink-0 text-center py-4 border-t border-(--border) bg-(--surface)">
        <p className="text-(--text-md) text-sm mb-2">
          Built with React + TypeScript + TailwindCSS
        </p>
        <p className="text-(--text-lo) text-xs">
          Data from{" "}
          <a
            href="https://github.com/HackerNews/API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--orange) hover:underline"
          >
            Hacker News API
          </a>
        </p>
      </footer>
    </div>
  );
};
