import { FieldPacket, ResultSetHeader } from 'mysql2';
import connection from '../config/connection';
import { RoundCreate } from '../domain/round/roundCreate';

async function save(round: RoundCreate) {
  try {
    const insertQuery = `INSERT INTO round VALUES(NULL, ?, ?)`;
    const insertParam = [round.name, round.startDate];
    const [[result], field]: [ResultSetHeader[], FieldPacket[]] = await connection.query(insertQuery, insertParam);
    if (!result) return undefined;
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function getCurrentRound() {
  try {
    const selectQuery = `SELECT * FROM round ORDER BY start_date`;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
export const roundRepository = { save };
