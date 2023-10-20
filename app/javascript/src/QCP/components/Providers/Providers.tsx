import { AppProvider } from "@contexts/AppContext";
import { DataProvider } from "@contexts/DataContext";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <DataProvider>{children}</DataProvider>
    </AppProvider>
  );
}
