import { User, isUser } from '../domain/user/user';
import { UserCreate, isUserCreate } from '../domain/user/userCreate';
import userRepository from '../repository/user';
import { getHashedPassword } from '../util/hashPassword';
import { ServiceLayer } from './ServiceLayer';

// async function editProfile(sessionUserId: number, user: UserCreate) {
//   const originProfile = await userRepository.findByEmail(user.email);
//   if (originProfile && originProfile.id != sessionUserId) return undefined;
//   const result = await userRepository.update(user);
//   if (result === 0) return undefined;
//   return result;
// }

// async function findByEmail(email: string) {
//   return await userRepository.findByEmail(email);
// }

// async function findPassword(email: string) {
//   if (typeof email !== 'string') return undefined;
//   const result: User | undefined = await userRepository.findByEmail(email);
//   return result?.password;
// }

// async function findAll() {
//   const result = await userRepository.findAll();
//   if (!result) return undefined;
//   return result;
// }

// async function signIn(user: UserCreate) {
//   const result = await userRepository.findByEmail(user.email);
//   if (result) return undefined;
//   user.password = await getHashedPassword(user.password);
//   const queryResult = await userRepository.save(user);
//   return queryResult;
// }

// const userService = { editProfile, findPassword, findByEmail, findAll, signIn };

// export default userService;

export default class UserService implements ServiceLayer{
  findAll = async function findAll() {
    const result = await userRepository.findAll();
    if (!result) return undefined;
    return result;
  }

  findById = async ()=>{
    
  }

  findByEmail = async function findByEmail(email: string) {
    if(typeof email !== 'string') return undefined;
    return await userRepository.findByEmail(email);
  }

  findPassword = async function findPassword(email: string) {
    if (typeof email !== 'string') return undefined;
    const result: User | undefined = await userRepository.findByEmail(email);
    return result?.password;
  }

  update = async function update(user: UserCreate) {
    if(!isUserCreate(user)) return undefined;
    const result = await userRepository.update(user);
    if (result === 0) return undefined;
    return result;
  }

  save = async function save(user: UserCreate) {
    if(!isUserCreate(user)) return undefined;
    const result = await userRepository.findByEmail(user.email);
    if (result) return undefined;
    user.password = await getHashedPassword(user.password);
    const queryResult = await userRepository.save(user);
    return queryResult;
  }

  deleteById = async ()=>{

  }
}