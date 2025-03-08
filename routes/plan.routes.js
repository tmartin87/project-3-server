
// IMPORTS
const express = require("express");
const router = express.Router();

// AUTHENTICATION

const { isAuthenticated } = require("../middleware/jwt.middleware");

// MODELS
const Plan = require("../models/Plan.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const { findById, findByIdAndUpdate } = require("../models/Plan.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// GET ROUTES
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

// POST ROUTES
router.post("/plans", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  Plan.create({
    user: userId,
    title: req.body.title,
    details: req.body.details,
    date: req.body.date,
    isPrivate: req.body.isPrivate,
    location: req.body.location,
    frequency: req.body.frequency,
    image: req.body.image,
    comments: req.body.comments,
  })
    .then((createdPlan) => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { createdPlans: createdPlan._id } },
        { new: true }
      ).then(() => res.status(201).json(createdPlan));
    })
    .catch((error) => {
      console.error("Error al crear el plan:", error.response?.data || error.message);
      setErrorMessage("Error al crear el plan: " + (error.response?.data?.message || error.message));
    });
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

// PUT ROUTES
router.put("/plans/:planId", isAuthenticated, (req, res, next) => {
  Plan.findById(req.params.planId)
    .then((plan) => {
      if (!plan.user == req.payload._id) {
        return res.status(403).json({ message: "No se puede editar" });
      }
      return Plan.findByIdAndUpdate(req.params.planId, req.body, { new: true });
    })
    .then(() => res.json({ message: "Plan editado" }))
    .catch((err) => next(err));
});

// DELETE ROUTE
router.delete("/plans/:planId", isAuthenticated, (req, res, next) => {
  Plan.findById(req.params.planId)
    .then((plan) => {
      if (!plan.user == req.payload._id) {
        return res.status(403).json({ message: "No se puede borrar" });
      }
      return Plan.findByIdAndDelete(req.params.planId);
    })
    .then(() => res.json({ message: "Plan eliminado" }))
    .catch((err) => next(err));
});

module.exports = router;
