"use client";

import { UsersWidget } from "@/widgets/users-widget";

/**
 * Home page - composes widgets and features
 */
export function HomePage() {
  return (
    <main className="min-h-screen p-8 sm:p-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Dangdang
          </h1>
          <p className="text-gray-600 text-lg">
            A Next.js 15 application built with Feature-Sliced Design
          </p>
        </header>
        <UsersWidget />
      </div>
    </main>
  );
}
