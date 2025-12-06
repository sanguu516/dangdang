import { cn } from "@/shared/lib";
import { User } from "../model";

interface UserCardProps {
  user: User;
  className?: string;
}

/**
 * User card component to display user information
 */
export function UserCard({ user, className }: UserCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 p-4 shadow-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-xs text-gray-400 mt-2">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
