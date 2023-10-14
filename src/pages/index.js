import Head from '@/components/Head'

import { useEffect } from 'react';
import axios from 'axios';
import token from './api/token';
import { useRouter } from 'next/router';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default function Home() {
  
  const router = useRouter();
  console.log('Authorize');
  const redirectUri = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=user-read-private%20user-read-email&state=state`;
  setTimeout(() => {
    router.push(redirectUri);
  }, 1000);
  return (
    <div>aaa</div>
  );
}
