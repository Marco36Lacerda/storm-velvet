import type { StoryType } from "../types";

interface TabsProps {
  activeTab: StoryType; // Which tab is currently selected
  onTabChange: (tab: StoryType) => void; // Function to call when tab is clicked
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const tabs: StoryType[] = ["top", "new", "best"];

  return (
    <div className="border-b border-(--border) bg-(--surface)">
      <div className="max-w-3xl mx-auto flex gap-0 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              relative px-4 py-3 text-sm font-semibold
              capitalize transition-colors duration-150
              ${
                activeTab === tab
                  ? "text-white"
                  : "text-(--text-md) hover:text-(--text-hi)"
              }`}
          >
            {tab}
            {/* Orange underline indicator */}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-2 right-2 h-0.75 bg-(--orange) rounded-t-sm" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
