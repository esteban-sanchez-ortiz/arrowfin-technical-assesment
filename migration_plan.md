# Migration Plan: OrdersView Refactoring

## What's wrong now

The component does everything in one place - fetching data, managing state, filtering, and rendering. It uses `any` types everywhere and has basic error handling. Also missing `key` props on table rows.

## What we'll build

```
components:
   OrdersView.tsx      # Main container
   OrdersTable.tsx     # Just renders the table
   FilterButtons.tsx   # Just renders filter buttons
hooks:
   useOrders.ts        # Handles all data fetching and state
types:
   orders.ts           # All TypeScript types
```

## Types we need

- `Order` interface (symbol, side, quantity, price, status)
- `FilterSide` type ('ALL' | 'BUY' | 'SELL')
- Props for each component
- Return type for the hook

## Step-by-step plan

1. **Create types first:**
Set up `types/orders.ts` with all interfaces. This makes everything else safer.

2. **Extract the hook:**
Move all the `useState` and `useEffect` logic into `hooks/useOrders.ts`. Replace `any[]` with `Order[]` and `any` error with `Error | null`. Add a `refetch` function for good measure.

3. **Split the UI:**
Create `FilterButtons` and `OrdersTable` as simple presentational components. They just take props and render. Add `key` props to table rows.

4. **Refactor OrdersView:**
Now it just uses the hook, handles filtering, and composes the smaller components together. Much cleaner.

5. **Improve error/loading:**
Make error messages better, add retry functionality, handle empty states properly.

## Quick checklist

- [ ] Create types file
- [ ] Create useOrders hook
- [ ] Create FilterButtons component
- [ ] Create OrdersTable component
- [ ] Refactor OrdersView to use everything
- [ ] Test loading, error, and empty states
- [ ] Make sure no `any` types remain
- [ ] Fix React warnings (keys, etc.)

## Success criteria

Done when: all `any` types are gone, data fetching is in a hook, UI is split into presentational components, error/loading is better, and everything still works the same.
