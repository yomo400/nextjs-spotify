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

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  axios.post('https://accounts.spotify.com/api/token', 
    {headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
    .then((response) => {console.log(response);})
    .catch((error) => {console.log(error);})

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