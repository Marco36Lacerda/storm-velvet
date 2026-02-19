export type StoryType = "top" | "new" | "best";

export interface Story {
  id: number;
  title: string;
  url?: string;
  text?: string;
  by?: string;
  score: number;
  time: number;
  descendants?: number;
  kids?: number[];
  type: "story" | "job" | "poll";
  deleted?: boolean;
  dead?: boolean;
}
