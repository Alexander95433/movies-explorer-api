const allowlist = [
  'http://localhost:3000',
  'https://jsonplaceholder.typicode.com/posts',
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
