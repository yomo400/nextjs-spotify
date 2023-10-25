import withSession from '@/middleware/session';

const checkLogin = async(req, res) => {
  console.log('swr');

  console.log('checkLogin');
  const user = req.session.get('user')
  res.json({user})
}

export default withSession(checkLogin)
