const express = require("express");
const router = express.Router();

//Import isAuthenticated

const { isAuthenticated } = require("../middleware/jwt.middleware");

//import models
const Plan = require("../models/Plan.model");
const { findById, findByIdAndUpdate } = require("../models/Plan.model");

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
    .catch((err) => next(err));
});

router.get("/plans/public", (req, res, next) => {
  Plan.find({ isPrivate: false })
    .then((allPublicPlans) => {
      res.status(200).json(allPublicPlans);
    })
    .catch((err) => next(err));
});

router.get("/plans/:userId/my-created-plans", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId).populate("createdPlans");
});

router.get("/plans/:planId", (req, res, next) => {
  const { planId } = req.params;
  Plan.findById(planId)
    .populate("user")
    .then((plan) => {
      res.status(200).json(plan);
    })
    .catch((err) => next(err));
});

//Post route
router.post("/plans", isAuthenticated, (req, res, next) => {
  console.log(req.body);
  Plan.create({
    user: req.body.user,
    title: req.body.title,
    details: req.body.details,
    date: req.body.date,
    isPrivate: req.body.isPrivate,
    location: req.body.location,
    frequency: req.body.frequency,
    image: req.body.image,
    comments: req.body.comments,
  })
    .then((createPlan) => {
      res.status(201).json(createPlan);
    })
    .catch((err) => next(err));
});

// Put route

router.put("/plans/:planId", isAuthenticated, (req, res, next) => {
  Plan.findByIdAndUpdate(req.params.planId, req.body, { new: true })
    .populate("comments")
    .then((plan) => {
      res.json(plan);
    })
    .catch((err) => next(err));
});

// Delete route

router.delete("/plans/:planId", isAuthenticated, (req, res, next) => {
  Plan.findByIdAndDelete(req.params.planId)
    .then((plan) => {
      res.json(plan);
    })
    .catch((err) => next(err));
});

module.exports = router;
