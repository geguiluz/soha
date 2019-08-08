const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');



const bcryptSalt = 10;


//ESTA RUTA TE REGRESA TODOS LOS USUARIOS.
router.get('/userView', ( req,res) => {
    User.find().then(data => res.status(200).json(data))
    .catch(err => console.log(err))
})

//SOLO REGRESA LA INFORMACION DE UN USUARIO.
router.get('/:id/user', (req, res) => {     
    const id =  req.params.id
    User.find({_id: id}).then(data => res.status(200).json(data))
    .catch(err => console.log(err))    
    })

//REGISTRO
router.post('/signup', (req, res) =>{
    const datosUsuario = req.body
    const email        = datosUsuario.email
    // const userId = req.session.currentUser._id;
    

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



//LOGEOS
router.post('/login', (req, res) => {
    const {password, email} = req.body;

    if (email === "" || password === "") {
        // Campos vacíos
        return res.status(409).json({msg: "Faltan campos"})
    }
    User.findOne({email})
    .then(user => {
        if (!user) {
            return res.status(401).json({msg: "No existe usuario"})
        }
        if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.json({ user })
        } else {
            return res.status(401).json({msg: 'Login fallido'});
        }
    })
});

//CERRAR SESSION
router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      res.json({msg:'see u'});
    });
  });

//ID SESSION
// router.get('/session', (req, res) => {
//     const userId = req.session.currentUser._id;
    
//     res.json({userId})
// })


module.exports = router;

