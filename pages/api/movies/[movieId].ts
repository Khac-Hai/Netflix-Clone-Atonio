import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/severAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Kiểm tra method là GET
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Xác thực người dùng
    await serverAuth(req);

    const { movieId } = req.query;

    // Kiểm tra movieId có phải là chuỗi không và có giá trị hợp lệ không
    if (typeof movieId !== 'string' || !movieId.trim()) {
      return res.status(400).json({ error: 'Invalid or missing movieId' });
    }

    // Truy vấn phim từ cơ sở dữ liệu
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    // Kiểm tra xem phim có tồn tại hay không
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Trả về thông tin phim
    return res.status(200).json(movie);
  } catch (error) {
    // Ghi lỗi chi tiết vào log để dễ dàng debug
    console.error('Error in API handler:', error);

    // Trả về lỗi với thông tin chi tiết hơn
    return res.status(500).json({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' });
  }
}