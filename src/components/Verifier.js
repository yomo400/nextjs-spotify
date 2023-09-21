import { useEffect } from "react";

export default function Verifier(props) {
  console.log("Verifier");

  // Create CodeVelifier
  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Create CodeChallenge
  async function generateCodeChallenge(e) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(e);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  // Request User Authorization
  let codeVerifier = generateRandomString(128);
 
  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
    window.location = 'https://accounts.spotify.com/authorize?' + args;
    // const urlParams = new URLSearchParams(window.location.search);
    // let code = urlParams.get('code');
  });
  
  // let codeVerifier2 = localStorage.getItem('code_verifier');
  // let body = new URLSearchParams({
  //   grant_type: 'authorization_code',
  //   code: code,
  //   redirect_uri: redirectUri,
  //   client_id: clientId,
  //   code_verifier: codeVerifier2
  // });

  // const response = fetch('https://accounts.spotify.com/api/token', {
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
    
  // },[])
    
  return (
    <p>aiueo</p>
  );
}

