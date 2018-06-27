const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
hbs.registerPartials(__dirname+'/views/partials');


app.use((req,res,next)=>{
  var now= Date().toString();
  var log=`${now}: ${req.method}: ${req.url}`
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append file');
    }
  });
  next();
});
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    website: 'My Website',
    welcomeMessage: 'welcome to my website',
    currentYear: new Date().getFullYear(),
    pageTitle: 'Home Page'
  });
});

app.get('/about',(req,res)=>{
  // res.send('About Page');
  res.render('about.hbs' ,{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Bad Request'
  });
});

app.listen(3000,()=>{
  console.log('server is up on the port 3000');
});
