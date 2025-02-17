const express = require("express");
const router = express.Router();

//Import isAuthenticated

const {isAuthenticated} = require("../middleware/jwt.middleware")

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
    .catch((err) => next(err))
});

router.get("/plans/:planId",  (req, res, next) => {
  Plan.findById(planId)
    .then((plan) => {
      res.status(200).json(plan);
    })
    .catch((err) => next(err))
});

//Post route
router.post("/plans", isAuthenticated, (req, res, next) => {
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
    .catch((err) => next(err))
});

// Put route

router.put("/plans/:planId", isAuthenticated, (req, res, next)=>{
  Plan.findByIdAndUpdate(req.params.planId, req.body,{new:true})
  .populate("Comments")
  .then((plan)=>{
    res.json(plan);
  })
  .catch((err) => next(err))
  
})

// Delete route

router.delete("/plans/:planId", isAuthenticated, (req, res, next)=>{
  Plan.findByIdAndDelete(req.params.planId)
  .then((plan)=>{
    res.json(plan);
  })
  .catch((err) => next(err))
})


module.exports = router;
