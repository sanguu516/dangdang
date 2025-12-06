"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/widgets/main-layout";
import { Button } from "@/shared/ui/button";

export function HomePage() {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-6 items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            FSD Setup Complete
          </h1>
          <p className="text-muted-foreground">
            Page content is located in
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">
              src/pages/home
            </code>
          </p>

          <Button
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto"
          >
            로그인 페이지로 이동
          </Button>
        </main>
      </div>
    </MainLayout>
  );
}
