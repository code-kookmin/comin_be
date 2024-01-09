import { User, isUser } from '../domain/user';
import userRepository from '../repository/user';

async function editProfile(user: User) {
  if (!isUser(user)) return undefined;
  try {
    const result = await userRepository.update(user);
    console.log(result);
    if (result === 0) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findByEmail(email:string){
  return await userRepository.findByEmail(email);
}

async function findPassword(email: string) {
  if (typeof email !== 'string') return undefined;
  const result: User | undefined = await userRepository.findByEmail(email);
  return result?.password;
}

const userService = { editProfile, findPassword, findByEmail};

export default userService;
