import Head from '@/components/Head'

import { useEffect } from 'react';
import axios from 'axios';
import querystring from 'querystring';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default function Home() {
  useEffect(() => {
    const getAccessToken = async () => {
      // URLからcodeを取得
      const code = new URLSearchParams(window.location.search).get('code');

      // 初回はSpotify Authorize、2回目(コードを取得後)トークン取得
      if (!code) {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=user-read-private%20user-read-email`;
      } else {
        console.log('token getting');
        const data = {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_uri,
        };
        try {
          const urlParams = new URLSearchParams(data)
          const querystring = urlParams.toString()
          const binary = btoa(`${client_id}:${client_secret}`);
          const response = await axios.post('https://accounts.spotify.com/api/token', querystring, {
            headers: {
              'Authorization': 'Basic ' + (binary.toString('base64')),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          const accessToken = response.data.access_token;
          console.log('Access Token:', accessToken);
          console.log(response.data);

        } catch (error) {
          console.error('Error getting access token:', error);
        }
      }
    };

    getAccessToken();
  }, []);

  const handleLogin = () => {
  };

  return (
    <div>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
}
