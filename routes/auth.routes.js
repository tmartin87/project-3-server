//IMPORTS
const express = require("express");
const router = express.Router();

//ENCRYPTION
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//MODELS
const User = require("../models/User.model");
const Plan = require("../models/Plan.model.js");

//AUTHENTICATED
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//SALT
const saltRounds = 10;

// POST ROUTES
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;

      const user = { email, name, _id };

      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;

        const payload = { _id, email, name };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

router.post("/user/:userId/createdPlans", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

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
    .then((createPlan) => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { createdPlans: createPlan._id } },
        { new: true }
      ).then(() => res.status(201).json(createPlan));
    })
    .catch((err) => next(err));
});

//PUT ROUTES
router.put("/:userId", isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

router.put("/user/:userId/my-plans", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  const { planId } = req.body;
  try {
    const user = User.findById(userId);
    const plan = Plan.findById(planId);

    if (!user || !plan) {
      return res.status(404).json({ message: "Usuario o plan no encontrado" });
    }
    if (user.myPlans.includes(planId)) {
      return res.status(400).json({ message: "Ya estás apuntado a este plan" });
    }

    User.findByIdAndUpdate(
      userId,
      { $push: { myPlans: planId } },
      { new: true }
    );
    Plan.findByIdAndUpdate(
      planId,
      { $push: { attendance: userId } },
      { new: true }
    );

    res.status(200).json({ message: "Te has apuntado al plan" });
  } catch (err) {
    next(err);
  }
});


//GET ROUTES
router.get("/user/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);

  res.status(200).json(req.payload);
});

router.get("/user/:userId/created-plans", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  Plan.find({ user: userId })
    .then((plans) => {
      if (!plans || plans.length === 0) {
        return res.status(404).json({ message: "Aún no has creado planes." });
      }
      res.status(200).json(plans);
    })
    .catch((err) => next(err));
});

module.exports = router;
