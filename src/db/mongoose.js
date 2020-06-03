const mongoose = require('mongoose')
const connectionURL = process.env.MONGODB_URL_CONNECTION
mongoose.connect(connectionURL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
})
