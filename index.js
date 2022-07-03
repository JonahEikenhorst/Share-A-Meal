const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const userRouter = require('./src/routes/users')
const mealRouter = require('./src/routes/meals')
const authRouter = require('./src/routes/auth')
const BodyParser = require('body-parser');

app.use(BodyParser.json());


app.all('*', (req, res, next) => {
  const method = req.method;
  console.log(`Methode ${method} aangeroepen`);
  next();
});

app.use('/api', userRouter);
app.use('/api', mealRouter);
app.use('/api', authRouter);
// -----------------------------------------------------------
//Cant find location
app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  })
})

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

//Auto listen message
app.listen(port, () => {
  console.log(`Meal app listening on port ${port}`)
});

module.exports = app;