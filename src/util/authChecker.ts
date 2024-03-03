import { Request, Response, NextFunction } from 'express';
import { ServiceLayer } from '../service/ServiceLayer';
import { isUser } from '../domain/user/user';

// 현재 세션 유저의 특정 데이터의 수정/삭제 권한 확인
// 만약 admin 계정이라면, 사용자 동일여부를 무시하고 권한을 인정한다.
async function checkUpdateAndDeleteAuth(req:Request, dataId:number, service: ServiceLayer){
    if(req.session.admin) return true;
    const data = await service.findById(dataId);
    if(!data){
        return undefined;
    }
    if(req.session.user && isUser(req.session.user) &&(data.userId === req.session.user.id)){
        return true;
    }
    return undefined; 
}

async function checkSaveDataAuth(req:Request){
    if(req.session.admin) return true;
    if(req.session.user && isUser(req.session.user)){
        return true;
    }
    return undefined;
}

export const authChecker = {
    checkUpdateAndDeleteAuth,
    checkSaveDataAuth
}