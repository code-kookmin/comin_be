import userRepository from '../repository/user';
import { User } from '../domain/user';
import { getHashedPassword } from '../util/hashPassword';

async function signin(user:User){
  const result = await userRepository.findByEmail(user.email);
  if(result){
    return false;
  }
  user.password = await getHashedPassword(user.password);
  await userRepository.save(user);
  return true;
}

const signinService = {signin};

export default signinService;