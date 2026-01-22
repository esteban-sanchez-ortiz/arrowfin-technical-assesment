import { useMemo, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import type { FilterSide, Order } from "../types/orders";
import { FilterButtons } from "./FilterButtons";
import { OrdersTable } from "./OrdersTable";

function filterOrders(orders: Order[], side: FilterSide): Order[] {
  if (side === "ALL") return orders;
  return orders.filter((order) => order.side === side);
}

export function OrdersView() {
  const { orders, loading, error, refetch } = useOrders();
  const [filterSide, setFilterSide] = useState<FilterSide>("ALL");

  const filteredOrders = useMemo(
    () => filterOrders(orders, filterSide),
    [orders, filterSide]
  );

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Orders</h2>
      <FilterButtons currentFilter={filterSide} onFilterChange={setFilterSide} />
      <OrdersTable orders={filteredOrders} />
    </div>
  );
}
