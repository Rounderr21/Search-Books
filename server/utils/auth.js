const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server'); // Import AuthenticationError from Apollo Server

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = async ({ req }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7); // Remove 'Bearer ' from the token string
  }

  if (!token) {
    throw new AuthenticationError('Authorization failed: Token not found.');
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    // Return the user data to be accessible in resolvers via context
    return { user: data };
  } catch (error) {
    throw new AuthenticationError('Authorization failed: Invalid token.');
  }
};

module.exports = { authMiddleware };
