import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import "./index.css";
import App from "./App.tsx";

import { UserProvider } from "./context/UserContext";

const rootElement = document.getElementById("root")!;
if (!rootElement) {
  throw new Error("Root element not found");
}
createRoot(rootElement).render(
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </UserProvider>
);
