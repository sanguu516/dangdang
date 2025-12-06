"use client";

import { useRouter } from "next/navigation";
export function HomePage() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold"> FSD Setup</h1>
        <p className="text-lg text-gray-600">
          Page content is located in <code>src/pages/home</code>
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            로그인
          </button>
        </div>
      </main>
    </div>
  );
}
