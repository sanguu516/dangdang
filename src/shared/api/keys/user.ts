import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("user", {
  all: null,
  detail: (userId: string) => ({
    queryKey: [userId],
  }),
  profile: ["profile"],
});
