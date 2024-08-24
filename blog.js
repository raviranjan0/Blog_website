const express = require('express');
const blogroute = require('./routes/blogroute');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use('/', blogroute);
app.use('/blog', blogroute);



app.listen(5000, ()=>{
    console.log("server is running @5000");
})