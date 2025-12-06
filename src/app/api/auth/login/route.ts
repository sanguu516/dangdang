import { NextResponse } from "next/server";
import { LoginSchema } from "@/features/auth/model/schema";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = LoginSchema.parse(body);

    console.log("Login success for:", validatedData.email);

    return NextResponse.json({
      success: true,
      message: "로그인 성공",
      user: {
        id: "user_123",
        email: validatedData.email,
        name: "Test User",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "유효성 검사 실패", errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
