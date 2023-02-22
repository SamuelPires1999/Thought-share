"use client";

import Comment from "@/components/Comment";
import CommentComposer from "@/components/CommentComposer";
import Post from "@/components/Post";
import { api } from "@/lib/axios";
import { PostType } from "@/types/PostType";
import { useQuery } from "react-query";

type URL = {
  params: {
    slug: string;
  };
  searchParams: string;
};

export default function PostDetails(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: async () => {
      const response = await api.get(`/posts/${url.params.slug}`);

      return response.data;
    },
    queryKey: "postDetails",
  });

  if (isLoading) return "Loading...";
  if (!data) return "Post not found...";
  return (
    <div className="w-full py-4 flex flex-col gap-2 justify-center ">
      <Post
        author={data.user.name}
        content={data.content}
        date={data.createdAt}
        title={data.title}
        avatar={data.user.image}
      />
      <CommentComposer id={data.id} />
      <div className="py-2 text-2xl flex gap-2 ">
        <span className="first-letter:font-bold">Latest</span>
        <span className="first-letter:font-bold">Comments</span>
      </div>
      {data.comments.length === 0 ? (
        <span className="text-xl">
          No comments at the moment, be the first one!!
        </span>
      ) : (
        data.comments.map((comment) => (
          <Comment
            author={comment.user.name}
            content={comment.content}
            date={comment.createdAt || new Date().toLocaleString()}
            avatar={comment.user.image}
          />
        ))
      )}
    </div>
  );
}
