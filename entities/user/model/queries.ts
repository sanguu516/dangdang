import { createQueryFactory } from "@/shared/lib";
import { fetchUser, fetchUsers } from "../api";

/**
 * User query factory for managing user-related queries
 */
export const userQueries = createQueryFactory(["users"]);

/**
 * Get user query options
 */
export const getUserQuery = (id: string) =>
  userQueries.options([id], () => fetchUser(id));

/**
 * Get users list query options
 */
export const getUsersQuery = () =>
  userQueries.options(["list"], () => fetchUsers());
