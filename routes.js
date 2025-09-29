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

// get one task via id 
// :name des Parameters (hat Bedeutung), wird wieder aus request Objekt ausgelesen

router.get('/tasks/:id', async (req, res) => {
    
    //findOne gibt null zurück (vs. find gibt Array)
    let task = await Task.findOne({ _id: req.params.id }); // Objekte in der Datenbank suchen, die mit der id übereinstimmen

    if (task) {
        res.send(task);
    }
    else {
        res.status(404);
        res.send({
            error: "Task does not exist!"       // ich komme nicht zur Fehlermeldung, sondern Exception wird geworfen??
        });
    }
})



module.exports = router;