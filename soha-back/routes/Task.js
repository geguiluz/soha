const express = require("express");
const Task    = require("../models/Task");

const router = express.Router();

router.get('/:id/myTasks', ( req,res,next ) => {
    let { id } = req.params;

    Task.find({createdBy:id}).then(data => res.status(200).json(data))
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


router.get('/myTask', (req,res,) => {
    tas
})


module.exports = router;

