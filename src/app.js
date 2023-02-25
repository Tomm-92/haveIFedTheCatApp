const express = require("express");
const { Cat } = require("./models");

const app = express();

app.use(express.json());

app.post("/cats", (req, res) => {
  Cat.create(req.body)
    .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      console.error("error", err);
      res.status(400).json({ error: "Bad Request" });
    });
});

app.get("/cats", (req, res) => {
  Cat.findAll({ where: req.query })
    .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      console.error("error", err);
      res.status(400).json({ error: "Bad Request" });
    });
});

app.get("/cats/:catId", (req, res) => {
  Cat.findByPk(req.params.catId)
    .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      console.error("error", err);
      res.status(400).json({ error: "Bad Request" });
    });
});

app.patch("/cats/:catId", (req, res) => {
  Cat.update(req.body, { where: { id: req.params.catId } })
    .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      console.error("error", err);
      res.status(400).json({ error: "Bad Request" });
    });
});

app.patch("/feed/cat/:catId", (req, res) => {
  Cat.update({ lastFed: new Date() }, { where: { id: req.params.catId } })
    .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      console.error("error", err);
      res.status(400).json({ error: "Bad Request" });
    });
});

app.delete("/cats/:catId", (req, res) => {
  Cat.destroy({ where: { id: req.params.catId } })
    .then(res.sendStatus(201))
    .catch((err) => {
      console.error("error", err);
      res.status(400).json({ error: "Bad Request" });
    });
});

module.exports = app;
