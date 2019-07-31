const express = require("express");
const Task    = require("../models/Task");

const router = express.Router();

router.get('/taskView', ( req,res,next ) => {
    Task.find().then(data => res.status(200).json(data))
    .catch(err => console.log(err))
})

router.post('/addTask', (req, res) => {
    const datosTask = req.body;

    const newTask = new Task(datosTask)
    newTask.save()
    .then(comentario => {
        res.json(comentario)
    })
    .catch(err => console.log(err));
})


module.exports = router;