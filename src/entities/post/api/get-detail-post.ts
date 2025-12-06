import { Post } from "../model/types";

export const getDetailPost = async ({ id }: { id: string }): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    title: `Post ${id}`,
    content: `Detailed content for post ${id}`,
  };
};
