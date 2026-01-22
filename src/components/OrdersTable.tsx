import type { OrdersTableProps } from "../types/orders";
import { formatCurrency, formatNumber } from "../utils/formatting";

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Side</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.symbol}</td>
            <td>{order.side}</td>
            <td>{formatNumber(order.quantity)}</td>
            <td>{formatCurrency(order.price)}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
