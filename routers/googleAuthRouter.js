const router = require('express').Router();
const passport = require('passport');

// google auth router
router.route('/')
    .get(passport.authenticate('google',{scope:['profile','email']}))

router.route('/redirect')
    .get(passport.authenticate('google',{
    session: false,
    // failureMessage: '....',
    // successRedirect: 'url...',
    // failureRedirect: 'url...'
}),(req,res)=>{
    res.send(req.user)
})

module.exports = router;