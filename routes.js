const express = require('express');
const router = express.Router(); //Router leitet Request an passende Route weiter
const Task = require('./models/tasks');


// get all tasks
router.get('/tasks', async (req, res) => {
    const allTasks = await Task.find();
    console.log(allTasks);
    res.send(allTasks);
});

// post one task
router.post('/tasks', async (req, res) => {
    const newTask = new Task({
        name: req.body.name,
        date: req.body.date,
    })
    await newTask.save();
    res.send(newTask);
});


module.exports = router;