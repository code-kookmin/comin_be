import connection from '../config/connection';
function UserRowToUser(obj) {
    return {
        email: obj.email,
        name: obj.name,
        password: obj.password,
        birthday: obj.birthday,
        githubName: obj.github_name,
        baekjoonName: obj.baekjoon_name,
    };
}
function UserToUserRow(obj) {
    return {
        email: obj.email,
        name: obj.name,
        password: obj.password,
        birthday: obj.birthday,
        github_name: obj.githubName,
        baekjoon_name: obj.baekjoonName,
    };
}
async function save(user) {
    const userRow = UserToUserRow(user);
    const userRowKeys = Object.keys(userRow).join(', ');
    const insertQuery = `INSERT INTO user(${userRowKeys}) VALUES(?)`;
    // try : fetch, query할 때는 써라
    try {
        await connection.query(insertQuery, [Object.values(userRow)]);
        return user;
    }
    catch (err) {
        console.log(err);
    }
}
async function update(user) {
    const updateQuery = `UPDATE user SET name=?, birthday=?, github_name=?, baekjoon_name=? WHERE email=?`;
    const updateQueryParam = [
        user.name,
        user.birthday,
        user.githubName,
        user.baekjoonName,
        user.email,
    ];
    try {
        const [result, info] = await connection.query(updateQuery, updateQueryParam);
        return result.affectedRows;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}
async function findByEmail(email) {
    const selectQuery = 'SELECT * FROM user WHERE email=?';
    try {
        const [[result], field] = await connection.query(selectQuery, [
            email,
        ]);
        if (result === undefined)
            return undefined;
        else
            return UserRowToUser(result);
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
const userRepository = { findByEmail, save, update };
export default userRepository;
