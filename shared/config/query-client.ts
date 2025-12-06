import { QueryClient } from "@tanstack/react-query";

/**
 * Query client configuration for TanStack Query
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
