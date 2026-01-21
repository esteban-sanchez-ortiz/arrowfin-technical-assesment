import { useEffect, useState } from "react";
import type { Order, UseOrdersReturn } from "../types/orders";

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders");

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error("Something went wrong");
      setError(errorMessage);
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
  };
}
