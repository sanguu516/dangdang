import { LoginForm } from "@/features/auth";
import { MainLayout } from "@/widgets/main-layout";
import { Dog } from "lucide-react";

export function LoginPage() {
  return (
    <MainLayout showHeader={false} showBottomNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F7] p-6">
        <div className="w-full max-w-sm flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-white rounded-[28px] shadow-xl flex items-center justify-center mb-2">
              <Dog className="w-10 h-10 text-[#FF592C]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
              DangDang
            </h1>
            <p className="text-slate-500 font-medium">
              반려견과 함께하는 특별한 여행
            </p>
          </div>

          {/* Login Form Section */}
          <div className="w-full bg-white/80 backdrop-blur-xl p-6 rounded-[32px] shadow-sm border border-white/50">
            <LoginForm />
          </div>

          <p className="text-xs text-slate-400 text-center px-8">
            로그인하시면 댕댕어스의{" "}
            <span className="underline cursor-pointer">이용약관</span> 및{" "}
            <span className="underline cursor-pointer">개인정보처리방침</span>에
            동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
