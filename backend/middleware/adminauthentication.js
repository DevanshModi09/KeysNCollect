const CustomError = require('../errors/index');
const authorizeAdmin = (req, res, next) => {
  console.log('admin route');
  if (req.user.role !== 'admin' && req.user.role !== 'techlead') {
    throw new CustomError.UnauthorizedError(
      'You are not authorized for this route',
    );
  }
  next();
};
