const express = require("express");
const router = express.Router();

//import model
const Comment = require("../models/Comment.model");

//Delete route
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
