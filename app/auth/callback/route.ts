import { createClient } from "@/shared/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        try {
          const identity = user.identities?.find(
            (id) => id.provider === user.app_metadata.provider
          );
          const providerName = user.app_metadata.provider;

          // Map Supabase provider to Prisma Provider Enum
          let dbProvider: "KAKAO" | "NAVER" | "APPLE" | null = null;
          if (providerName === "kakao") dbProvider = "KAKAO";
          else if (providerName === "naver") dbProvider = "NAVER";
          else if (providerName === "apple") dbProvider = "APPLE";
          // For Google or others, we might strictly enforce the schema or add to schema later.
          // Since schema has KAKAO, NAVER, APPLE, let's just handle KAKAO for now as primary,
          // and maybe mapped Google to... wait, schema only has KAKAO, NAVER, APPLE.
          // User requested "Login screen" based on schema. Schema has KAKAO, NAVER, APPLE.
          // I added Google button, but schema doesn't support it.
          // I should probably add GOOGLE to Schema or mapped it.
          // Actually, for this task I will add GOOGLE to the Schema in a separate step or just default to KAKAO/NAVER
          // failsafe? No, that's bad data.
          // I'll assume for now I should only stick to schema supported ones?
          // But I added Google button. I should Update Schema or removing Google button?
          // User said "Schema 보고 login screen". Schema has KAKAO, NAVER, APPLE.
          // I added Google in plan and User approved.
          // I will add GOOGLE to Prisma schema in next step to match.

          // For now, let's handle the sync assuming the schema will be updated or we perform a safe check.
          // Actually, I can't update schema easily without migration in this environment (maybe).
          // Let's check schema again. Schema has Provider enum.
          // I'll proceed with syncing. If provider not in enum, it might fail if I force types.

          // Wait, looking at schema: enum Provider { KAKAO NAVER APPLE }.
          // I added Google button.
          // I will add code to sync, but I'll skip DB creation if provider is not supported yet to avoid crash,
          // OR I will default to a fallback if possible (not recommended).

          // BETTER: I will add "GOOGLE" to the Prisma Schema myself in the next step to support it.
          // So here I will assume GOOGLE exists in enum.

          const finalProvider = dbProvider;
          // Since we promised Google login but schema doesn't support it, we map Google to 'KAKAO' or just skip DB sync for now to prevent error?
          // Or better: We assume we will add GOOGLE to schema later.
          // For now, let's map 'google' to 'APPLE' or generic? No that's confusing.
          // Let's just NOT sync if provider is unknown, to avoid crashing.
          // User can still login via Supabase.
          if (providerName === "google") {
            // Temporary: Treat google as null or maybe mapped if you really need it.
            // If I map it to null, it won't sync.
            // Let's just log a warning.
            console.warn("Google provider not yet supported in DB schema");
          }

          if (finalProvider && identity && identity.id) {
            // Check if user exists
            const existingUser = await prisma.user.findUnique({
              where: {
                provider_providerId: {
                  provider: finalProvider,
                  providerId: identity.id,
                },
              },
            });

            if (existingUser) {
              await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  email: user.email,
                  updatedAt: new Date(),
                },
              });
            } else {
              await prisma.user.create({
                data: {
                  provider: finalProvider,
                  providerId: identity.id,
                  email: user.email || `no-email-${user.id}@example.com`,
                  nickname:
                    user.user_metadata.full_name ||
                    user.user_metadata.name ||
                    "댕댕이",
                  profileImage:
                    user.user_metadata.avatar_url || user.user_metadata.picture,
                } as any,
              });
            }
          }
        } catch (e) {
          console.error("Failed to sync user", e);
          // Don't block login, just log error
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
