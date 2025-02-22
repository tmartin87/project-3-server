const express = require("express");
const router = express.Router();

//import model
const Comment = require("../models/Comment.model")

//Post route
router.post("/comments", (req, res, next) => {
    Comment.create({
        user: req.body.user,
        plan: req.body.plan,
        details: req.body.details,
        createdDate: req.body.createdDate 
    }, {new:true}
)
.then((createComment) => {
    res.status(201).json(createComment)
})
.catch((err) => next(err))
})


//Delete route
router.delete("/comments/:commentId", (req, res, next ) => {
    Comment.findByIdAndDelete(req.params.commentId)
    .then((comment) => {
        res.json(comment);
    })
    .catch((err) => next(err))
    
})

module.exports = router;