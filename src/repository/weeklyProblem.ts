import connection from "../config/connection";
import {RowDataPacket} from "mysql2/promise";
import {WeeklyProblem} from "../domain/weeklyProblem";


interface weeklyProblemRow extends RowDataPacket {
  id:number;
  problem_id:number;
  accepted_user_count:number;
  registered_date:string;
};


function weeklyProblemRowToWeeklyProblem(obj: weeklyProblemRow) {
  return {
    id: obj.id,
    problemId: obj.problem_id,
    acceptedUserCount: obj.accepted_user_count,
    registeredDate: obj.registered_date,
  }
}

async function save(problemId: number, acceptedUserCount: number, registeredDate: string) {
  const query = "INSERT INTO weekly_problem (problem_id, accepted_user_count, registered_date) VALUES (?)"
  try {
    const [result, field] = await connection.query(query, [[problemId, acceptedUserCount, registeredDate]]);
    return result
  } catch (e) {
    console.log(e)
  }
}

async function findByLikeDate(date: string) {
  const query = "SELECT * FROM comin.weekly_problem wp WHERE wp.registered_date <= ? ORDER BY wp.registered_date DESC LIMIT 1;"
  try {
    const [[result], field] = await connection.query<[weeklyProblemRow]>(query, [date]);
    return weeklyProblemRowToWeeklyProblem(result);
  } catch (e) {
    console.log(e)
  }
}

const weeklyProblemRepository = {save, findByLikeDate};
export default weeklyProblemRepository;