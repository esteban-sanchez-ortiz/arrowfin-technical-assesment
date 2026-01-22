# Technical Questions

## 1. Real-Time Data Flow (WebSockets + Orders Table)

I'd put the WebSocket connection in a custom hook like `useOrdersWebSocket`. It connects when the component mounts, disconnects on unmount. Pretty straightforward. You could put it in a context if multiple components need the same connection, but for a single table, just keep it in the hook. Less moving parts.

For state management, I'd go with Zustand or even just `useReducer` for a table getting hammered with updates. Redux feels like overkill here. The WebSocket `onmessage` handler would dispatch updates to whatever store you're using. The key thing is you don't want to replace the entire array every time a single order updates. That's a performance nightmare. So normalize your data: instead of an array of orders, keep them in an object keyed by ID. Now updating one order is just `orders[id] = newOrder` instead of mapping through the whole array.

For individual rows subscribing to updates, if you're using Zustand, each row can subscribe to just its own order. If you're using context, context isn't great for this because any change re-renders all consumers. You'd need to split it up or use something like `use-context-selector` to get granular subscriptions. To avoid full table re-renders:
- Wrap your row component in `React.memo`
- Have the parent component only pass down IDs (not full order objects)
- Let each row fetch its own data from the store
- If you're dealing with hundreds of rows, maybe virtualize with react-window

The biggest win is that normalized state shape. If you're passing `orders={orders}` to the table and it's an array, you're gonna have a bad time with performance.

## 2. Frontend Standards for a Growing Team

If I was leading a small team, say 3 to 5 devs, here's what I'd push for. This stuff matters more than people think.

**Component patterns:** Keep things small. If a component is over 150 lines, it's probably time to split it up. Colocate everything: component, styles, tests, types all in the same folder. And please, no "utils" junk drawers. If a util is only used by one component, just keep it there.
**State management:** Start with local state. Don't reach for global state unless you actually need it. And if you do need global state, pick ONE solution and stick with it. Mixing Redux + Context + Zustand is a nightmare to maintain. For server state (API data), use React Query or SWR. Don't reinvent caching. These tools exist for a reason.
**Error handling:** Every API call needs error handling. No `.then()` without `.catch()`. Have a global error boundary so the whole app doesn't crash when something goes wrong. And show users something useful, not just "An error occurred." That's useless.
**Testing:** I'm not gonna mandate 100% coverage. That's dumb and leads to people writing tests for the sake of tests. But critical flows need tests: auth, checkout, anything that touches money. Integration tests are better than unit tests for UI stuff. Use Testing Library, not Enzyme.
**Code review:** Every PR gets reviewed. No exceptions, even for "small fixes." Those are the ones that break things. Keep PRs small. If it's 50+ files, break it up. And no merging your own PRs. That defeats the whole point.
**The stuff nobody thinks about but should:** Agree on formatting (Prettier) and linting (ESLint/Biome) from day 1. Automate it. Write ADRs for big decisions so we remember why we did things 6 months later. And delete dead code. If it's commented out, it's dead. Git has history for a reason.

## 3. Onboarding New Frontend Devs

The first week is about getting them comfortable, not productive. They're gonna be slow anyway, might as well invest in doing it right.

Days 1 to 2 are setup and orientation. Get their dev environment working, and document this process by the way, because it's always out of date. Walk through the folder structure. Not the whole codebase, just "here's where stuff lives." Show them the README, the wiki, wherever we keep docs. Don't overwhelm them. Days 3 to 4 are for small wins. Give them a tiny task: fix a typo, update some copy, something impossible to mess up. Pair with them on it. Not to teach necessarily, just so they see how we work. Get them to open a PR and go through the review process. Let them experience the full cycle. Day 5 is bigger picture stuff. Architecture overview, but keep it high level: "here's how data flows, here's how auth works." Introduce them to the product person. Devs should understand what users actually do. And answer their questions. They've been accumulating all week.

What docs would I give them? A getting started guide (how to run the app locally, how to run tests), an architecture diagram (nothing fancy, just boxes and arrows showing the main pieces), team conventions (our patterns, naming, PR process), and a glossary because every company has weird internal names for things. What I wouldn't do: don't dump 10 docs on them day 1. They won't read them. Don't expect them to "figure it out." That's lazy mentorship. And don't put them on critical path work for at least 2 weeks. Give them space to learn. The goal is simple: by the end of week 2, they should be able to pick up a medium-sized ticket and work through it with minimal hand-holding. That's success.
