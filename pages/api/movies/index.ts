import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/severAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req);

    const movies = await prismadb.movie.findMany();

    // Kiểm tra nếu có bất kỳ movie nào có title là null hoặc không hợp lệ
    const invalidMovies = movies.filter(movie => !movie.title);
    if (invalidMovies.length > 0) {
      return res.status(400).json({ error: "Some movies have invalid titles." });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}