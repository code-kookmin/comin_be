export interface User {
  email: string;
  password: string;
  name: string;
  birthday: string;
  githubName: string;
  baekjoonName: string;
}

export function isUser(obj: any): obj is User {
  if (
    typeof obj.email !== 'string' ||
    typeof obj.password !== 'string' ||
    typeof obj.name !== 'string' ||
    typeof obj.birthday !== 'string' ||
    typeof obj.githubName !== 'string' ||
    typeof obj.baekjoonName !== 'string'
  ) {
    return false;
  }
  return true;
}
