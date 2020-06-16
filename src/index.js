const express = require('express');
require('./db/mongoose');
var cors = require('cors');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const showsRouter = require('./routes/tvShow');
const reviewRouter = require('./routes/review');
const ratingRouter = require('./routes/rating');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(showsRouter);
app.use(reviewRouter);
app.use(ratingRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
