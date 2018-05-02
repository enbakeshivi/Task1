module.exports= function(app){

app.get('/' ,function(req,res,next){
 res.render('index.ejs',{title:"Welcome"})
});

app.get('/login',function(req,res){
	res.render('login.ejs',{val:"LOGIN"})

});

app.get('/register' ,function(req,res){
   res.render('register.pug')
});

app.get('/dashboard' , function(req,res){
   res.render('dashboard.pug')
});

}

