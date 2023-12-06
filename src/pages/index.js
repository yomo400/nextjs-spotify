import Head from '@/components/Head'

import { useState, useEffect } from 'react';
import axios from 'axios';
import token from './api/token';
import { useRouter } from 'next/router';
import { withIronSession } from 'next-iron-session';
import withSession from '@/pages/api/checkLogin';
import useSWR from 'swr';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default function Home() {
  const router = useRouter();
  const fetcher = url => axios.get(url).catch(res => res.data)
  const { data, error } = useSWR('/api/hello', fetcher)
  async function TokenCheck () {
    if (data) {
      console.log('Authorize');
      const redirectUri = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=user-read-private%20user-read-email&state=state`;
      router.push(redirectUri);
    // } else {
    //   console.log('data');
    //   console.log(data);
    }
  }
  TokenCheck()
  return (
    <div>login...</div>
  );
}

