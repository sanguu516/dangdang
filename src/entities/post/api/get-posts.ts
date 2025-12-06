import { Post } from "../model/types";

export const getPosts = async (
  page: number,
  limit: number
): Promise<Post[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: limit }, (_, i) => ({
    id: `${(page - 1) * limit + i + 1}`,
    title: `Post ${page}-${i + 1}`,
    content: `Content for post ${page}-${i + 1}`,
  }));
};
