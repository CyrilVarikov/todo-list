import { respond, handleError} from "../../../helpers/response.helper";
import { UserService } from "../service/user.service";
import passport from 'passport';

export function signUp(req, res) {
  const data = req.body;
  return UserService.signUp(data)
  
  .then(jwt => respond(res, 200)(jwt))
  .catch(err => handleError(res, 500)(err));
}

export function login(req, res, next){
  passport.authenticate('local', function(err, user, info){
    
    // If Passport throws/catches an error
    if (err) {
      console.log('ERROR', err);
      return res.status(404).json(err);
    }
    
    // If a user is found
    if(user){
      const token = user.generateJWT();
      return respond(res, 200)({token});
    } else {
      // If user is not found
      return res.status(401).json(info);
    }
  })(req, res, next);
}