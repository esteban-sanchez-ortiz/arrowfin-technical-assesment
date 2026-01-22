# OrdersView Refactor

Hey! Here's a quick rundown of what I did with the original `OrdersView.tsx`.

## The problem

The original component was doing way too much fetching data, managing state, filtering, rendering the table, handling errors... all in one file. Plus it had `any` types everywhere which defeats the purpose of using TypeScript.

## What I changed

### Split it up

Instead of one big component, now we have:

- **OrdersView.tsx** - orchestrates everything
- **OrdersTable.tsx** - just renders the table
- **FilterButtons.tsx** - just renders the filter buttons
- **hooks/useOrders.ts** - handles fetching + state
- **types/orders.ts** - TypeScript interfaces
- **utils/formatting.ts** - currency/number formatting

### Added proper types

No more `any`. Created interfaces for `Order`, `ApiOrder` (for the raw API response), and prop types for each component.

### Better error handling

- The hook now has a `refetch` function so users can retry on error
- Added AbortController to cancel in-flight requests when the component unmounts
- Proper Error objects instead of just strings

### Small stuff

- Added `key` props to table rows (React was probably complaining about this)
- Early returns for loading/error states make the code easier to follow
- Extracted number formatting into a utility (uses Intl.NumberFormat)

## How to run it

```bash
npm install
npm run dev
```

The component expects a `/api/orders` endpoint that returns an array of orders.

## What I didn't do

- No styling changes (the task said to focus on structure)
- No tests (would be nice to add later)
- Didn't add fancy loading spinners or error boundaries - kept it simple
