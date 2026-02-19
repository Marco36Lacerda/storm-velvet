import axios from "axios";
import type { Story, StoryType } from "../types";

const hnClient = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0",
});

const ENDPOINTS: Record<StoryType, string> = {
  top: "/topstories.json",
  new: "/newstories.json",
  best: "/beststories.json",
};

// Returns an array of IDs
export const fetchStoryIds = async (type: StoryType): Promise<number[]> => {
  const response = await hnClient.get<number[]>(ENDPOINTS[type]);
  return response.data;
};

// Returns a single story object
export const fetchStory = async (id: number): Promise<Story> => {
  const response = await hnClient.get<Story>(`/item/${id}.json`);
  return response.data;
};
