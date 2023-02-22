"use client";

import Post from "@/components/Post";
import PostComposer from "@/components/PostComposer";
import { api } from "@/lib/axios";
import { PostType } from "@/types/PostType";
import Link from "next/link";
import { useQuery } from "react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery<PostType[]>({
    queryFn: async () => {
      const response = await api.get("/posts/all");

      return response.data;
    },
    queryKey: "postList",
  });

  if (error) return error;
  if (isLoading) return "Loading.....";

  return (
    <div className="py-4 w-full">
      <PostComposer />
      <div className="text-center py-8 text-2xl flex gap-2 ">
        <span className="first-letter:font-bold">Latest</span>
        <span className="first-letter:font-bold">Shares</span>
      </div>
      {data?.map((post) => (
        <Link href={`/post/${post.id}`}>
          <Post
            key={post.id}
            author={post.user.name}
            content={post.content}
            date={post.createdAt}
            avatar={post.user.image}
            title={post.title}
          />
        </Link>
      ))}
    </div>
  );
}
