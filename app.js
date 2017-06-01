var express = require('express');
var fs = require('fs');
var app = express();
var exec = require('child_process').exec;

var deviceId = "G4AZCY00E964";
//var deviceId = "127.0.0.1:55551"

var path = "C:/Users/caev0/Documents/2017-10/Asistencia/repoSacarCosas-master/repoSacarCosas/testing_apks/"
//var path = "/root/" 
app.get('/test',function(req,res){
    exec('adb devices',function(error,stdout, stderr){
        res.send(stdout);
    });
});

app.get('/screenshot', function(req,res){
	exec("adb shell screencap -p /sdcard/screen.png", function(error, stdout, stderr){if(error){res.send(stderr)}});
	exec("adb pull /sdcard/screen.png C:/Users/caev0/Documents/2017-10/Asistencia/repoSacarCosas-master/repoSacarCosas", function(error, stdout, stderr){if(error){res.send(stderr)}});
	exec("adb shell rm /sdcard/screen.png", function(error, stdout, stderr){if(error){res.send(stderr)}});
	setTimeout(function() {res.sendFile("C:/Users/caev0/Documents/2017-10/Asistencia/repoSacarCosas-master/repoSacarCosas/screen.png");}, 5000);
	
});

app.get('/packages', function(req,res){
	exec("adb -s "+ deviceId +" shell pm list packages -f",function(error,stdout,stderr){
		res.send(stdout)
	});
});

app.get('/logcat',function(req, res){
	exec("adb -s "+ deviceId +" shell logcat -d | findstr "+req.query.pkg, function(error,stdout,stderr){
		res.send(stdout);
	});
});

app.get('/monkey',function(req,res){
	exec("adb -s "+ deviceId +" shell monkey -p "+req.query.pkg+" -v "+req.query.iter,function(error,stdout,stderr){
		res.send(stdout);
	});
});

app.get('/sapp',function(req,res){
	exec("adb -s "+ deviceId +" shell monkey -p "+req.query.pkg+" -v 1",function(error,stdout,stderr){
		res.send(stdout);
	});
});
app.get('/install',function(req,res){
	exec("git clone https://caev03@gitlab.com/elsmmtaa_repos/testing_apks.git",function(error,stdout,stderr){res.send(stdout)});
	while(!fs.existsSync("C:/Users/caev0/Documents/2017-10/Asistencia/repoSacarCosas-master/repoSacarCosas/testing_apks/mileage.apk")){};
	console.log("huehuehue");
});

app.get('/iapp',function(req,res){
	exec("adb -s "+ deviceId +" install "+path+req.query.app,function(error,stdout,stderr){
		res.send(stdout);
	});
});


/**
app.get('/',function(req,res){
	exec("",function(error,stdout,stderr){
		res.send(stdout);
	});
});

**/
app.get('/',function(req,res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
});

// adb -s G4AZCY00E964 shell pm list packages -f