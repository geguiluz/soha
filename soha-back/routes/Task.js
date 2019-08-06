const express = require("express");
const Task    = require("../models/Task");
const router  = express.Router();

//TODAS LAS TAREAS QUE CREASTE Y QUE TE ASIGNARON.
router.get('/:id/myTasks', ( req,res,next ) => {
    let { id } = req.params;
    Task.find( { $or: [ { createdBy:id}, { assignedTo:id } ] })
    .then(data => 
        res.status(200).json(data))
    .catch(err => console.log(err))
})


//SOLO TAREAS CREADAS POR EL USUARIO
router.get('/:id/myTasksDelegated', ( req,res,next ) => {
    let { id } = req.params;
    Task.find({ createdBy:id })
    .then(data => 
        res.status(200).json(data))
    .catch(err => console.log(err))
})

//ASIGNAS USUARIOS A UNA TAREA, DELEGAS LA TAREA 
router.put("/:id/:idTask/assignUser", (req, res) =>{
    const assign  = req.body.assignedTo
    const {idTask} = req.params

    Task.findByIdAndUpdate({_id: idTask}, {assignedTo:assign}, {new: true})
    .then((task) =>{
            res.json(task)  
        }).catch(err => res.status(400).json(err));
    })

// AGREGAS LA TAREA
router.post('/:id/addTask', (req, res) => {
    const {id}       = req.params;
    const { company, name, longDesc, completed, dueDate,
        startedDate, finishedDate, comments, assignedTo} = req.body;


    const newTask = new Task({createdBy:id, company, name, longDesc, completed, dueDate,
    startedDate, finishedDate, comments, assignedTo})

    newTask.save()
    .then(comentario => {
        res.json(comentario)
    })
    .catch(err => console.log(err));
})


//CAMBIAS EL ESTADO DE UNA TAREA (TRUE O FLASE). 
router.put('/:id/:idTask', (req, res) => {
    const {idTask}  = req.params
    const {completed} = req.body 
  
    Task.findByIdAndUpdate({_id: idTask}, {completed: completed}, {new: true})
    .then((task) =>{
            res.json(task)  
        }).catch(err => res.status(400).json(err));
    })

//BORRAS LAS TAREAS.
router.delete('/:id/:idTask/delete', (req, res) => {
    const {idTask, id} = req.params
    Task.findByIdAndDelete({_id: idTask})
        .then( data => {
            res.json(data)
        })
        .catch(err => console.log(err));
})

// CAMBIAR EL NOMBRE DE LA TASK.
router.put('/:id/:idTask/changeNameTask', (req, res) => {
    const {idTask} = req.params
    const {name}   = req.body

    Task.findByIdAndUpdate({_id: idTask}, {name: name}, {new: true})
        // .populate('Task',{name: 1, _id: 0})
            .then( data  => {
                res.json(data)
            })
            .catch( err => console.log((err)))
})

// AGREGAS LA INFORMACION DE LA TASK.


// AGREGAS Y CAMBIAS LA INFO DE LA TASK, TAMBIEN EL NOMBRE.






module.exports = router;

