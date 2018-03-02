var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/:articleName',function (req,res){
  var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter=0;
app.get('/counter', function (req, res) {
counter+=1;
res.send(counter.tostring());    
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
