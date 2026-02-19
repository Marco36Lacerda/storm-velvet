import type { Story } from "../types";
import { formatTimeAgo, extractDomain } from "../utils/formatters";

interface StoryCardProps {
  story: Story;
  rank: number;
}

export const StoryCard = ({ story, rank }: StoryCardProps) => {
  const domain = story.url ? extractDomain(story.url) : "news.ycombinator.com";
  const isAskOrShow =
    story.title.startsWith("Ask HN") || story.title.startsWith("Show HN");

  // Ask HN posts without URL should link to HN comments
  const linkUrl =
    story.url || `https://news.ycombinator.com/item?id=${story.id}`;

  return (
    <article className="relative overflow-hidden bg-(--surface) border border-(--border) rounded-lg p-4 pl-5 border-l-[3px] border-l-transparent hover:border-l-(--green) hover:bg-(--green-dim) hover:shadow-lg transition-all duration-200 group">
      {/* ghosted rank number */}
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 font-['JetBrains_Mono'] text-[6rem] font-semibold text-(--text-hi) opacity-[0.025] group-hover:opacity-[0.055] transition-opacity pointer-events-none select-none">
        {rank.toString().padStart(2, "0")}
      </div>

      <div className="grid grid-cols-[52px_1fr] gap-4 relative z-10">
        {/* score column */}
        <div className="flex flex-col items-center gap-1 pt-0.5">
          <button className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-10 border-b-(--orange) hover:-translate-y-0.5 transition-all"></button>
          <span className="font-['JetBrains_Mono'] text-[0.8rem] font-medium text-(--green) bg-(--surface-2) px-1.5 py-0.5 rounded">
            {story.score}
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.8rem] text-(--text-lo) mt-0.5">
            #{rank}
          </span>
        </div>

        {/* Content column */}
        <div className="min-w-0">
          {/* Ask/Show HN tag */}
          {isAskOrShow && (
            <span className="inline-block font-['JetBrains_Mono'] text-[0.62rem] font-medium uppercase px-1.5 py-0.5 rounded mb-1.5 bg-(--green-dim) text-(--green) border border-(--green)/25">
              {story.title.startsWith("Ask HN") ? "Ask HN" : "Show HN"}
            </span>
          )}

          {/* title */}
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[0.95rem] font-semibold text-(--text-hi) leading-snug mb-1.5 hover:text-(--green) hover:text-shadow-slate-500 transition-colors"
          >
            {story.title}
          </a>

          {/* domain */}
          <div className="font-['JetBrains_Mono'] text-[0.8rem] text-(--text-lo) mb-2">
            ({domain})
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-(--text-md)">
            <span>by {story.by}</span>
            <span className="text-(--border) text-[0.6rem]">·</span>
            <span>{formatTimeAgo(story.time)}</span>
            {story.descendants !== undefined && (
              <>
                <span className="text-(--border) text-[0.6rem]">·</span>
                <a
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['JetBrains_Mono'] text-[0.72rem] font-medium text-(--text-md) px-2 py-0.5 rounded-full border border-(--border) hover:border-(--green) hover:text-(--green) transition-colors"
                >
                  💬 {story.descendants}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
