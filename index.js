const express = require('express')
var bodyParser = require('body-parser')
const app = express()
require('./models/model.js')
var userctrl = require('./controllers/userController.js')
// const User = require('./models/user')
// const Contact = require('./models/contact')
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

//CRUD api
app.get('/add', userctrl.addUser)

app.get('/users',userctrl.getUsers)
app.get('/user/:id',userctrl.getUser)

app.post('/users',userctrl.postUsers)

app.delete('/user/',userctrl.deleteUser)

app.patch('/user/:id',userctrl.patchUser)


//manual query example with get set and virtuals
app.get('/query', userctrl.queryUser)

app.get('/get-set-virtual', userctrl.getSetVirtualUser)

app.get('/validateUser', userctrl.validateUser)

app.get('/raw-queries',userctrl.rawQueriesUser)


//searching-sorting-pagination
app.get('/pagination',userctrl.pagination)

app.get('/searching',userctrl.searching)

app.get('/sorting',userctrl.sorting)


//association
app.get('/one-to-one',userctrl.oneToOneUser)

app.get('/one-to-many',userctrl.oneToManyUser)

app.get('/many-to-many',userctrl.manyToManyUser)

app.get('/paranoid',userctrl.paranoidUser)

app.get('/eagerUser',userctrl.eagerUser)

app.get('/creator',userctrl.creatorUser)

app.get('/m-n-association',userctrl.mnAssociation)

app.get('/m2m2m',userctrl.m2m2mUser)

app.get('/scopes',userctrl.scopesUser)



















// User.sync()
// User.sync({ force: true});
// Contact.sync({ force: true});
// User.drop()


app.listen(3000,()=>{
    console.log("Port will be run")
})