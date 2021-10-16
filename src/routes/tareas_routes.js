const express = require('express')
const router = express.Router()
const Tarea = require('../models/task')


router.get('/', async (req,res)=>{
    const tareas = await Tarea.find();
    console.log(tareas)
    res.json(tareas)
})

router.get('/:id', async (req,res)=>{
    const tarea = await Tarea.findById(req.params.id);
    res.json(tarea);
})

router.post('/', async (req,res)=>{
    const {titulo,descripcion} = req.body
    const tarea = new Tarea({titulo,descripcion})
    await tarea.save();

    res.json({status: "tarea guardada"})
})

router.put('/:id', async (req,res)=>{
    const {titulo,descripcion} = req.body;
    const newTarea = {titulo, descripcion};
    await Tarea.findByIdAndUpdate(req.params.id,newTarea);
    res.json({status: "Tarea actualizada"})

})

router.delete('/:id', async (req,res)=>{
    await Tarea.findByIdAndRemove(req.params.id)
    res.json({status: "Tarea eliminada"})
})




module.exports = router;