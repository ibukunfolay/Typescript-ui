import { GetServerSideProps } from 'next';
import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/utils/fetcher';

interface IUser {
  _id: string;
  email: string;
  name: string;
  session: string;
  createdAt: Date;
  updatedAt: Date;
  iat: number;
  exp: number;
  __v: number;
}

const Home = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const { data, error } = useSWR<IUser>(`${BASE_URL}/api/me`, fetcher);

  // if (error) return <div className="">Failed to load</div>;

  if (data) return <div className="">welcome {data.name}</div>;

  return (
    <div className="con">
      <p className="">Please Login.</p>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//   const data = await fetcher(`${BASE_URL}/api/me`, context.req.headers);

//   return {
//     props: {
//       fallbackData: data,
//     },
//   };
// };

export default Home;
