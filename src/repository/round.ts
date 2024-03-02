import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { RoundCreate } from '../domain/round/roundCreate';
import { Round } from '../domain/round/round';

interface RoundRow extends RowDataPacket {
  id: number;
  name: string;
  start_date: string;
}

function RoundRowToRound(obj: RoundRow) {
  return {
    id: obj.id,
    name: obj.name,
    startDate: obj.start_date,
  } as Round;
}

async function save(round: RoundCreate) {
  try {
    const insertQuery = `INSERT INTO round(name) VALUES(?)`;
    const insertParam = [round.name];
    const [result, field]: [ResultSetHeader, FieldPacket[]] = await connection.query(insertQuery, insertParam);
    if (!result) return undefined;
    return result.insertId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function getCurrentRound() {
  try {
    const selectQuery = `SELECT * FROM round ORDER BY id DESC`;
    const [result, field]: [RoundRow[], FieldPacket[]] = await connection.query<[RoundRow]>(selectQuery);
    if (!result[0]) return undefined;
    return RoundRowToRound(result[0]);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function getLastRound() {
  try {
    const selectQuery = `SELECT * FROM round ORDER BY id DESC`;
    const [result, field]: [RoundRow[], FieldPacket[]] = await connection.query<[RoundRow]>(selectQuery);
    if (!result[0]) return undefined;
    if (result.length <= 2) return undefined;
    return RoundRowToRound(result[1]);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const roundRepository = { save, getCurrentRound, getLastRound };
