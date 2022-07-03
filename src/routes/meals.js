var express = require("express");
var router = express.Router();
const mealController = require("../controllers/meal.controller.js");
const authController = require("../controllers/auth.controller.js")

router.post("/meal", authController.validateToken, mealController.validateMeal, mealController.addMeal);

router.get("/meal", mealController.getAllMeals);

router.get("/meal/:mealId", mealController.getMealById);

router.put("/meal/:mealId",  authController.validateToken, mealController.validateMeal, mealController.updateMeal);

router.delete("/meal/:mealId",authController.validateToken, mealController.validateMeal, mealController.deleteMeal);

module.exports = router;