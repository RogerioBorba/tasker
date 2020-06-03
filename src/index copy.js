const { MongoClient, ObjectID }  = require('mongodb')
const id = new ObjectID()
const connectionURL = 'mongodb+srv://rogerioborba:HHughsBMLTfstc4I@cluster0-gaqph.mongodb.net/test?retryWrites=true&w=majority'
const databaseName = 'tasker'
MongoClient.connect(connectionURL,{ useUnifiedTopology: true }, (error, connection)=>{
    if (error)
        return console.log("Coud not connect to database: ", error)
    
    const db = connection.db(databaseName)
    /* INSERT */
    // db.collection('user').insertOne({name: 'Rogerio', age: 49}, (error, result)=>{
    //     if (error)
    //         return console.log("Error in insert operation: ", error)
    //     console.log(result.ops)
    // })
    // db.collection('user').insertMany([{name: 'Sonia', age: 50}, {name: 'Luis', age: 68}], (error, result)=>{
    //     if (error)
    //         return console.log("Error in insert operation: ", error)
    //     console.log(result.ops)
    // })
        
    // db.collection('task').insertMany([
    //     {description: 'Atualizar controle de adesão', completed: true},
    //     {description: 'Aprender Node', completed: false},
    //     {description: 'Manual de boas práticas', completed: true}
    // ],(error, result)=> {
    //     if (error)
    //         return console.log("Error in insert operation: ", error)
    //     console.log(result.ops)
    // })
    /*"SEARCH"*/
    // db.collection('user').findOne({name: 'Sonia'},(error, user)=>{
    //     if (error)
    //         return console.log("Error in insert operation: ", error)
    //     console.log(user)
    // })
    // db.collection('user').find({age: 68}).toArray((error, result)=>{
    //     if (error)
    //        return console.log("Error in insert operation: ", error)
    //     console.log(result)
    // })
    
    // db.collection('task').findOne({_id: new ObjectID("5ec304dba1faf85ef84d509c")},(error, task)=>{
    //     if (error)
    //         return console.log("Error in insert operation: ", error)
    //     console.log(task)
    // })
    db.collection('task').find({completed: false}).toArray((error, tasks)=>{
        if (error)
           return console.log("Error in search operation: ", error)
        console.log(tasks)
    })
    /* UPDATE*/
    // db.collection('user').updateOne({_id: new ObjectID("5ec30564f05d7811c4613c16")},{
    //     $set: {name: 'Sônia'}
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
    // db.collection('task').updateMany({completed: false},{
    //     $set: {completed: true}
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
    /* DELETE*/
    // db.collection('user').deleteMany({age: {$gte: 50}}).then((result) => {
    //     console.log(result)    
    // }).catch((err) => {
    //     console.log(err)    
    // })
    db.collection('task').deleteOne({_id: new ObjectID("5ec304dba1faf85ef84d509b")}).then((result) => {
        console.log(result)    
    }).catch((err) => {
        console.log(err)    
    })
    /* COUNTER S*/
    // db.collection('user').find({age: 68}).count((error, count)=>{
    //     if (error)
    //        return console.log("Error in insert operation: ", error)
    //     console.log(count)
    // })
   
})    