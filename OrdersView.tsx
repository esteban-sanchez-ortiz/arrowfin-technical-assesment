import React, { useEffect, useState } from "react";

function OrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [filterSide, setFilterSide] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error fetching orders", err);
        setError("Something went wrong");
        setLoading(false);
      });
  }, []);

  const filtered =
    filterSide === "ALL"
      ? orders
      : orders.filter((o: any) => o.side === filterSide);

  return (
    <div>
      <h2>Orders</h2>
      <div>
        <button onClick={() => setFilterSide("ALL")}>All</button>
        <button onClick={() => setFilterSide("BUY")}>Buys</button>
        <button onClick={() => setFilterSide("SELL")}>Sells</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

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
          {filtered.map((o: any) => (
            <tr>
              <td>{o.symbol}</td>
              <td>{o.side}</td>
              <td>{o.quantity}</td>
              <td>{o.price}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersView;
