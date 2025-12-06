"use client";

import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/button";

export const LoginButtons = () => {
  const supabase = createClient();

  const handleLogin = async (provider: "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        variant="outline"
        onClick={() => handleLogin("kakao")}
        className="w-full bg-[#FAE100] text-[#371D1E] hover:bg-[#FAE100]/90 border-none"
      >
        Login with Kakao
      </Button>
    </div>
  );
};
