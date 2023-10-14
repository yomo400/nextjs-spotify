import { useEffect } from 'react';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default async function token(req, res) {
  console.log('gettingtoken');
  const getAccessToken = async () => {
    // URLからcodeを取得
    const { code, state } = req.query;
    console.log('state:' + state);

    // トークン取得
    if (code) {
      console.log('token getting');
      const data = {
        grant_type: 'authorization_code',
        code: code,
        state: state,
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
        // クライアントにレスポンスを返す
        // res.status(200).json({ response: response.data });
        req.session.set('user', {
          accessToken: response.data.access_token,
        });
        // リダイレクト
        // res.status(200).redirect('/')
      } catch (error) {
        console.error('Error getting access token:', error);
        res.status(500).json({ error: 'Internal Server Error'})
      }
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  }
  await getAccessToken()
}