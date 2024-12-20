const jwt = require('jsonwebtoken');

    const generateToken = (id) => {
        if (!id) {
          throw new Error('User ID is required to generate a token');
        }
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      };

module.exports = { generateToken };
