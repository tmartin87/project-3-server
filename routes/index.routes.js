const express = require("express");
const router = express.Router();

//import models
const Plan = require("../models/Plan.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Plans Routes
//Routes get
router.get("/plans", (req, res, next) => {
  Plan.find({})
    .then((allPlans) => {
      res.status(200).json(allPlans);
    })
    .catch((error) => {
      res.status(500).json({ message: "Plans not found" });
    });
});

router.get("/plans/:planId", (req, res, next) => {
  Plan.findById(planId)
    .then((plan) => {
      res.status(200).json(plan);
    })
    .catch((error) => {
      res.status(500).json({ message: "Plan not found" });
    });
});

//Post route
router.post("/plans", (req, res) => {
  Plan.create(
    {
      user: req.body.user,
      name: req.body.name,
      details: req.body.details,
      date: req.body.date,
      location: req.body.location,
      frequency: req.body.frequency,
      image: req.body.image,
      attendance: req.body.attendance,
      comments: req.body.comments
    },
    { new: true }
  )
    .then((createPlan) => {
      res.status(201).json(createPlan);
    })
    .catch((error) => {
      res.status(500).json({ message: "failed to create plan" });
    });
});

module.exports = router;
