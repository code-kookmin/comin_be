import weeklyProblemRepository from "../repository/weeklyProblem";
async function save(problemId) {
    const now = new Date();
    const nowString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const problemResponse = await fetch("https://solved.ac/api/v3/problem/show?problemId=" + problemId);
    if (problemResponse.status != 200) {
        return;
    }
    const problem = await problemResponse.json();
    const result = await weeklyProblemRepository.save(problemId, problem.acceptedUserCount, nowString);
    return result;
}
async function findByLikeDate() {
    const now = new Date();
    const nowString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const weeklyProblem = await weeklyProblemRepository.findByLikeDate(nowString);
    if (!weeklyProblem)
        return;
    const problemResponse = await fetch("https://solved.ac/api/v3/problem/show?problemId=" + weeklyProblem.problemId);
    if (problemResponse.status != 200) {
        return;
    }
    const problem = await problemResponse.json();
    const result = Object.assign(Object.assign({}, weeklyProblem), { weeklySolvedUserCount: problem.acceptedUserCount - weeklyProblem.acceptedUserCount });
    return result;
}
const weeklyProblemService = { save, findByLikeDate };
export default weeklyProblemService;
