import { RowDataPacket } from 'mysql2';
import connection from '../config/connection';

interface CategoryRow extends RowDataPacket {
  id: number;
  name: string;
}

async function findCategoryIdByName(name: string) {
  const selectQuery = `SELECT * FROM category WHERE name=?`;
  try {
    const [[result], fields] = await connection.query<[CategoryRow]>(
      selectQuery,
      [name]
    );
    console.log(result);
    if (result === undefined) return undefined;
    const categoryId = result.id;
    return categoryId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const categoryRepository = { findCategoryIdByName };

export default categoryRepository;
