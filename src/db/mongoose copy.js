const mongoose = require('mongoose')
const validator = require('validator')
const connectionURL = 'mongodb+srv://rogerioborba:HHughsBMLTfstc4I@cluster0-gaqph.mongodb.net/task-manager-api?retryWrites=true&w=majority'
mongoose.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}).then(
    () => {
        // const User = mongoose.model("User", {
        //     name: {type: String, required: true, trim: true},
        //     age: {
        //         type: Number,
        //         default: 0,  
        //         validate(value) { if (value < 0 ) throw Error("Idade deve ser maior que 0")}
        //     },
        //     email: {
        //         type: String,
        //         required: true,
        //         trim: true,
        //         validate(value) {
        //             if (!validator.isEmail(value))throw Error("email está incorreto")
        //         }
        //     },
        //     password: {
        //         type: String,
        //         required: true,
        //         trim: true,
        //         minlength: 6

        //     }
        // })
        
        // const objUser = new User({name: 'Sonia', age: 50, email: 'sonia@gmail.com.br', password: '12345' })
        // objUser.save().then(() => {
        //     console.log(objUser)
        // }).catch((err) => {
        //     console.log(err)
            
        // })
        const Task = mongoose.model("Task", {
            description: {type: String, required: true, trim: true},
            completed: {type: Boolean, default: false}
        })
        const objTask = new Task({description: 'Responder email sobre perfil MGB'})
        objTask.save().then(() => {
            console.log(objTask)
        }).catch((err) => {
            console.log(err)
        });
    },
    err => { console.log("Erro: ", err)}
)
