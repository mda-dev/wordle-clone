import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}
const queryClient = new QueryClient();

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

interface WordListProviderPropTypes {
  children: ReactNode;
}
export const WordListProvider = ({ children }: WordListProviderPropTypes) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
