"use client";

import { LoginButtons } from "@/features/auth/ui/login-buttons";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col gap-2 mb-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Login</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sign in with your social account
        </p>
      </div>
      <LoginButtons />
    </div>
  );
}
