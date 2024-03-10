import { RowDataPacket } from "mysql2";
import connection from "../config/connection";

interface SubcategoryRow extends RowDataPacket {
  id: number;
  category_id: number;
  name: string;
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
  findById,
};
export default subcategoryRepository;
