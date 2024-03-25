import { Request, Response, NextFunction } from 'express';
import { ServiceLayer } from '../service/ServiceLayer';
import { isUser, isUserCreate } from '../domain/user';
import { Role, roleToNumber } from '../domain/role';

// 현재 세션 유저의 특정 데이터의 수정/삭제 권한 확인
// 만약 admin 계정이라면, 사용자 동일여부를 무시하고 권한을 인정한다.
async function checkUpdateAndDeleteAuth(req: Request, dataId: number, service: ServiceLayer) {
  const data = await service.findById(dataId);
  if (data && req.session.user && isUser(req.session.user)) {
    if (data.userId === req.session.user.id) return true;
    if (req.session.user.role === roleToNumber(Role.ROLE_ADMIN)) return true;
  }
  return undefined;
}

async function checkSaveDataAuth(req: Request) {
  if (req.session.user && isUser(req.session.user)) return true;
  return undefined;
}

async function checkSaveUserAuth(req: Request) {
  if (!req.session.user) return true;
  if (req.session.user.role === roleToNumber(Role.ROLE_ADMIN)) return true;
  return undefined;
}

export const authChecker = {
  checkUpdateAndDeleteAuth,
  checkSaveDataAuth,
  checkSaveUserAuth,
};
