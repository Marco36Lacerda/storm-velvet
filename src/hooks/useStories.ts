import { useQuery, useQueries } from "@tanstack/react-query";
import type { StoryType, Story } from "../types";
import { fetchStoryIds, fetchStory } from "../services/hackerNewsApi";

export const useStoryIds = (type: StoryType) => {
  return useQuery({
    queryKey: ["storyIds", type],
    queryFn: () => fetchStoryIds(type),
  });
};

export const useStories = (ids: number[], limit: number = 20) => {
  return useQueries({
    queries: ids.slice(0, limit).map((id) => ({
      queryKey: ["story", id],
      queryFn: () => fetchStory(id),
      staleTime: 1000 * 60 * 10, // 10 minutes because stories rarely change
    })),
    combine: (results) => ({
      data: results
        .map((r) => r.data)
        .filter((s): s is Story => s !== undefined),
      isLoading: results.some((r) => r.isLoading),
      error: results.find((r) => r.error)?.error,
    }),
  });
};
