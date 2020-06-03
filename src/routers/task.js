const express = require('express')
const Task = require('./../models/task')
const auth = require('./../middlewares/auth')
const router = express.Router()
router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({...req.body, owner: req.user._id})
        await task.save()

        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/tasks',auth, async (req, res)=>{
    const match = {}
    const sort = {}
    if (req.query.completed) 
        match.completed = req.query.completed === 'true'
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'?-1:1
    }
    
    try {
        //const tasks = await Task.find({owner: req.user._id })    
        await req.user.populate(
            { path: 'tasks',
              match: match,
              options: {
                  limit: parseInt(req.query.limit), 
                  skip: parseInt(req.query.skip),
                  sort
              }
            }).execPopulate()
         //const tasks = await Task.find({})   
         //console.log(req.user.tasks) 
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)    
        const task = await Task.findOne({_id, owner: req.user._id})    
        if(!task) return res.status(404).send("Tarefa não encontrada")
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.patch('/tasks/:id',auth, async (req, res)=> {
    const attributeNamesFromRequest = Object.keys(req.body)
    const isValidAttributes = attributeNamesFromRequest.every(attr=> ['description', 'completed'].includes(attr))
    if (!isValidAttributes) 
        return res.status(400).send("Há atributos inválidos")
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if (!task)
            return res.status(404).send('Tarefa não encontrada.')
        attributeNamesFromRequest.forEach(attName => task[attName]= req.body[attName])
        await task.save()
        return res.send(task)    
    } catch (error) {
        return res.status(500).send(error)
    }

})
router.delete('/tasks/:id',auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task)
            return res.status(404).send("Usuário não encontrado")
        return res.send(task)
    } catch (error) {
        return res.status(500).send('Não foi possível excluir')
    }
})
module.exports=router