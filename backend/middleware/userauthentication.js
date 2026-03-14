const CustomError = require('../errors/index');
const { isTokenValid } = require('../utils/index');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError(
      'Authentication Invalid :Token Not Present',
    );
  }
  try {
    console.log(token);
    const { username, userID, role } = isTokenValid({ token });
    req.user = { username, userID, role };
    console.log(req.user);
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      'Authentication Invalid : Invalid Token',
    );
  }
};

module.exports = authenticateUser;
