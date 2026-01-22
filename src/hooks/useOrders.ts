import { useCallback, useEffect, useRef, useState } from "react";
import type { ApiOrder, Order } from "../types/orders";

const API_URL = "/api/orders";

function normalizeOrder(order: ApiOrder, index: number): Order {
  return {
    ...order,
    id: order.id ?? `${order.symbol}-${index}`,
  };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchOrders = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data: ApiOrder[] = await response.json();
      setOrders(data.map(normalizeOrder));
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    return () => abortControllerRef.current?.abort();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
}
