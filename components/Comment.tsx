"use client";

import Image from "next/image";

type Props = {
  content: string;
  author: string;
  avatar: string;
  date: string;
};

export default function Comment({ author, avatar, content, date }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-4 bg-zinc-700 rounded-md p-4 w-full">
      <div className="my-2">{content}</div>
      <div className="flex gap-3 pt-2 border-t border-slate-400 item-center">
        <span className="flex-grow flex gap-2 items-center">
          <Image
            src={avatar || ""}
            alt={"User profile picture from google"}
            width={30}
            height={30}
            className="rounded-full"
          />
          {author}
        </span>
        <span>Posted at: {new Date(date).toDateString()}</span>
      </div>
    </div>
  );
}
