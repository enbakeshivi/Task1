var Users = require('../models/user.js');
var Task = require('../models/task.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports= function(app){

app.get('/' ,function(req,res,next){
 res.render('index.ejs',{title:"Welcome"})
});

app.get('/logout', function(req, res) {
	    res.redirect('/');
        req.logout();
       
    });


app.get('/login',function(req,res){
	res.render('login.ejs',{val:"LOGIN"})

});

app.get('/register' ,function(req,res){
   res.render('register.ejs',{val:"REGISTER"})
});

app.get('/dashboard' , function(req,res){
   res.render('dashboard.ejs')
});

app.post('/add' ,function(req,res){
	console.log(req.body);
	     var newTask = Task({
	      name:req.body.name,
	      description :req.body.description
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
	  Task.find({}, function(err, tasks) {
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
	  	  	res.send(500,{msg:err.message})
	  	  }
	  	  
	  }
      else{

	  console.log('User created!');
	  res.send(200 ,{msg:"User created"})
      }
	});
})








 //    passport.serializeUser(function(user, done) {
 //        done(null, user.id);
 //    });

 //    // used to deserialize the user
 //    passport.deserializeUser(function(id, done) {
 //        User.findById(id, function(err, user) {
 //            done(err, user);
 //        });
 //    });


 //    passport.use('local-signup', new LocalStrategy({
 //        // by default, local strategy uses username and password, we will override with email
 //        usernameField : 'email',
 //        passwordField : 'password',
 //        passReqToCallback : true // allows us to pass back the entire request to the callback
 //    },
 //    function(req, email, password, done) {

 //        // asynchronous
 //        // User.findOne wont fire unless data is sent back
 //        process.nextTick(function() {

 //        // find a user whose email is the same as the forms email
 //        // we are checking to see if the user trying to login already exists
   
 //                var newUser            = new Users({	
	//                                       username: req.body.name,
	//                                       email :req.body.email,
	//                                       password:req.body.password
	//                                       });
 //                // newUser.local.email    = email;
 //                // newUser.local.password = newUser.generateHash(password);

 //                // save the user
 //                newUser.save(function(err) {
 //                    if (err){
 //                     return done(null,err)
 //                    }
                       
 //                    return done(null, newUser);
 //                    }
 //                });
           
 //        });

 //    }));



 // app.post('/register', passport.authenticate('local-signup', {
 //        successRedirect : '/login', // redirect to the secure profile section
 //        failureRedirect : '/register', // redirect back to the signup page if there is an error
 //    }));













}// module.exports

