const express      = require('express');
const router       = express.Router();
const Task         = require('../models/Task')
const listSchema = require('../models/UserTaskList')

router.post('/dashboardTasks', (req, res) => {
    const datosListTask = req.body;
    const newListTask = new listSchema(datosListTask)
    newListTask.save()
    .then(comentario => {
        res.json(comentario)
    })
    .catch(err => console.log(err));
})


router.get('/dashboardTasks', (req, res) => {
    listSchema.find()
    .populate('listSchema', {listName: 1, _id: 0, tasks: 1 })
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => console.log(err))
})

module.exports = router;
