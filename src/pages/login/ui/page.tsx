import { LoginForm } from "@/features/auth";
import { MainLayout } from "@/widgets/main-layout";

export function LoginPage() {
  return (
    <MainLayout showHeader={false} showBottomNav={false}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4">
        <LoginForm />
      </div>
    </MainLayout>
  );
}
