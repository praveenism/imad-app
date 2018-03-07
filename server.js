var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
      user:'thepraveenism',
      database:'thepraveenism',
      host:'db.imad.hasura-app.io',
      port:'5432',
      password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));


var articles ={
 'article-one':{
title:'Article one by Praveen',
heading:'Article 1',
content:`
    <p>
        This is the content.
    </p>
    <p>
        This is the content.

    </p>`

},
 'article-two':{
    title:'Article two by Praveen',
heading:'Article 2',
content:`
    <p>
        This is the content.
    </p>
    <p>
        This is the content.

    </p>` 
 },
 'article-three':{
     title:'Article three by Praveen',
heading:'Article 3',
content:`
    <p>
        This is the content.
    </p>
    <p>
        This is the content.

    </p>`
     
 }
};
function createTemplate(data){
heading=data.heading;
title=data.title;
content=data.content;
var htmlTemplate= `
<html>
    <head>
        <title>
            ${title}
        </title>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            Mar 2, 2018
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
</html>
`
;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-dp', function(req,res){
   pool.query('SELECT * FROM test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
   } );  
});

var counter=0;
app.get('/counter', function (req, res) {
counter=counter+1;
res.send(counter.toString());    
});

var names=[];
app.get('/submit-name',function(req, res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
app.get('/article/:articleName',function (req,res){
  
  pool.query('SELECT * FROM article WHERE title ='+'req.params.articleName',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length===0){
              result.status(404).send("Article not found");
          }else{
              var articleData=result.rows[0];
               res.send(createTemplate(articleData));
          }
      }
  });    
    
    
  var articleName=req.params.articleName;
 });


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
 