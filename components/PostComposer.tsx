"use client";
import { useToast } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { postSchema } from "@/lib/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";

export default function PostComposer() {
  const client = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
  });

  const { toast } = useToast();

  const { mutate, isLoading } = useMutation(
    async (data: z.infer<typeof postSchema>) => {
      await api.post("/posts/create", { data });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: "Error",
            description: error?.response?.data.message,
            variant: "destructive",
          });
        }
      },
      onSuccess: (data) => {
        client.invalidateQueries("postList");
        toast({
          title: "Success",
          description: "Your new thought has been shared!",
          className: "bg-zinc-700",
        });
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <div className="w-full flex gap-2 flex-col ">
      <p>Share something cool with everyone:</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          className="ounded-md bg-zinc-700 p-2 focus:outline-none rounded-md"
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && (
          <span className="text-sm text-red-400">{errors.title.message}</span>
        )}
        <textarea
          placeholder="My thoughts..."
          className="rounded-md bg-zinc-700 p-2 focus:outline-none h-40 resize-none"
          {...register("content")}
        />
        {errors.content && (
          <span className="text-sm text-red-400">{errors.content.message}</span>
        )}
        <button
          type="submit"
          className="bg-teal-400 text-zinc-800 rounded-md py-2 hover:bg-teal-600 disabled:pointer-events-none disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Share
        </button>
      </form>
    </div>
  );
}
