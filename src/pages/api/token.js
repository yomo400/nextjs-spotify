import withSession from '@/middleware/session';
import axios from 'axios';

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const handler = async (req, res) => {
  console.log('gettingtoken');
  const getAccessToken = async () => {
    // URLからcodeを取得
    const { code, state } = req.query;

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
        // セッション
        req.session.set('user', {
            accessToken: response.data.access_token,
        });
        await req.session.save()
        // リダイレクト
        res.status(200).redirect('/')
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

export default withSession(handler);