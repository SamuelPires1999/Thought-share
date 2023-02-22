import { NextApiRequest, NextApiResponse } from "next";
import database from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await database.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res
        .status(403)
        .json({ error: "Error has occured while making a post" });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}
