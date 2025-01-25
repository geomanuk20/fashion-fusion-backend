import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
