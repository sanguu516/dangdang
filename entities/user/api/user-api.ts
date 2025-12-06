import { axiosInstance } from "@/shared/api";
import { User } from "../model";

/**
 * Fetch user by ID
 */
export async function fetchUser(id: string): Promise<User> {
  const response = await axiosInstance.get<User>(`/users/${id}`);
  return response.data;
}

/**
 * Fetch all users
 */
export async function fetchUsers(): Promise<User[]> {
  const response = await axiosInstance.get<User[]>("/users");
  return response.data;
}
