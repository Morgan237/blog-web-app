const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

const dbURI = 'mongodb+srv://ninjamon:password1234@nodetuts.6dqj3.mongodb.net/NodeTuts?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=> {
        app.listen(3000)
        console.log('connection to db successful')
    })
    .catch(err => console.log(err))
//register view engine
app.set('view engine','ejs')


//middleware and static files...
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
// app.use(morgan('dev'));


//Routes------------------------------------------------------
app.get('/',(req,res)=>{
    // res.send('<p>Home page</p>')
    // res.sendFile('./views/index.html',{root:__dirname});
    res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    // res.send('<p>About page</p>')
    // res.sendFile('./views/about.html',{root:__dirname})
    res.render('about',{ title : 'About' })
})

app.use('/blogs',blogRoutes)

// 404 

app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{root:__dirname})
    res.status(404).render('404',{ title : '404' })
})


// mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title:'final blog 4 ',
//         snippet:'about my blog',
//         body:'more about my blog'
//     })

//     blog.save().then((result)=>{
//         res.send(result)
//         console.log('file successfuly saved...')
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then(result=>{
//         res.send(result)
//     }).catch(err =>{
//         console.log(err)
//     })
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('622b8f657fdad77b416bff94')
//     .then(result=>{
//         res.send(result)
//     }).catch(err=>{
//         console.log(err)
//     })
// })