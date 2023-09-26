import { useEffect } from "react";
import generateRandomString from "./RandomString";

export default function Verifier(props) {
  console.log("Verifier");

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
    const digest = await crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  let args;

  generateCodeChallenge().then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';
    args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
    
  });

  useEffect (() => {
    window.location = 'https://accounts.spotify.com/authorize?' + args;
  },[])
    
  return (
    <p>aiueo</p>
  );
}

