import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/severAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req);
    if (!currentUser) {
      return res.status(401).json({ message: 'Not signed in' });
    }

    if (req.method === 'POST') {
      const { movieId } = req.body;

      if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required' });
      }

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        return res.status(400).json({ message: 'Invalid movie ID' });
      }

      const user = await prismadb.user.update({
        where: { email: currentUser.email || '' },
        data: {
          favoriteIds: { push: movieId },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
      const { movieId } = req.body;

      if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required' });
      }

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        return res.status(400).json({ message: 'Invalid movie ID' });
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: { email: currentUser.email || '' },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end(); // Phương thức không được phép
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return res.status(500).json({ message: errorMessage });
  }
}