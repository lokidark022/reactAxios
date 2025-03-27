const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const jwt = require("jsonwebtoken")
const app = express()


app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_db"
})





let users = [
    {
      username: "admin@admin.com",
      password: "admin",
      isAdmin: true,
    },
    {
      username: "admin2@admin.com",
      password: "admin2",
      isAdmin: false,
    },
  ];


let refreshTokens = [];
app.post("/refresh", (req,res) => {
    const refreshToken = req.body.token;

    if(!refreshToken) return res.status(401).json("You are not authenticated!");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err,user) =>{
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefrestToken(user);

        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            isValid:true,
            accessToken: newAccessToken,
            refreshToken:  newRefreshToken
        })
    })


})


const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if(authHeader){
        const token = authHeader.split(" ")[1];
      
        jwt.verify(token, "mySecretKey", (err, user) => {
       
            if(err){
                return res.status(403).json("Token is not valid");
            }
          

            req.user = user;
            next();
        });
    }else {
        res.status(401).json("You are not authenticated" );
    }
};
////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////
const socket_PORT = 5001;


  //New imports
  //New imports
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});
let ActiveUsers = [];
let GlobalMessages  = new Array();
//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);


  //Listens and logs the message to the console
  socket.on('message', (data) => {
    GlobalMessages.push(data);
    socketIO.emit('messageResponse', GlobalMessages);
 //   console.log(GlobalMessages);
  });

  
  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    
    ActiveUsers.push(data);
    //console.log(ActiveUsers.length);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', ActiveUsers);
  });


  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        ActiveUsers = ActiveUsers.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', ActiveUsers);
  });
});

app.get('/globalmessage', (req, res) => {
    res.json({
      message: GlobalMessages,
    });
  });

http.listen(socket_PORT, () => {
    console.log(`Chat Server Running!. PORT ${socket_PORT}`);
  });

////////////////////////////////////////////////////////////

























///////////////////////////////////////////////////
app.post("/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    if(refreshTokens){
        res.status(200).json({message:refreshToken});
    }

   
  });
/////////////////////////////////////////////////////////
  app.get("/authvalid", verify, (req, res) => {

    res.status(200).json("valid");
  });
//////////////////////////////////////////////////////////////

app.delete("/users/:userId",verify,(req,res) => {
    res.status(200).json(" delete valid actions");
    // if (req.user.id === req.params.userId || req.user.isAdmin) {
    //     res.status(200).json("User has been deleted.");
    //   } else {
    //     res.status(403).json("You are not allowed to delete this user!");
    //   }
})



const generateAccessToken = (user) => {
    return jwt.sign({id: user.id,username:user.username}, "mySecretKey", { expiresIn: "5s"});
};

const generateRefrestToken = (user) => {
    return jwt.sign({id: user.id,username:user.username}, "myRefreshSecretKey");
}

app.post('/api/login', (req, res) => {
   

    // const values = {
    //     req.body.username,
    //     req.body.password,
    //    }
    const user = users.find((u) => {
        return u.username === req.body.email && u.password === req.body.password;
    });
    if(user){
        // res.json(user)
        // const accessToken = jwt.sign({id: user.id,username:user.username}, "mySecretKey", { expiresIn: "15m"});
        const accessToken =  generateAccessToken(user);
        const refreshToken =  generateRefrestToken(user);
        const datakey = 'gegena';
        refreshTokens.push(refreshToken);
        res.json({
            isValid:true,
            dataKey:datakey,
            tmessage:'Valid User',
            bmessage:'Valid Credentials',
            email:req.body.email,
            accessToken,
            refreshToken
        });
    }else{
        res.json({tmessage: "Invalid User",bmessage:"Incorrect email or password please try again.",isValid:false});
        
    }

//    res.json("its works")

})

app.post('/api/register', (req, res) => {
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const newUser = {username:newEmail,password:newPassword,isAdmin:false}
    const user = users.find((u) => {
        return u.username === req.body.email;
    });
    if(!user){
        users.push(newUser);
        res.json({tmessage: "User Registered",bmessage:"User successfully registered.",isValid:true});
    }else{
        res.json({tmessage: "User Already Registered",bmessage:"User Already Registered please try different user.",isValid:false});
    }
   

  

})
app.post('/login_sql',(req,res) =>{
    const values = [
        req.body.email,
        req.body.password,
    ]
    const sql = "SELECT email FROM users WHERE email =? AND password =?";
  
    db.query(sql,values, (err, result) => {
        if(result.length > 0){
            //  res.json({success: 'valid'})
            
            const accessToken =  generateAccessToken(result);
            const refreshToken =  generateRefrestToken(result);
    
            refreshTokens.push(refreshToken);


            // res.json({success: accessToken});
            res.json({
                isValid:true,
                tmessage:'Valid User',
                bmessage:'Valid Credentials',
                email:req.body.email,
                accessToken,
                refreshToken
            });

           
        }else{
            // res.json({success: 'invalid'})

            res.json({tmessage: "Invalid User",bmessage:"Incorrect email or password please try again.",isValid:false});
         
        }

        // if(result != null) return res.json({message: 'Something unexpected has occured' + err})
        // return res.json({success: "Successfuly Logged in"})
    })

})


app.get("/userinfo", verify, (req,res) => {
    if(res){
        const email = req.user.username;
        var elementPos = users.map(function(x) {return x.username; }).indexOf(email);
        var objectFound = users[elementPos];
        const userInfo = {
            isValid:true,
            email:objectFound.username,
            isAdmin:objectFound.isAdmin
        }
        //console.log(req.user.username);
          res.status(200).json(userInfo);
       //   console.log(result);
         


      
    }else{
        res.json("Invalid action");
    }
});




app.listen(port, ()=>{
    console.log('listening... PORT:',port)
})