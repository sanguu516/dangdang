"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

const loginApi = async (username: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (username === "error") throw new Error("Invalid credentials");
  return { id: "1", name: username };
};

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Logged in:", data);
      router.push("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    loginMutation.mutate(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-2xl font-bold tracking-tight">Login</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your username to continue
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter any username (except 'error')"
          className="flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:focus:ring-white"
          disabled={loginMutation.isPending}
        />
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending || !username}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-black text-white hover:bg-black/90 h-10 px-4 py-2 mt-2",
          "dark:bg-white dark:text-black dark:hover:bg-white/90"
        )}
      >
        {loginMutation.isPending ? "Logging in..." : "Sign In"}
      </button>
    </form>
  );
}
