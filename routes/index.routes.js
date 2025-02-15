const express = require("express");
const router = express.Router();


//import models
const Plan = require("../models/Plan.model");
const User= require("../models/User.model");
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

// Put route

router.put("/plans/:planId", (req, res)=>{
  Plan.findByIdAndUpdate(req.params.planId, req.body,{new:true})
  .then((plan)=>{
    res.json(plan);
  })
  .catch((error)=>{
    res.status(500).json({message: "failed updating a plan"})
  })
  
})

// Delete route

router.delete("/plans/:planId",(req, res)=>{
  Plan.findByIdAndDelete(req.params.planId)
  .then((plan)=>{
    res.json(plan);
  })
  .catch((error)=>{
    res.status(500).json({message: "failed deleting a plan"})
  })
})


// User routes

// Get route

/* router.get("/users/:userId" ,(req,res)=>{
  User.findById(userId)
  .then((user)=>{
    res.json(user);
  })
  .catch((error)=>{
    res.status(500).json({message: "failed finding a user"})
  })
})

// Put route

router.put("/users/:userId", (req,res)=>{
  User.findByIdAndUpdate(req.params.userId, req.body,{new:true})

  .then((user)=>{
    res.json(user);
  })
  .catch((error)=>{
    res.status(500).json({message: "failed updating a user"})
  })
}) */

// Post user

/* router.post("/users",(req,res)=>{
  User.create({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    image: req.body.image

  })
  .then((createdUser)=>{
    res.status(201).json(createdUser);
  })
  .catch((error)=>{
    console.log(req.body);
    res.status(500).json({error: "failed creating a user"})
  })


})
 */


module.exports = router;
