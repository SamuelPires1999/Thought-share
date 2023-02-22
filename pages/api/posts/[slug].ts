import { NextApiRequest, NextApiResponse } from "next";
import database from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await database.post.findUnique({
        where: {
          id: req.query.slug as string,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error fetching post details" });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}
