import connection from '../config/connection';
function communityRowToCommunity(obj) {
    return {
        userId: obj.user_id,
        categoryId: obj.category_id,
        title: obj.title,
        content: obj.content,
        like: obj.like,
    };
}
async function findById(id) {
    const selectQuery = `SELECT * FROM community WHERE id=?`;
    try {
        const [[result], field] = await connection.query(selectQuery, [id]);
        return communityRowToCommunity(result);
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
async function save(title, categoryId, content) {
    const insertParam = [categoryId, title, content, 0];
    const insertQuery = `INSERT INTO community VALUES(NULL, 1, ?, ?, ?, ?)`;
    try {
        const [result, field] = await connection.query(insertQuery, insertParam);
        return result.insertId;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
async function deleteById(id) {
    const deleteQuery = `DELETE FROM community WHERE id=?`;
    try {
        const [result, field] = await connection.query(deleteQuery, [id]);
        return result.affectedRows;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
async function update(id, title, content) {
    const updateQuery = `UPDATE community SET title=?, content=? WHERE id=?`;
    const updateParam = [title, content, id];
    try {
        const [result, field] = await connection.query(updateQuery, updateParam);
        if (result.affectedRows === 0)
            return undefined;
        return result.affectedRows;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
const communityRepository = { save, findById, deleteById, update };
export default communityRepository;
