// CONFIG
const express    = require('express');
const mongoose   = require('mongoose');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors       = require('cors')

const app = express();
const auth = require('./routes/auth')

// CONNECTION
mongoose.connect("mongodb://localhost:27017/soha-database",{ useNewUrlParser: true })
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {console.error("Error connecting to mongo", err);});



// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 14
    })
}));

//setings 
app.set('PORT', 3000);

//Routes
app.use("/", auth);



app.listen(app.get("PORT"), () => {  //Donde lo estas ejecutando, donde lo escuchas?
  console.log(`server on PORT: ${app.get("PORT")}`);
});
