const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

const bcryptSalt = 10;

router.get('/home', (req, res) => {
    res.json({
        msg: 'Estás en la página principal'
    })
});
//Esta vista te debe de direccionar al login/signup



router.get('/userView', ( req,res,next ) => {
    User.find().then(data => res.status(200).json(data))
    .catch(err => console.log(err))
})




router.post('/signup', (req, res) =>{
    const datosUsuario = req.body
    const email        = datosUsuario.email

    if(datosUsuario.name === '' || datosUsuario.email === '' || datosUsuario.password === ''){
        return res.json({msg:'Tienes que agregar username, mail y password'})
    }

    User.findOne({email})
        .then(user => {
            if(user){
                return res.json({msg:'Este compa pa existe'});
            }
            
            const salt            = bcrypt.genSaltSync(bcryptSalt);
            datosUsuario.password = bcrypt.hashSync(datosUsuario.password, salt);
            const newUser         = new User(datosUsuario);

            newUser.save()
            .then (respuesta => {
                res.json({ respuesta })
                // res.redirect('/login')
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})
//Por que cuando se hace el signUp se crea una secion?




router.post('/login', (req, res) => {
    const {password, email} = req.body;

    if (email === "" || password === "") {
        res.json({msg:'Ambos campos son necesarios!!'});
    }
    User.findOne({email})
    .then(user => {
        if (!user) {
            return res.json({msg: 'No existe ese usuario'});
        }
        if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.json({msg: 'oktl'});
        } else {
            return res.json({msg: 'Las contraseñas no son iguales'});
        }
        return true
    })
});


router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      res.json({msg:'see u'});
    });
  });


//Me falta hacer el delete y el update del usuario.
//Si tiene acceso que se dirija a a que crear un proyecto/empresa??

module.exports = router;

