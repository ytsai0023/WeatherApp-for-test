const express = require('express')
var exphbs  = require('express-handlebars');
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__filename)
//console.log(path.join(__dirname,'../public'))
const publicDirectoryPath = path.join(__dirname,'../public')

// view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(publicDirectoryPath))


app.get('/', function (req, res) {
    res.render('home',{
        title:'Weather App',
        name:'Andrew Mead'
    });
});

app.get('/about', function (req, res) {
    res.render('about',{
        title:'About',
        name:'Andrew Mead'
    });
});


app.get('/help', function (req, res) {
    res.render('help',{
        title:'Help',
        name:'Andrew Mead',
        message:'ipsum dolor sit amet consectetur adipisicing elit. Vel mollitia, ut voluptatum incidunt, commodi aliquid quis provident modi aliquam exercitationem, deserunt quos eos totam! Ad, debitis nesciunt. Velit, inventore. Vel.'
        
    });
});
// app.get('/',(req,res)=>{
//     res.render('index')
// })

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({error:'You have to provide a search string'})
    }
    res.send({products:[]})   
   
})

app.get('/help',(req,res)=>{
    res.send([{name:"Andrew",age:30},{name:"Salary"}])
})

app.get('/about',(req,res)=>{
    res.send("<h1>about</h1>")
})

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({error:'No query string'})
   }
  
   geocode(req.query.address,(err, { latitude, longitude, location}={})=>{
       if(err){
           return res.send({err})
       }
     
       forecast(latitude, longitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }
          
           res.send({
               forecast:forecastData,
               location,
               address:req.query.address
           })
       })
   })

   
     
   

})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        err_message:'article no found',
        name:"Andrew"
    })
 })


app.get('*',(req,res)=>{
   res.render('404page',{
       err_message:'page no found',
       name:"Andrew"
   })
})

app.listen(port,()=>{
    console.log('Sever is on port:'+port)
})