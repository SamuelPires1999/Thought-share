import { useToast } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { commentSchema } from "@/lib/schemas/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
type Props = {
  id: string;
};
export default function CommentComposer({ id }: Props) {
  const client = useQueryClient();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
  });

  const { mutate, isLoading } = useMutation(
    async (data: z.infer<typeof commentSchema>) => {
      await api.post(`/comments/create/${id}`, { data });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("postDetails");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: "Error",
            description: error?.response?.data.message,
            variant: "destructive",
          });
        }
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => mutate(data));

  return (
    <div className="w-full flex gap-2 flex-col py-4 ">
      <p className="text-xl font-bold">Add your comment:</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <textarea
          placeholder="My thoughts..."
          className="rounded-md bg-zinc-700 p-2 focus:outline-none h-24 resize-none"
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
          Comment
        </button>
      </form>
    </div>
  );
}
