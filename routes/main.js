var Users = require('../models/user.js');
var Task = require('../models/task.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports= function(app){

app.get('/' ,function(req,res,next){
 	if(req.isAuthenticated()){
		res.render('dashboard.ejs')
	}
	else{
		res.render('login.ejs')
	}
});

app.get('/logout', function(req, res) {
  req.logout();
  res.send(200,{msg:"logout"});
});


app.get('/login',function(req,res){
	if(req.isAuthenticated()){
		res.render('dashboard.ejs')
	}
	else{
		res.render('login.ejs')
	}

});


app.get('/register' ,function(req,res){
   res.render('register.ejs')
});

app.get('/dashboard' , function(req,res){
	if(req.isAuthenticated()){
		res.render('dashboard.ejs')
	}
	else{
		res.render('login.ejs')
	}
   
});

app.post('/add' ,function(req,res){
	console.log(req.isAuthenticated() ,req.user);
	console.log(req.user);
	     var newTask = Task({
	      user_id:req.user._id,
	      name:req.body.name,
	      description :req.body.description,
	      date:req.body.date
	});

	newTask.save(function(err) {
	  if (err) {
	  	console.log("errr" ,err);
	  	res.send(500,{msg:err.message})
	  }

	  else{
	  	console.log('Task created')
	  	res.send(200 ,{msg:"Task created"})
	  }

	})
})


app.get('/all',function(req,res){
	  Task.find({user_id:req.user._id}, function(err, tasks) {
	  	console.log(tasks);
	  	res.send(tasks)
	  })
})

app.post('/edit',function(req,res){

     console.log(req.body);
     upsertData={
     	name:req.body.name,
     	description:req.body.description

     }
	 Task.update({ _id: req.body.id }, upsertData, { multi: false }, function(err) {
	  	if(err){
	  		res.send(500 ,{msg:"Error Occured"})
	  	}

	  	else{
	  		res.send(200 ,{msg:"Task updated"})
	  	}
	  })
})

app.post('/delete',function(req,res){
	  Task.remove({ _id: req.body.id }, function(err) {
	  	if(err){
	  		res.send(500 ,{msg:"Error Occured"})
	  	}

	  	else{
	  		res.send(200 ,{msg:"Task Deleted"})
	  	}
	  })
})


app.post('/register' ,function(req,res){
   console.log(req.body);
   	var p = {
	  username: req.body.name,
	  email :req.body.email,
	  password:req.body.password
	}

	console.log("pppp" ,p)
	var newUser = Users(p);

 //    var newUser = Users({
	//   username: 'starlord55',
	//   email :'shivigoel75965@gm.com',
	//   password:'2222222'
	// });

	// save the user
	newUser.save(function(err) {
	  if (err) {
	  	  console.log("errr" ,err);
	  	  if(err.name=='BulkWriteError'){
            res.send(500,{msg:'Email already taken'})
	  	  }
	  	  else{
	  	  	res.render('notification.ejs',{val:err.message})
	  	  }
	  	  
	  }
      else{

	      console.log('User created!');
          	res.render('notification.ejs',{val:"User Created"})
        
	  
      }
	});
})



app.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/dashboard');
});


passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"},
    function(email, password, done) {
    	console.log(email ,password)
        Users.findOne({ email: email }, function (err, user) {
            if(user !== null) {
                user.comparePassword(password,function(err, isMatch) {

                	if(err){
                		return done(null, false);

                	}

                	if(isMatch) {
                    console.log("Username and password correct!");
                    return done(null, user);
                    }
                })
                
           } else {
               console.log("email does not exist!");
               return done(null, false);
           }
       });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
})
}// module.exports







