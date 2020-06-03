const express = require('express')
const User = require('./../models/user')
const auth = require('./../middlewares/auth')
const sharp = require('sharp')
const multer = require('multer')
const router = express.Router()
const {sendEmailWelcome, sendEmailCancelation} = require('./../emails/account')
const upload = multer({
    //dest: 'avatars',
    limits: {fileSize: 1000000},
    fileFilter(req, file, cb) {
        console.log(file.originalname)
        if(!file.originalname.match(/\.(jpg|jpeg|png|bmp)$/))
            return cb(new Error("File type not acepted"))
        cb(undefined, true)
    }
})
function isAttributesValid(attributeNamestoBeChecked)  {
    const userAttributes = ['email', 'name', 'age', 'password', 'avatar']
    return attributeNamestoBeChecked.every(attr=> userAttributes.includes(attr))
}
router.post('/users/me/avatar', auth, upload.single('avatar') ,async (req, res)=>{
    //const avatar = req.file.buffer
    const avatar = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = avatar
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
router.post('/users', async (req, res)=> {
    const attributeNamesFromRequest = Object.keys(req.body)
    if (!isAttributesValid(attributeNamesFromRequest)) 
        return res.status(400).send("Há atributos inválidos")
    try {
        const user = new User(req.body)
        await user.save()
        sendEmailWelcome(user.name, user.email)
        return res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
    
})
router.post('/users/me', auth, async (req, res)=>{
 
    const user = new User(req.body)
    try {
        await user.save()    
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
        //res.status(201).send(user)
    } catch (error) {
        console.log("Error: " + error)
        res.status(400).send(error)        
    }
})
router.post('/users/login', async (req, res)=> {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        console.log(error)
        res.status(404).send("Unable to loging")
    }
})
router.post('/users/logout',auth ,async (req, res)=> {
    try {
        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send("Não foi possível logar.")
    }
})
router.post('/users/logout-all',auth ,async (req, res)=> {
    try {
        req.user.tokens = []
        await req.user.save()    
    } catch (error) {
        
    }
    
})
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
})

router.get('/users/me',auth ,async (req, res)=>{
     return res.send(req.user)
})
router.get('/users/me/avatar',auth ,async (req, res)=>{
    res.set("Content-Type", 'image/png')
    return res.send(req.user.avatar)
    //return res.send(req.user)
})
router.get('/users/:id/avatar', async (req, res)=> {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)    
        if (!user) return res.status(404).send("Usuário não encontrado")
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        return res.status(500).send(error)
    }
})
// router.patch('/users/:id', async (req, res)=> {
//     const attributeNamesFromRequest = Object.keys(req.body)
//     if (!isAttributesValid(attributeNamesFromRequest)) 
//         return res.status(400).send("Há atributos inválidos")
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user)
//             return res.status(404).send("Usuário não encontrado")
//         attributeNamesFromRequest.forEach(attrName => user[attrName] = req.body[attrName])
//         await user.save()
//         return res.send(user)
//     } catch (error) {
//         return res.send(error)
//     }
// })
router.patch('/users/me', auth,async (req, res)=> {
    const attributeNamesFromRequest = Object.keys(req.body)
    if (!isAttributesValid(attributeNamesFromRequest)) 
        return res.status(400).send("Há atributos inválidos")
    try {
        const user = req.user
        attributeNamesFromRequest.forEach(attrName => user[attrName] = req.body[attrName])
        await user.save()
        return res.send(user)
    } catch (error) {
        return res.send(error)
    }
})
router.delete('/users/me',auth ,async (req, res) => {
    try {
        await req.user.remove()
        res.send("User removed")
        sendEmailCancelation(user.name, user.email)
    } catch (error) {
        return res.status(500).send('Não foi possível excluir')
    }
})

// router.delete('/users/:id',auth ,async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user)
//             return res.status(404).send("Usuário não encontrado")
//         return res.send(user)
//     } catch (error) {
//         return res.status(500).send('Não foi possível excluir')
//     }
// })
module.exports=router