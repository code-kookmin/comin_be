import { Role, roleToNumber } from "../domain/role";
import { User, isUser, isUserCreate } from "../domain/user";
import userRepository from "../repository/user";
import { getHashedPassword } from "../util/hashPassword";
import { ServiceLayer } from "./ServiceLayer";

export default class UserService implements ServiceLayer {
  findAll = async () => {
    const result = await userRepository.findAll();
    if (!result) return undefined;
    return result;
  };

  findById = async (id: number) => {
    if (isNaN(id)) return undefined;
    const result = await userRepository.findById(id);
    if (!result) return undefined;
    return result;
  };

  findByEmail = async (email: string) => {
    if (typeof email !== "string") return undefined;
    return await userRepository.findByEmail(email);
  };

  findPassword = async (email: string) => {
    if (typeof email !== "string") return undefined;
    const result: User | undefined = await userRepository.findByEmail(email);
    return result?.password;
  };

  update = async (user: User) => {
    if (!isUserCreate(user)) return undefined;
    const result = await userRepository.update(user);
    if (result === 0) return undefined;
    return result;
  };

  updateRole = async (role: Role | undefined) => {
    if (!role) return undefined;
    const roleId = roleToNumber(role);
    if (!roleId) return undefined;
    const result = await userRepository.updateRole(roleId);
    return result;
  };

  save = async (user: User) => {
    if (!isUserCreate(user)) return undefined;
    const result = await userRepository.findByEmail(user.email);
    if (result) return undefined;
    user.password = await getHashedPassword(user.password);
    const queryResult = await userRepository.save(user);
    return queryResult;
  };

  deleteById = async () => {};
}
