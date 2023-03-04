const express = require('express')
const { default: mongoose } = require('mongoose')
const router=express.Router()
const employee = require('../models/employee')
//GET ALL
router.get('/',async(req,res)=>{
    try {
        const employe = await employee.find()
        res.json(employe)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }

})
//GET ONE
router.get('/:id',getemployee,(req,res)=>{
    res.json(res.employe)


})

//CREATE ONE
router.post('/',async(req,res)=>{

    const employe = new employee({
        name: req.body.name,
        age: req.body.age
      })
      try {
        const newemploye= await employe.save()
        res.status(201).json(newemploye)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }

})
//UPDATE ONE
router.patch('/:id', getemployee, async (req, res) => {
  console.log(req.body.name);
  const update={
    name:req.body.name,
    age:req.body.age

   
  }
      try {
        console.log(update);
        const done=await employee.findByIdAndUpdate(req.params.id,{$set:update},{new:true});
       done.save()
        res.json(done)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    

})
//DELETE ONE
router.delete('/:id',getemployee,async (req,res)=>{

    try {
        await res.employe.remove()
        res.json({ message: 'Deleted ' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

async function getemployee(req, res, next) {
    let employe
    try {
      employe = await employee.findById(req.params.id)
      if (employe == null) {
        return res.status(404).json({ message: 'Cannot find employee' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.employe = employe
    next()
  }
module.exports=router