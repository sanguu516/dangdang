import { LoginForm } from "@/features/auth/login-form";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4">
      <LoginForm />
    </div>
  );
}
