import { useEffect, useRef, useState } from "react";
import { StoryCard } from "./StoryCard";
import { useStories, useStoryIds } from "../hooks/useStories";
import type { StoryType } from "../types";

interface StoryListProps {
  type: StoryType;
  limit?: number;
}

export const StoryList = ({ type, limit = 10 }: StoryListProps) => {
  const [displayLimit, setDisplayLimit] = useState(limit);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const displayLimitRef = useRef(displayLimit);

  // Keep ref in sync with state
  useEffect(() => {
    displayLimitRef.current = displayLimit;
  }, [displayLimit]);

  const {
    data: storyIds,
    isLoading: idsLoading,
    error: idsError,
  } = useStoryIds(type);

  const {
    data: stories,
    isLoading: storiesLoading,
    error: storiesError,
  } = useStories(storyIds || [], displayLimit);

  // Infinite scroll observer - set up once when stories are ready
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !storyIds || !stories || stories.length === 0) {
      return;
    }

    // Don't set up observer until we have at least SOME stories rendered
    // This prevents immediate triggering when viewport is large
    if (stories.length < 10) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const currentLimit = displayLimitRef.current;
        const currentStoriesLength = stories?.length || 0;

        // Only trigger if:
        // 1. Sentinel is visible
        // 2. We haven't hit the max
        // 3. We've rendered most of what we asked for (within 3 stories)
        if (
          entries[0].isIntersecting &&
          currentLimit < storyIds.length &&
          currentStoriesLength >= currentLimit - 3
        ) {
          setDisplayLimit((prev) => {
            const newLimit = Math.min(prev + 10, storyIds.length);
            return newLimit;
          });
        }
      },
      { rootMargin: "50px" },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [storyIds, stories.length, stories]); // Re-run when storyIds OR story count changes

  // Loading state - ONLY show skeletons if we have NO stories yet
  if ((idsLoading || storiesLoading) && (!stories || stories.length === 0)) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-(--surface) border border-(--border) rounded-lg p-4 h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Error state
  if (idsError || storiesError) {
    return (
      <div className="bg-(--surface) border border-(--border) rounded-lg p-8 text-center">
        <p className="text-(--text-hi) text-lg mb-2">Failed to load stories</p>
        <p className="text-(--text-md) text-sm">
          {idsError?.message || storiesError?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  // Empty state (shouldn't happen with HN API, but good practice)
  if (!stories || stories.length === 0) {
    return (
      <div className="bg-(--surface) border border-(--border) rounded-lg p-8 text-center">
        <p className="text-(--text-md)">No stories found</p>
      </div>
    );
  }

  // Success state
  return (
    <div className="space-y-3">
      {stories.map((story, index) => {
        return <StoryCard key={story.id} story={story} rank={index + 1} />;
      })}

      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className="h-px" />

      {/* Show loading indicator when fetching more */}
      {displayLimit < (storyIds?.length || 0) && storiesLoading && (
        <div className="flex justify-center py-8">
          <div className="flex gap-2 items-center text-(--text-md) text-sm font-['JetBrains_Mono']">
            <span>loading more</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-(--green) rounded-full animate-pulse" />
              <span className="w-1.5 h-1.5 bg-(--green) rounded-full animate-pulse [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-(--green) rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
