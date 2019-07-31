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
// const passport      = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

//ROUTES
const auth = require('./routes/auth');
const task = require('./routes/Task')

// CONNECTION TO MONGO 
mongoose.connect("mongodb://localhost:27017/soha-database",{ useNewUrlParser: true })
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

// // HERE STARTS WHIT PASSPORT
// app.use(session({
//   secret: "our-passport-local-strategy-app",
//   resave: true,
//   saveUninitialized: true
//   }));


//   passport.serializeUser((user, cb) => {
//     cb(null, user._id);
//   });
  
//   passport.deserializeUser((id, cb) => {
//     User.findById(id, (err, user) => {
//       if (err) { return cb(err); }
//       cb(null, user);
//     });
//   });
  
//   passport.use(new LocalStrategy((username, password, next) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return next(null, false, { message: "Incorrect username" });
//       }
//       if (!bcrypt.compareSync(password, user.password)) {
//         return next(null, false, { message: "Incorrect password" });
//       }
  
//       return next(null, user);
//     });
//   }));



// app.use(passport.initialize());
// app.use(passport.session());


//setings 
app.set('PORT', 3000);

//Routes
app.use("/", auth);
app.use("/", task)

app.listen(app.get("PORT"), () => {  //Donde lo estas ejecutando, donde lo escuchas?
  console.log(`server on PORT: ${app.get("PORT")}`);
});
