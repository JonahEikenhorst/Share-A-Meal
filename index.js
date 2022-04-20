const express = require('express')
const app = express()
const port = 3000

const BodyParser = require('body-parser');
app.use(BodyParser.json());

let database = [];
let id = 0;

app.all('*', (req, res, next) => {
  const method = req.method;
  console.log(`Methode ${method} aangeroepen`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    result: "Hello World!"
  });
});

app.post('/api/meal', (req, res) => {
  let meal = req.body;
  console.log(meal);
  id++
  meal = {
    id,
    ...meal,
  };

  database.push(meal);
  console.log(database);
  res.status(201).json({
    status: 201,
    result: database,
  });
});


app.get('/api/meal', (req, res) => {
  res.status(200).json({
    status: 200,
    result: database,

  })
})

app.get('/api/meal/:mealId'), (req, res) => {
  const mealId = req.params.movieId
  let meal = database.filter((item) => item.id == mealId);
  if (meal.length > 0) {
    console.log(meal)
    res.status(200).json({
      status: 200,
      result: meal,
    })
  }
  else {
    res.status(404).json({
      status: 404,
      result: `Meal with ID ${mealId} not found`,
    });
  }
};

app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});