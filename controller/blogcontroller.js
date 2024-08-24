const lodash = require('lodash');
const fs = require('fs');
const axios = require('axios');

let allposts = [];
let blogData = "";
exports.bloghome = (req, res)=>{
    if(fs.existsSync('blogs.txt'))
    {
        blogData = fs.readFileSync('blogs.txt', 'utf-8');
        const blogObject = JSON.parse(blogData);
        allposts = blogObject;
    }
    res.render('home', {pagetitle:'My Blog', allposts});
}

exports.blogabout = (req, res)=>{
    let quote;
    axios.get("https://type.fit/api/quotes").then(resp=>{
        let val = Math.trunc(Math.random()*resp.data.length);
        quote = resp.data[val].text;
        res.render('about', {pagetitle:'About', quote});
     }).catch(err=>{
        console.log("Error happened", err);
        res.render('about', {pagetitle:'About', quote});
    })
}

exports.blogcontact = (req, res)=>{
    res.render('contact', {pagetitle:'Contact'});
}

exports.blogcompose = (req, res)=>{
    res.render('compose', {pagetitle:'Compose'});
}

exports.blogcomposePOST = (req, res)=>{
    let title = req.body.posttitle;
    let text = req.body.posttext;
    let today = new Date();
    let args = {
        weekday : "long",
        day : "numeric",
        month : "long",
        year:"numeric",
    }

    let date = today.toLocaleDateString('en-IN', args);

    allposts.unshift({title, date, text});

    const posts_str = JSON.stringify(allposts);
    fs.writeFile('blogs.txt', posts_str, (err)=>{
        if(err){
            console.log("Error in writing file", err);
        }
    })

    res.render('home', {pagetitle:"Home", allposts});
}


exports.blogpost = (req, res)=>{
    const {q} = req.query;
    let flag = 0;

    for(let post of  allposts)
    {
        if(lodash.lowerCase(q) === lodash.lowerCase(post.title)){
            res.render('post', {pagetitle:'blog', post});
            flag = 1;
            break;
        }
    }


    if(!flag){
        res.render('404', {pagetitle:"404", q});
    }
}