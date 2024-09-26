import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  // Trả về props khi có session
  return {
    props: { }
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();

 
  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix Clone</h1>
      <p className="h-10 w-full bg-white">Logged in as: {user?.name}</p>
      <button className="w-full bg-white" onClick={() => signOut()}>
        Logout!
      </button>
    </>
  );
}