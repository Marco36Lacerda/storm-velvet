import { describe, it, expect } from "vitest";
import { formatTimeAgo, extractDomain } from "./formatters";

describe("formatTimeAgo", () => {
  const now = Math.floor(Date.now() / 1000);

  it('formats seconds ago as "just now"', () => {
    expect(formatTimeAgo(now - 30)).toBe("just now");
    expect(formatTimeAgo(now - 59)).toBe("just now");
  });

  it("formats minutes ago correctly", () => {
    expect(formatTimeAgo(now - 60)).toBe("1 minute ago");
    expect(formatTimeAgo(now - 120)).toBe("2 minutes ago");
    expect(formatTimeAgo(now - 1800)).toBe("30 minutes ago");
  });

  it("formats hours ago correctly", () => {
    expect(formatTimeAgo(now - 3600)).toBe("1 hour ago");
    expect(formatTimeAgo(now - 7200)).toBe("2 hours ago");
  });

  it("formats yesterday", () => {
    expect(formatTimeAgo(now - 86400)).toBe("yesterday");
  });

  it("formats days ago", () => {
    expect(formatTimeAgo(now - 172800)).toBe("2 days ago");
    expect(formatTimeAgo(now - 604800)).toBe("7 days ago");
  });

  it("formats months ago", () => {
    expect(formatTimeAgo(now - 2592000)).toBe("1 month ago");
    expect(formatTimeAgo(now - 5184000)).toBe("2 months ago");
  });

  it("formats years ago", () => {
    expect(formatTimeAgo(now - 31536000)).toBe("1 year ago");
    expect(formatTimeAgo(now - 63072000)).toBe("2 years ago");
  });
});

describe("extractDomain", () => {
  it("extracts domain from https URL", () => {
    expect(extractDomain("https://github.com/user/repo")).toBe("github.com");
  });

  it("extracts domain from http URL", () => {
    expect(extractDomain("http://example.com/path")).toBe("example.com");
  });

  it("removes www prefix", () => {
    expect(extractDomain("https://www.google.com/search")).toBe("google.com");
  });

  it("handles complex URLs with query params and hash", () => {
    expect(extractDomain("https://news.ycombinator.com/item?id=123#top")).toBe(
      "news.ycombinator.com",
    );
  });

  it("handles subdomains correctly", () => {
    expect(extractDomain("https://api.github.com/users")).toBe(
      "api.github.com",
    );
  });

  it("returns empty string for undefined", () => {
    expect(extractDomain(undefined)).toBe("");
  });

  it("returns empty string for empty string", () => {
    expect(extractDomain("")).toBe("");
  });

  it("returns empty string for invalid URL", () => {
    expect(extractDomain("not a valid url")).toBe("");
    expect(extractDomain("just some text")).toBe("");
  });
});
