export type OrderStatus = "FILLED" | "PENDING" | "CANCELLED";

export type OrderSide = "BUY" | "SELL";

export type FilterSide = "ALL" | OrderSide;

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
  status: OrderStatus;
}

// API response may have missing ids
export interface ApiOrder {
  id?: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
  status: OrderStatus;
}

export interface OrdersTableProps {
  orders: Order[];
}

export interface FilterButtonsProps {
  currentFilter: FilterSide;
  onFilterChange: (filter: FilterSide) => void;
}
