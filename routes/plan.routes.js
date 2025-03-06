const express = require("express");
const router = express.Router();

//Import isAuthenticated

const { isAuthenticated } = require("../middleware/jwt.middleware");

//import models
const Plan = require("../models/Plan.model");
const Comment = require("../models/Comment.model");
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
  User.findById(userId)
    .populate("createdPlans")
    .then((user) => {
      console.log("Planes creados:", user.createdPlans);
      res.status(200).json(user.createdPlans);
    })
    .catch((err) => next(err));
});

router.get("/plans/:planId", (req, res, next) => {
  const { planId } = req.params;
  Plan.findById(planId)
    .populate("user")
    .then((plan) => {
      console.log("Plan:", plan);
      res.status(200).json(plan);
    })
    .catch((err) => next(err));
});

router.get("/plans/:planId/comments", (req, res, next) => {
  const { planId } = req.params;
  Comment.find({ plan: planId })
    .populate("user")
    .then((comments) => {
      console.log("Comments:", comments);
      res.status(200).json(comments);
    })
    .catch((err) => next(err));
});

//Post routes
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

router.post("/plans/:planId/comments", (req, res, next) => {
  const { planId } = req.params;
  const { user, details } = req.body;

  Comment.create({
    user,
    plan: planId,
    details,
    createdDate: new Date(),
  })
    .then((createComment) => {
      res.status(201).json(createComment);
    })
    .catch((err) => {
      console.log("Error al crear el comentario:", err);
      next(err);
    });
});

// Put route

router.put("/plans/:planId", isAuthenticated, (req, res, next) => {
  Plan.findByIdAndUpdate(req.params.planId, req.body, { new: true })
    // .populate("comments")
    .then((plan) => {
      res.json(plan);
    })
    .catch((err) => next(err));
});

// Delete route

router.delete("/plans/:planId", isAuthenticated, (req, res, next) => {
  Plan.findByIdA(req.params.planId)
    .then((plan) => {
      res.json(plan);
    })
    .catch((err) => next(err));
});

module.exports = router;
