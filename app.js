//ENVIRONMENT VARIABLES
require("dotenv").config();

//CONNECT DATABASE
require("./db");

//IMPORTS
const express = require("express");

//AUTHENTICATION
const { isAuthenticated } = require("./middleware/jwt.middleware");
const app = express();

require("./config")(app);

//ROUTES
const planRoutes = require("./routes/plan.routes");
app.use("/api", planRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/api", isAuthenticated, commentRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

//ERROR HANDLING
require("./error-handling")(app);

module.exports = app;
