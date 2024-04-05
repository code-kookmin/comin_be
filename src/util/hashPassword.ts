import bcrypt from 'bcrypt';

export async function getHashedPassword(password: string) {
  const salt: string = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND as string));
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
}
