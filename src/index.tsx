import React from "react";
import { createRoot } from "react-dom/client";
import { OrdersView } from "./components/OrdersView";

const ROOT_ELEMENT_ID = "root";

function initializeApp(): void {
  const container = document.getElementById(ROOT_ELEMENT_ID);
  if (!container) {
    throw new Error(`Root element with id "${ROOT_ELEMENT_ID}" not found`);
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <OrdersView />
    </React.StrictMode>
  );
}

initializeApp();
