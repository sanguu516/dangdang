"use client";

import { UserList } from "@/features/user-list";

/**
 * Users widget - composes user-related features
 */
export function UsersWidget() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="text-gray-600 mt-1">
          Browse and search through our user directory
        </p>
      </div>
      <UserList />
    </div>
  );
}
