import generateRandomString from "@/components/RandomString";
import axios from "axios";


export default async function authorize (req, res) {
  const {code, state} = req.query
  
  // Create CodeVelifier
  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  let codeVerifier = generateRandomString(128)

  const digest = await window.crypto.subtle.digest('SHA-256', data);
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }
  

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    let params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    });

    try {const response = await axios.post('https://accounts.spotify.com/api/token',
      params,{
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    } catch (error) {
      if (error.response) {
        // サーバーからのレスポンスが存在する場合、その中に詳細なエラーメッセージが含まれています
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else {
        // サーバーからのレスポンスがない場合、通常はネットワークエラーやリクエストの送信に関する問題です
        console.error('Network error:', error.message);
      }
    }
  }

  // axios.post('https://accounts.spotify.com/api/token', 
  //   {
  //     headers: {
  //    'Content-Type': 'application/x-www-form-urlencoded',
  //    'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
  //   },
  //   body: body
  //   })
  // .then((response) => {console.log(response);})
  // .catch((error) => {console.log(error);})

//   const response = fetch('https://accounts.spotify.com/api/token', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   body: body
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('HTTP status ' + response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     localStorage.setItem('access_token', data.access_token);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
  res.end()

  
}