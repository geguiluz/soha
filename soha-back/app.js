// CONFIG

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const mongoose      = require('mongoose');
const session       = require("express-session");
const MongoStore    = require("connect-mongo")(session);
const cors          = require('cors')
const logger        = require('morgan');
const path          = require('path');
const app           = express();


var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3001, function(){
  console.log('listening on *:3001');
});


//ROUTES
const auth           = require('./routes/auth');
const task           = require('./routes/Task')

// CONNECTION TO MONGO 
mongoose.connect("mongodb+srv://ADMIN:1234@cluster0-hbugd.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true })
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {console.error("Error connecting to mongo", err);});



  const app_name = require('./package.json').name;
  const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



// MIDDLEWARES
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));




// SESSION'S!
app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 14
    })
    }));

    io.on('connection', function(socket){
      console.log('a user connected, id:', socket.id);
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });

    io.on('connection', function(socket){
      socket.on('SEND_HI', function(data){
        console.log(data)
        io.emit('HI', data);
      });
    });

//setings 
app.set('PORT', 3000);

//Routes
app.use("/", auth);
app.use("/", task)


app.listen(app.get("PORT"), () => {  //Donde lo estas ejecutando, donde lo escuchas?
  console.log(`server on PORT: ${app.get("PORT")}`);
});



