const express = require("express");
const mongoose = require('mongoose');
const Task    = require("../models/Task");
const User    = require('../models/User')


const router = express.Router();

router.get('/:id/myTasks', ( req,res,next ) => {
    let { id } = req.params;
    // {createdBy:ObjectId('5d447c38d3941c06a2f2475d'), assignedTo:ObjectId('5d447c40d3941c06a2f2475e')}


    Task.find({assignedTo:id})
    .then(data => 
        res.status(200).json(data))
    .catch(err => console.log(err))
})



router.put("/:id/:idTask/assignUser", (req, res) =>{
    const assign  = req.body.assignedTo
    const idTask = req.params.idTask
    Task.findByIdAndUpdate({_id: idTask}, {assignedTo:assign}, {new: true})
    .then((task) =>{
            res.json(task)  
        }).catch(err => res.status(400).json(err));
    })

router.post('/:id/addTask', (req, res) => {

    const {id}       = req.params;
    const { company, name, longDesc, completed, dueDate,
        startedDate, finishedDate, comments, assignedTo} = req.body;

    const newTask = new Task({createdBy:id, company, name, longDesc, completed, dueDate,
    startedDate, finishedDate, comments, assignedTo})
    newTask.save()
    .then(post => {
        res.status(200).json(post)
    })
        .catch(err => res.status(400).json(err));
});


module.exports = router;

// const userId = req.session.currentUser._id;
    




