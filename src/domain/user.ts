import { type } from 'os';

export interface User{
  email : string,
  password : string,
  name : string,
  birthday : string,
  github_name : string,
  baekjoon_name : string,
}

export function isUser(obj:any):obj is User{
  if(typeof obj.email !== 'string' || typeof obj.password !== 'string' || typeof obj.name !== 'string' || typeof obj.birthday !== 'string' || typeof obj.github_name !== 'string' || typeof obj.baekjoon_name !== 'string'){
    return false;
  }
  return true;
}