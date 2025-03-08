// IMPORTS
const express = require("express");
const router = express.Router();

// MODELS
const Comment = require("../models/Comment.model");

//DELETE ROUTE
router.delete("/comments/:commentId", (req, res, next) => {
  Comment.findById(req.params.commentId)
    .then((comment) => {
      if (!comment.user == req.payload._id) {
        return res.status(403).json({ message: "No se puede borrar" });
      }
      return Comment.findByIdAndDelete(req.params.commentId);
    })
    .then(() => res.json({ message: "Comentario eliminado" }))
    .catch((err) => next(err));
});

module.exports = router;
