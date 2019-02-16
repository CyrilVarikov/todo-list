import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import { User } from '../api/user/model/user.model';

passport.use(new LocalStrategy({
  usernameField: 'login'
}, (login, password, done) => {
  return User.findOne({login})
  .then(user => {
    if(!user) return done(null, false, { message: 'user not found'});
    if(!user.validPassword(password)) return done(null, false, { message: 'password is wrong'});
    
    return done(null, user);
  })
  .catch(err => done(err))
}));