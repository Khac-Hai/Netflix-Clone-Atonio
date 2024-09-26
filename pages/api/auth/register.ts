import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Sửa điều kiện kiểm tra phương thức
  if (req.method !== 'POST') {
    return res.status(405).end(); // Trả về 405 nếu không phải là POST
  }

  try {
    const { email, name, password } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: 'Email already taken' }); // Sửa thông báo lỗi rõ ràng hơn
    }

    // Băm mật khẩu với bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới trong cơ sở dữ liệu
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '', // Có thể cập nhật trường này sau
        emailVerified: new Date(), // Đặt ngày xác minh email
      },
    });

    return res.status(200).json(user); // Trả về thông tin người dùng sau khi tạo
  } catch (error) {
    console.log(error);
    return res.status(400).end(); // Trả về lỗi 400 trong trường hợp xảy ra lỗi
  }
}