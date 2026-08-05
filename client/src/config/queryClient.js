import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetching when window regains focus to save requests
      retry: 1, // Retry failed requests once
      staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale
    },
  },
});
