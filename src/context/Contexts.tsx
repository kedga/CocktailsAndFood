import { ReactNode } from "react";
import { SearchParamsContextProvider } from "./SearchParamsContext";
import { OrderContextProvider } from "./OrderContext";
import { DataContextProvider } from "./DataContext";

export default function Contexts({ children }: { children: ReactNode }) {
  return (
    <DataContextProvider>
      <OrderContextProvider>
        <SearchParamsContextProvider>{children}</SearchParamsContextProvider>
      </OrderContextProvider>
    </DataContextProvider>
  );
}
