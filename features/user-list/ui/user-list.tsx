"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersQuery, UserCard } from "@/entities/user";
import { useUserListStore } from "../model";

/**
 * User list feature component
 */
export function UserList() {
  const { data: users, isLoading, error } = useQuery(getUsersQuery());
  const { searchQuery, setSearchQuery } = useUserListStore();

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center p-4">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {filteredUsers?.length === 0 && (
        <p className="text-center text-gray-500">No users found</p>
      )}
    </div>
  );
}
