const express = require("express");
const Task    = require("../models/Task");

const router = express.Router();

router.get('/:id/taskView', ( req,res,next ) => {
    Task.find().then(data => res.status(200).json(data))
    .catch(err => console.log(err))
})

router.post('/:id/addTask', (req, res) => {
    const {id} = req.params
    const {company,name,longDesc, completed, dueDate, startedDate
        ,finishedDate,comments,assignedTo} = req.body;

    const newTask = new Task({createdBy:id, company, name, longDesc, completed, dueDate,
    startedDate, finishedDate, comments, assignedTo})

    newTask.save()
    .then(comentario => {
        res.json(comentario)
    })
    .catch(err => console.log(err));
})


module.exports = router;