const allowlist = [
  'http://localhost:3000',
  'http://localhost:3001',
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

// const corsOptionsDelegate = {
//   origin: [
//     'https://thedoft.mesto.students.nomoredomains.rocks',
//     'http://thedoft.mesto.students.nomoredomains.rocks',
//     'http://localhost:3000',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
//   credentials: true,
// };

// module.exports = corsOptionsDelegate;
