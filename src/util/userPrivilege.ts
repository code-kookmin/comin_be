import { User } from "../domain/user/user";

interface Admin{
    a:number
}

// 세션에 저장된 Admin, User 정보를 받아서 특정 data에 대한 권한을 확인함
export function checkUserAuthority(sessionAdmin:Admin|undefined, sessinUser:User|undefined, dataUserId:number){
    if(sessionAdmin) return true;
    if(sessinUser && (sessinUser.id === dataUserId)) return true;
    return false;
}