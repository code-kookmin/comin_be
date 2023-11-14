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