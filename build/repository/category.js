import connection from '../config/connection';
async function findCategoryIdByName(name) {
    const selectQuery = `SELECT * FROM category WHERE name=?`;
    try {
        const [[result], fields] = await connection.query(selectQuery, [name]);
        console.log(result);
        if (result === undefined)
            return undefined;
        const categoryId = result.id;
        return categoryId;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
const categoryRepository = { findCategoryIdByName };
export default categoryRepository;
