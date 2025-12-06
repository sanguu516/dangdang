import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

/**
 * Query factory helper for creating type-safe query keys and options
 * Implements the Query Factory pattern for better organization
 */
export class QueryFactory<T = unknown> {
  constructor(private baseKey: string[]) {}

  /**
   * Create a query key with additional parameters
   */
  key(...params: (string | number | object | undefined)[]): QueryKey {
    return [...this.baseKey, ...params.filter((p) => p !== undefined)];
  }

  /**
   * Create query options with the factory key
   */
  options<TData = T, TError = Error>(
    params: (string | number | object | undefined)[],
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
  ): UseQueryOptions<TData, TError> {
    return {
      queryKey: this.key(...params),
      queryFn,
      ...options,
    };
  }
}

/**
 * Create a new query factory with a base key
 */
export function createQueryFactory<T = unknown>(
  baseKey: string[]
): QueryFactory<T> {
  return new QueryFactory<T>(baseKey);
}
