import { RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { Category } from '../domain/category';

interface CategoryRow extends RowDataPacket {
  id: number;
  name: string;
}

function CategoryRowToCategory(obj:CategoryRow){
  return {
    id: obj.id,
    name: obj.name
  } as Category
}


async function findCategoryIdByName(name: string) {
  const selectQuery = `SELECT * FROM category WHERE name=?`;
  try {
    const [[result], fields] = await connection.query<[CategoryRow]>(
      selectQuery,
      [name]
    );
    if (result === undefined) return undefined;
    const categoryId = result.id;
    return categoryId;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findCategoryById(id:number) {
  const selectQuery = `SELECT * FROM category WHERE id=?`;
  try {
    const [[result], fields] = await connection.query<[CategoryRow]>(
      selectQuery,
      [id]
    );
    if (result === undefined) return undefined;
    return CategoryRowToCategory(result);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const categoryRepository = { findCategoryIdByName, findCategoryById };

export default categoryRepository;
