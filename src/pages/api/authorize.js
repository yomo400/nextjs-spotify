export default async function authorize (req, res) {
  const {code, state} = req.query
  let codeVerifier = localStorage.getItem('code_verifier')
  
}