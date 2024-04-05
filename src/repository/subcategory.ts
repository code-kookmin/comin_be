import { RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { Subcategory } from '../domain/subcategory';

interface SubcategoryRow extends RowDataPacket {
  id: number;
  category_id: number;
  name: string;
}

function subcategoryRowToSubcategory(obj: SubcategoryRow) {
  return {
    id: obj.id,
    categoryId: obj.category_id,
    name: obj.name,
  } as Subcategory;
}

async function findAllByPage(pageSize: number, pageNumber: number) {
  const selectQuery = `SELECT * FROM community LIMIT ?, ?`;
  const selectParam = [(pageNumber - 1) * pageSize, pageSize];
  try {
    const [result, field] = await connection.query<[SubcategoryRow]>(selectQuery, selectParam);
    if (!result) return undefined;
    return result.map((value) => subcategoryRowToSubcategory(value));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const findById = async (id: number) => {
  const selectQuery = `SELECT * FROM subcategory WHERE id=?`;
  try {
    const [[result], field] = await connection.query<[SubcategoryRow]>(selectQuery, [id]);
    if (!result) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const subcategoryRepository = {
  findAllByPage,
  findById,
};
export default subcategoryRepository;
