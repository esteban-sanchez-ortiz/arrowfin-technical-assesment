import type { FilterButtonsProps, FilterSide } from "../types/orders";

const filters: { value: FilterSide; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "BUY", label: "Buys" },
  { value: "SELL", label: "Sells" },
];

export function FilterButtons({ currentFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div>
      {filters.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onFilterChange(value)}
          style={{
            fontWeight: currentFilter === value ? "bold" : "normal",
            marginRight: "0.5rem",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
