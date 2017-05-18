var express = require('express');
var app = express();
var exec = require('child_process').exec;

app.get('/test',function(req,res){
    exec('adb devices',function(error,stdout, stderr){
        res.send(stdout);
    });
});
app.get('/',function(req,res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
});
