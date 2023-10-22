import withSession from '@/middleware/session';

export default withSession (async(req, res) => {
  const user = req.session.get('user')
  res.json({...user})
})
