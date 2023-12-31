import {Tspec} from "tspec";

export interface WeeklyProblem {
  id:number;
  problemId:number;
  acceptedUserCount:number;
  registeredDate:string;
}

export function isWeeklyProblem(obj : any): obj is WeeklyProblem{
  if(typeof obj.id === "number" || typeof obj.problemId === "number" || typeof obj.acceptedUserCount === "number" || typeof obj.registeredDate === "string") return false;
  return true;
}

export type weeklyProblemApiSpec =Tspec.DefineApiSpec<{
  tags:['Weekly Problem'],
  paths: {
    '/weekly-problem': {
      get: {
        summary:"금주의 문제 조회",
        responses:{200:WeeklyProblem}
      },
    }
  }
}>;