require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
