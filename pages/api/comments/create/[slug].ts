import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import database from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "User not logged in." });
    }

    const user = await database.user.findUnique({
      where: {
        email: session.user?.email || "null-email-fix-later",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User with this email not found",
      });
    }

    const createdComment = await database.comment.create({
      data: {
        userId: user.id,
        content: req.body.data.content,
        postId: req.query.slug as string,
      },
    });

    return res.json({
      createdComment,
    });
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}
