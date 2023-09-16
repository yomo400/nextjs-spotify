import { useEffect } from "react";

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
let codeVerifier = generateRandomString(128);

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

// Request User Authorization
const clientId = process.env.NEXT_PUBLIC_client_id;
const redirectUri = 'http://localhost:3000';

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
});


export default function Verifier(props) {
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
  },[])
    
  return (
    <p></p>
  );
}


