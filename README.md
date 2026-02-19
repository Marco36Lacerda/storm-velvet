# Hacker News V3

A modern redesign of [Hacker News](https://news.ycombinator.com/) built with React, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern UI**: Clean, dark-themed interface with smooth animations
- **Infinite Scroll**: Seamless loading of stories as you scroll
- **Three Views**: Toggle between Top, New, and Best stories
- **Responsive Design**: Works beautifully on all screen sizes
- **Type-Safe**: Built with TypeScript for reliability
- **Optimized Performance**: React Query handles caching and background refetching

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **TailwindCSS v4** - Styling with the new Vite plugin approach
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **Vitest** - Testing framework

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Marco36Lacerda/storm-velvet.git
cd storm-velvet

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The preview will be available at `http://localhost:4173`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

Utility functions have comprehensive unit test coverage (15 tests).

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation bar with HN links
│   ├── Tabs.tsx        # Top/New/Best toggle
│   ├── StoryList.tsx   # Story list with infinite scroll
│   └── StoryCard.tsx   # Individual story card
├── hooks/              # Custom React hooks
│   └── useStories.ts   # React Query hooks for data fetching
├── services/           # API layer
│   └── hackerNewsApi.ts # Axios client and API functions
├── types/              # TypeScript definitions
│   └── index.ts        # Story types
├── utils/              # Pure utility functions
│   ├── formatters.ts   # Date and URL formatters
│   └── formatters.test.ts  # Unit tests for formatters
├── constants/          # App constants
│   └── navigation.ts   # Navigation links configuration
└── App.tsx             # Root component
```

### Design Decisions

#### 1. **State Management**

- **React Query** for server state (stories, caching, background refetching)
- **useState** for local UI state (active tab, display limit)
- **No global state library needed** - the app's complexity doesn't justify Redux/Zustand

**Why React Query?**

- The HN API returns story IDs first, then requires individual fetches
- React Query handles parallel fetching, caching, and deduplication automatically
- Built-in loading/error states reduce boilerplate

#### 2. **Infinite Scroll Implementation**

Uses **Intersection Observer API** to detect when user scrolls near the bottom:

- Initial load: 10 stories
- Each scroll: +10 more stories
- Loads up to 500 stories (API limit)
- `rootMargin: 50px` triggers loading slightly before reaching the bottom for smooth UX

#### 3. **API Architecture**

```typescript
Services Layer → React Query Hooks → Components
```

- **Services** (`hackerNewsApi.ts`): Pure async functions, framework-agnostic
- **Hooks** (`useStories.ts`): React Query integration, cache management
- **Components**: UI only, no direct API calls

This separation makes each layer easy to test and maintain.

#### 4. **Styling Approach**

- **TailwindCSS v4** with the new `@tailwindcss/vite` plugin (no config file needed)
- **CSS Variables** for theme colors (dark mode ready)
- **JetBrains Mono** for code/data elements (domains, scores, metadata)
- **Inter** for body text (titles, descriptions)

**Color Palette:**

- **Orange** (`#f97316`) - Brand color, navigation, upvotes
- **Green** (`#10b981`) - Data accents, scores, terminal aesthetic
- **Dark** (`#0d1117`) - Background

#### 5. **TypeScript Strategy**

- Strict mode enabled
- Explicit types for all API responses
- Union types for view selection (`'top' | 'new' | 'best'`)
- Type guards for data filtering

## 🎨 Design Choices

### Visual Design

- **Dark theme** to reduce eye strain (HN's primary audience are developers)
- **Orange preserved from YC branding** for recognition
- **Green as data accent** to evoke terminal/hacker aesthetic
- **Ghosted rank numbers** on hover as a signature detail
- **Fixed navbar and tabs** with scrollable content area

### UX Improvements Over Original HN

- Modern card-based layout vs plain text list
- Infinite scroll vs pagination buttons
- Visual hierarchy with typography and spacing
- Hover states for interactivity feedback
- Responsive design for mobile devices

## 🔧 Key Assumptions

1. **No authentication required** - read-only public API
2. **No commenting or voting** - display-only interface
3. **Desktop-first** - optimized for desktop but responsive
4. **Modern browsers** - targets evergreen browsers with ES2020+ support
5. **External navigation** - "past", "comments", "ask", "show" link to real HN (out of scope)

## 📊 Performance Considerations

- **React Query caching** - stories are cached for 10 minutes (configurable `staleTime`)
- **Parallel fetching** - up to 20 stories fetched simultaneously
- **Component memoization** - considered but not needed (React 19 is fast enough)
- **Bundle size** - ~89KB gzipped JS + 4KB CSS (measured with `npm run build`)

## 🚧 Future Enhancements

Given more time, I would add:

- [ ] Error boundary for graceful error handling
- [ ] Component tests with React Testing Library
- [ ] Skeleton loaders during initial fetch
- [ ] Dark/light theme toggle
- [ ] Keyboard navigation
- [ ] "Back to top" button
- [ ] PWA capabilities (offline support, install prompt)
- [ ] Story filtering by domain or keyword
- [ ] User preferences persistence (localStorage)

## 📝 Notes

- The `key={activeTab}` prop on `StoryList` forces a fresh mount when switching tabs, ensuring clean state
- The Intersection Observer is cleaned up on unmount to prevent memory leaks
- Font loading uses `font-display: swap` for better perceived performance
- All external links use `target="_blank" rel="noopener noreferrer"` for security

## 🙏 Acknowledgments

- Data provided by the [Hacker News API](https://github.com/HackerNews/API)
- Logo from [news.ycombinator.com](https://news.ycombinator.com/)
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) and [Inter](https://rsms.me/inter/)

---

Built by Marco Lacerda as a take-home coding challenge.
