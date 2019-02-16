import { User } from '../model/user.model';

export function UserService() {}

UserService.signUp = data => {
  const user = new User();
  
  user.login = data.login;
  user.setPassword(data.password);
  
  return user.save()
  .then(() => user.generateJWT())
  .catch(err => Promise.reject(err));
};
