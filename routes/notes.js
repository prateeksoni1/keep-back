const router = require("express").Router();
const Note = require("../models/noteModel");

router.get("/notes", (req, res) => {
  const id = req.query.id;
  console.log("id", id);
  Note.find({ author: id })
    .sort({ time: -1 })
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.send({ error: err });
    });
});

router.post("/note", (req, res) => {
  if (!req.user) {
    return res.status(403).send({ error: "No user login" });
  }

  Note.create({
    author: req.body.author,
    title: req.body.title,
    body: req.body.body,
    time: new Date()
  }).then(note => {
    console.log(note);
    res.send({ note });
  });
});

module.exports = router;
