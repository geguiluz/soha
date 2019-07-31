const express = require('express');
const router  = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");



router.get('/ups', (req, res) => {
    res.json({ msg: 'u not shall pass'})
});

router.get('/in', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.json({ msg: 'u '})
});

router.get("/addCompany", passport.authenticate("local", {
    successRedirect: "/in",
    failureRedirect: "/ups",

    passReqToCallback: true

  }));



  module.exports = router;
