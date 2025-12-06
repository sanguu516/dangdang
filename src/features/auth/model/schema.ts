import { z } from "zod";

// Zod Schema Definition
export const LoginSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

// TypeScript Type Inference
export type LoginRequest = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
});

export type RegisterRequest = z.infer<typeof RegisterSchema>;
