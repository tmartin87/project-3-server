// IMPORTS
const express = require("express");
const logger = require("morgan");

//COOKIES
const cookieParser = require("cookie-parser");

//CORS
const cors = require("cors");

//MIDDLEWARE CONFIGURATION
module.exports = (app) => {
  app.set("trust proxy", 1);
  app.use(cors());

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
