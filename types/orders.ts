export interface Order {
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  price: number;
  status: string;
}

export type FilterSide = "ALL" | "BUY" | "SELL";

export interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface OrdersTableProps {
  orders: Order[];
}

export interface FilterButtonsProps {
  currentFilter: FilterSide;
  onFilterChange: (filter: FilterSide) => void;
}
