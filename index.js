const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./src/routes/users')
const BodyParser = require('body-parser');

app.use(BodyParser.json());


app.all('*', (req, res, next) => {
  const method = req.method;
  console.log(`Methode ${method} aangeroepen`);
  next();
});

app.use(userRouter);
// -----------------------------------------------------------
//Cant find location
app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  })
})
app.listen(port, () => {
  console.log(`Meal app listening on port ${port}`)
});