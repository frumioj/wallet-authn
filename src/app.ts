import express from 'express';

const port = 3000;
const path = require('path')
const logging = require('morgan')
const app = express();

app.use(logging('combined'))
app.use('/', express.static(path.join('/home/johnk/src/wallet-authn/dist', 'public')))

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
