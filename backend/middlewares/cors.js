const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

const corsMiddleware = cors(corsOptions);
module.exports = corsMiddleware;
  