require('./../db/mongoose')
const User = require('./../models/user')
const Task = require('./../models/task')
// User.findByIdAndUpdate('5ec345c84b67cf55b0ff6bd9', {age: 49}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 49})

// }).then((result)=>{
//     console.log(result)
// }).catch((error)=> {
//     console.log(error)
// })
Task.findByIdAndDelete('5ec964e159c0e05578aeb3f8').then((task)=>{
    console.log(task)
   return Task.countDocuments({completed: false})
}).then((result) =>{
    console.log(result)
}).catch((error)=> {
    console.log(error)
})