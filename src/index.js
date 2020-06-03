const express = require('express')
const app = express()
const port = process.env.PORT || 3003 // Port to listen server
require('./db/mongoose') // To connect ro the mongodb
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')
app.use(express.json())// To config json in body of request
app.use(userRouter)
app.use(taskRouter)
const upload = multer({
    dest: 'images',
    limits: {fileSize: 1000000},
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx|pdf|txt)$/))
            return cb(new Error("File type mut be pdf,doc,docx,xt"))
        cb(undefined, true)
    }
})
const errorMiddleware = (req, res, next) => {
    throw new Error('From upload')
}
app.post('/upload', upload.single('upload'), (req, res)=> {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
app.listen(port, ()=>{
    console.log(`Servidor está executando na porta: ${port}`)
})
