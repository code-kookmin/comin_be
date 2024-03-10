import exp from "constants";

export enum Role {
  ROLE_USER = 1,
  ROLE_ADMIN = 2,
}

export function numberToRole(code: number) {
  if (isNaN(code)) return undefined;
  switch (code) {
    case 1:
      return Role.ROLE_USER;
    case 2:
      return Role.ROLE_ADMIN;
    default:
      return undefined;
  }
}

export function roleToNumber(role: Role) {
  switch (role) {
    case Role.ROLE_USER:
      return 1;
    case Role.ROLE_ADMIN:
      return 2;
    default:
      return undefined;
  }
}
