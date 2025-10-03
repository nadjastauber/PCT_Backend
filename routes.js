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
//request body enthält infos??
router.post('/tasks', async (req, res) => {
    const newTask = new Task({      //Werte aus req-Objekt auslesen
        status: req.body.status,
        name: req.body.name,
        date: req.body.date,
    })
    await newTask.save();
    res.send(newTask);
});

// get one task via id 
// :name des Parameters (hat Bedeutung), wird wieder aus request Objekt ausgelesen
// request params bezieht sich auf letzten Abschnitt URL?

router.get('/tasks/:id', async (req, res) => {
    
    //findOne gibt Objekt oder null zurück (vs. find gibt Array zurück)
    try{
        let task = await Task.findOne({ _id: req.params.id }); // Objekte in der Datenbank suchen, die mit der id übereinstimmen
        res.send(task);
    }

    catch(err){
        res.status(404)
        res.send({
            error: "Task does not exist!"       // falls kein Task mit id gefunden, Fehlermdeldung
        });

    }
})

// update one task
// status wird nur über Button geändert
router.patch('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (req.body.name) {
            task.name = req.body.name
        }

        if (req.body.date) {
            task.date = req.body.date
        }

        await Task.updateOne({ _id: req.params.id }, task);     //updateOne ändert und sendet id zurück (sehe ich das?)
        res.send(task)
    } catch {                                                   //brauche ich den zweiten Teil, ich debe die Ids ja eig nicht ein??
       res.status(404)
        res.send({ error: "Task does not exist!" })
    }
});

// delete one task via id
router.delete('/tasks/:id', async(req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id })
        res.status(204).send() // status 204 schickt keine Meldung mit
    } catch {
        res.status(404)
        res.send({ error: "Task does not exist!" })
    }
});

module.exports = router; //damit router überall in Projekt genutzt werden kann (alle Endpunkte genutzt werden können)